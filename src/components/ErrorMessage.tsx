import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onDismiss: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onDismiss }) => {
  if (!message) return null;
  
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3 mb-6 animate-fadeIn">
      <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
      <div className="flex-grow">
        <h4 className="font-medium text-red-700 dark:text-red-400 mb-1">Error</h4>
        <p className="text-red-600 dark:text-red-300">{message}</p>
      </div>
      <button 
        onClick={onDismiss}
        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ErrorMessage;