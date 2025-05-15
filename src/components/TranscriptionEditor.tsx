import React, { useState } from 'react';
import { Bold, Italic, Heading, Clock, Copy, Check } from 'lucide-react';

interface TranscriptionEditorProps {
  transcription: string;
  onTranscriptionChange: (value: string) => void;
}

const TranscriptionEditor: React.FC<TranscriptionEditorProps> = ({
  transcription,
  onTranscriptionChange,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  
  // Calculate word count
  const wordCount = transcription.trim().split(/\s+/).filter(Boolean).length;
  
  // Estimate reading time (average 200 words per minute)
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));
  
  const handleCopyClick = () => {
    navigator.clipboard.writeText(transcription);
    setIsCopied(true);
    
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  
  // Functions for basic formatting - in a real app these would add the proper markup
  const formatBold = () => {
    // This is just a simulation - in a real app, this would format the selected text
    alert('In a complete implementation, this would format selected text as bold');
  };
  
  const formatItalic = () => {
    alert('In a complete implementation, this would format selected text as italic');
  };
  
  const formatHeading = () => {
    alert('In a complete implementation, this would format selected text as a heading');
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Transcription Result</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm">
            <Clock className="w-4 h-4" />
            <span>~{readingTimeMinutes} min read</span>
          </div>
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            {wordCount} words
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-700 pb-3 mb-3">
        <button 
          onClick={formatBold}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button 
          onClick={formatItalic}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button 
          onClick={formatHeading}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          title="Heading"
        >
          <Heading className="w-4 h-4" />
        </button>
        <div className="flex-grow"></div>
        <button 
          onClick={handleCopyClick}
          className={`p-2 rounded flex items-center gap-1 text-sm ${
            isCopied ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          title="Copy to clipboard"
        >
          {isCopied ? (
            <>
              <Check className="w-4 h-4" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      
      <textarea
        className="w-full h-64 p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y bg-transparent"
        value={transcription}
        onChange={(e) => onTranscriptionChange(e.target.value)}
        placeholder="Your transcription will appear here..."
      />
    </div>
  );
};

export default TranscriptionEditor;