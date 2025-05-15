import express from 'express';
import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Configure temporary storage
const TEMP_DIR = process.env.TEMP_STORAGE_PATH || '/tmp/extracus';
const CHUNK_DIR = path.join(TEMP_DIR, 'chunks');
const MAX_FILE_SIZE = Number.parseInt(process.env.MAX_FILE_SIZE || '500000000', 10); // 500MB default

// Ensure temp directories exist
for (const dir of [TEMP_DIR, CHUNK_DIR]) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true, mode: 0o755 });
  }
}

// Configure multer for chunk uploads
const storage = multer.diskStorage({
  destination: (req, _file, cb) => {
    const uploadId = req.headers['x-upload-id'] as string;
    if (!uploadId) {
      return cb(new Error('Upload ID is required'), '');
    }
    
    const chunkDir = path.join(CHUNK_DIR, uploadId);
    try {
      if (!fs.existsSync(chunkDir)) {
        fs.mkdirSync(chunkDir, { recursive: true, mode: 0o755 });
      }
      cb(null, chunkDir);
    } catch (error) {
      cb(error as Error, '');
    }
  },
  filename: (req, _file, cb) => {
    const chunkNumber = req.headers['x-chunk-number'] as string;
    if (!chunkNumber) {
      return cb(new Error('Chunk number is required'), '');
    }
    cb(null, `chunk-${chunkNumber}`);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE / 10, // Limit individual chunk size
  },
  fileFilter: (_req, file, cb) => {
    // Accept all files for now, you can add file type filtering here
    cb(null, true);
  }
});

// Track upload progress
interface UploadProgress {
  totalChunks: number;
  receivedChunks: Set<number>;
  fileName: string;
}

const uploadProgress = new Map<string, UploadProgress>();

// Start upload - initialize tracking
router.post('/start', (req: express.Request, res: express.Response) => {
  const uploadId = uuidv4();
  const { fileName, totalChunks } = req.body;
  
  uploadProgress.set(uploadId, {
    totalChunks: Number.parseInt(totalChunks, 10),
    receivedChunks: new Set(),
    fileName
  });

  res.json({ uploadId });
});

// Upload chunk
router.post('/chunk', upload.single('chunk'), (req: express.Request, res: express.Response) => {
  try {
    console.log('Chunk upload request received:', {
      headers: {
        'x-upload-id': req.headers['x-upload-id'],
        'x-chunk-number': req.headers['x-chunk-number'],
      },
      file: req.file ? {
        fieldname: req.file.fieldname,
        originalname: req.file.originalname,
        size: req.file.size
      } : null,
      body: req.body
    });

    const uploadId = req.headers['x-upload-id'] as string;
    const chunkNumber = Number.parseInt(req.headers['x-chunk-number'] as string, 10);
    
    if (!uploadId || Number.isNaN(chunkNumber)) {
      const error = {
        error: 'Invalid upload ID or chunk number',
        details: {
          hasUploadId: !!uploadId,
          chunkNumber,
          isNaN: Number.isNaN(chunkNumber)
        }
      };
      console.log('Validation failed:', error);
      return res.status(400).json(error);
    }

    if (!req.file) {
      const error = {
        error: 'No file uploaded',
        details: { receivedFile: false }
      };
      console.log('No file in request:', error);
      return res.status(400).json(error);
    }
    
    const progress = uploadProgress.get(uploadId);
    if (!progress) {
      return res.status(400).json({ error: 'Invalid upload ID' });
    }

    progress.receivedChunks.add(chunkNumber);
    
    // Check if upload is complete
    if (progress.receivedChunks.size === progress.totalChunks) {
      // All chunks received, trigger assembly
      assembleChunks(uploadId, progress.fileName)
        .then(finalPath => {
          res.json({ 
            status: 'complete',
            filePath: finalPath
          });
        })
        .catch(error => {
          console.error('Failed to assemble chunks:', error);
          res.status(500).json({ error: 'Failed to assemble chunks' });
        });
    } else {
      res.json({ 
        status: 'chunk_received',
        receivedChunks: progress.receivedChunks.size,
        totalChunks: progress.totalChunks
      });
    }
  } catch (error) {
    console.error('Error processing chunk:', error);
    res.status(500).json({ error: 'Failed to process chunk' });
  }
});

// Get upload status
router.get('/status/:uploadId', (req: express.Request, res: express.Response) => {
  const { uploadId } = req.params;
  const progress = uploadProgress.get(uploadId);
  
  if (!progress) {
    return res.status(404).json({ error: 'Upload not found' });
  }

  res.json({
    receivedChunks: progress.receivedChunks.size,
    totalChunks: progress.totalChunks,
    fileName: progress.fileName
  });
});

// Cleanup upload
router.delete('/:uploadId', (req: express.Request, res: express.Response) => {
  const { uploadId } = req.params;
  const chunkDir = path.join(CHUNK_DIR, uploadId);
  
  if (fs.existsSync(chunkDir)) {
    fs.rmSync(chunkDir, { recursive: true, force: true });
  }
  
  uploadProgress.delete(uploadId);
  res.json({ status: 'cleaned' });
});

async function assembleChunks(uploadId: string, fileName: string): Promise<string> {
  const chunkDir = path.join(CHUNK_DIR, uploadId);
  const finalPath = path.join(TEMP_DIR, `${uploadId}-${fileName}`);
  
  const writeStream = fs.createWriteStream(finalPath);
  const chunks = fs.readdirSync(chunkDir)
    .filter(f => f.startsWith('chunk-'))
    .sort((a, b) => {
      const numA = Number.parseInt(a.split('-')[1], 10);
      const numB = Number.parseInt(b.split('-')[1], 10);
      return numA - numB;
    });

  for (const chunk of chunks) {
    const chunkPath = path.join(chunkDir, chunk);
    const chunkData = fs.readFileSync(chunkPath);
    writeStream.write(chunkData);
  }

  writeStream.end();
  
  // Clean up chunks after assembly
  fs.rmSync(chunkDir, { recursive: true, force: true });
  uploadProgress.delete(uploadId);
  
  return finalPath;
}

export default router; 