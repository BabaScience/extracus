import React, { useState, useCallback } from 'react';
import { Upload, FileType, FileUp, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  onFileSelected: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Supported file types
  const supportedTypes = [
    'audio/mpeg', 'audio/wav', 'audio/mp4', 
    'video/mp4', 'video/avi', 'video/quicktime'
  ];
  // For display purposes
  const supportedExtensions = '.mp3, .wav, .mp4, .avi, .mov';
  
  // Max file size (500MB in bytes)
  const MAX_FILE_SIZE = 500 * 1024 * 1024;
  
  const validateFile = (file: File): boolean => {
    setErrorMessage(null);
    
    // Check file type
    if (!supportedTypes.includes(file.type)) {
      setErrorMessage(`Unsupported file type. Please upload ${supportedExtensions}`);
      return false;
    }
    
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage('File too large. Maximum size is 500MB');
      return false;
    }
    
    return true;
  };
  
  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (validateFile(file)) {
        onFileSelected(file);
      }
    }
  }, [onFileSelected]);
  
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (validateFile(file)) {
        onFileSelected(file);
      }
    }
  }, [onFileSelected]);
  
  return (
    <div 
      className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
        isDragging 
          ? 'border-blue-500 bg-blue-500/10' 
          : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50 dark:border-gray-700 dark:hover:border-blue-600 dark:hover:bg-blue-900/20'
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <div className={`p-4 rounded-full ${isDragging ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500 dark:bg-gray-800'}`}>
          {isDragging ? (
            <FileUp className="w-8 h-8" />
          ) : (
            <Upload className="w-8 h-8" />
          )}
        </div>
        <div>
          <h3 className="text-lg font-medium mb-1">
            {isDragging ? 'Drop your file here' : 'Drag & drop your file here'}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            or click to browse your files
          </p>
          <div className="flex items-center justify-center gap-2 mb-2">
            <FileType className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Supported formats: {supportedExtensions}
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Maximum file size: 500MB
          </p>
        </div>
        
        {errorMessage && (
          <div className="mt-2 text-red-500 flex items-center gap-1 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded">
            <AlertCircle className="w-4 h-4" />
            <p>{errorMessage}</p>
          </div>
        )}
        
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept={supportedExtensions}
          onChange={handleFileChange}
        />
        <label
          htmlFor="file-upload"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
        >
          Browse Files
        </label>
      </div>
    </div>
  );
};

export default FileUpload;