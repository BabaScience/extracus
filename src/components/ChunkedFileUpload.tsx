import { useCallback, useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react';

// Configure axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

// Add request interceptor to only set Content-Type for non-FormData requests
api.interceptors.request.use((config) => {
  if (!(config.data instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

const CHUNK_SIZE = 1024 * 1024; // 1MB chunks

interface UploadProgress {
  fileName: string;
  progress: number;
  status: 'idle' | 'uploading' | 'complete' | 'error';
  error?: string;
}

export const ChunkedFileUpload: React.FC = () => {
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const uploadChunk = useCallback(async (
    file: File,
    uploadId: string,
    chunkNumber: number,
    start: number,
    end: number
  ): Promise<void> => {
    const chunk = file.slice(start, end);
    const formData = new FormData();
    formData.append('chunk', chunk);

    try {
      await api.post('/api/upload/chunk', formData, {
        headers: {
          'x-upload-id': uploadId,
          'x-chunk-number': chunkNumber.toString(),
        },
        signal: abortControllerRef.current?.signal,
      });
    } catch (error) {
      if (axios.isCancel(error)) {
        throw new Error('Upload cancelled');
      }
      throw error;
    }
  }, []);

  const uploadFile = useCallback(async (file: File): Promise<void> => {
    try {
      // Initialize upload
      const { data: { uploadId } } = await api.post('/api/upload/start', {
        fileName: file.name,
        totalChunks: Math.ceil(file.size / CHUNK_SIZE),
      });

      setUploadProgress({
        fileName: file.name,
        progress: 0,
        status: 'uploading',
      });

      // Create new abort controller for this upload
      abortControllerRef.current = new AbortController();

      const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
      let completedChunks = 0;

      // Upload chunks
      for (let chunkNumber = 0; chunkNumber < totalChunks; chunkNumber++) {
        const start = chunkNumber * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);
        
        await uploadChunk(file, uploadId, chunkNumber, start, end);
        
        completedChunks++;
        setUploadProgress((prev) => prev ? {
          ...prev,
          progress: (completedChunks / totalChunks) * 100,
        } : null);
      }

      setUploadProgress((prev) => prev ? {
        ...prev,
        status: 'complete',
        progress: 100,
      } : null);

    } catch (error) {
      setUploadProgress((prev) => prev ? {
        ...prev,
        status: 'error',
        error: error instanceof Error ? error.message : 'Upload failed',
      } : null);
    } finally {
      abortControllerRef.current = null;
    }
  }, [uploadChunk]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Reset progress
    setUploadProgress({
      fileName: file.name,
      progress: 0,
      status: 'idle',
    });

    await uploadFile(file);
  }, [uploadFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'audio/*': ['.mp3', '.wav', '.m4a'],
      'video/*': ['.mp4', '.avi', '.mov'],
    },
  });

  const cancelUpload = (): void => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2">
          <Upload className={`w-8 h-8 ${isDragActive ? 'text-blue-500' : 'text-gray-400'}`} />
          {isDragActive ? (
            <p className="text-blue-500 font-medium">Drop the file here...</p>
          ) : (
            <>
              <p className="text-gray-600 font-medium">Drag and drop a file here, or click to select</p>
              <p className="text-sm text-gray-500">Supported formats: MP3, WAV, MP4, AVI, MOV</p>
            </>
          )}
        </div>
      </div>

      {uploadProgress && (
        <div className="mt-4 space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              {uploadProgress.status === 'complete' && <CheckCircle className="w-5 h-5 text-green-500" />}
              {uploadProgress.status === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
              <span className="text-sm font-medium text-gray-700 truncate max-w-[200px]">
                {uploadProgress.fileName}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              {uploadProgress.progress.toFixed(1)}%
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full transition-all duration-300 ${
                uploadProgress.status === 'error' ? 'bg-red-500' :
                uploadProgress.status === 'complete' ? 'bg-green-500' :
                'bg-blue-500'
              }`}
              style={{ width: `${uploadProgress.progress}%` }}
            />
          </div>

          {uploadProgress.status === 'uploading' && (
            <button
              type="button"
              onClick={cancelUpload}
              className="mt-2 text-sm text-red-500 hover:text-red-700 flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Cancel Upload
            </button>
          )}

          {uploadProgress.status === 'error' && (
            <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {uploadProgress.error}
            </p>
          )}

          {uploadProgress.status === 'complete' && (
            <p className="mt-2 text-sm text-green-500 flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              Upload complete!
            </p>
          )}
        </div>
      )}
    </div>
  );
}; 