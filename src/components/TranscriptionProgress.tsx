import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface TranscriptionProgressProps {
  isProcessing: boolean;
  progress: number;
}

const TranscriptionProgress: React.FC<TranscriptionProgressProps> = ({ 
  isProcessing, 
  progress 
}) => {
  const [progressMessage, setProgressMessage] = useState('Uploading file...');
  
  useEffect(() => {
    const messages = [
      'Uploading file...',
      'Extracting audio...',
      'Processing audio...',
      'Transcribing content...',
      'Finalizing transcription...',
    ];
    
    // Update message based on progress
    const messageIndex = Math.min(
      Math.floor(progress / (100 / messages.length)),
      messages.length - 1
    );
    
    setProgressMessage(messages[messageIndex]);
  }, [progress]);
  
  if (!isProcessing) {
    return null;
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center mb-8">
      <div className="flex flex-col items-center">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
        <h3 className="text-xl font-medium mb-2">{progressMessage}</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">This may take a few minutes depending on the file size.</p>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">{progress}% complete</span>
      </div>
    </div>
  );
};

export default TranscriptionProgress;