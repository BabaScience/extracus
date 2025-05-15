import React from 'react';
import { FileText, FileCode, FileSpreadsheet, Download } from 'lucide-react';

interface DownloadOptionsProps {
  isEnabled: boolean;
  onDownload: (format: 'txt' | 'srt' | 'docx') => void;
}

const DownloadOptions: React.FC<DownloadOptionsProps> = ({ isEnabled, onDownload }) => {
  const handleDownload = (format: 'txt' | 'srt' | 'docx') => {
    if (!isEnabled) return;
    onDownload(format);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Download Options</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DownloadCard
          icon={<FileText className="w-6 h-6" />}
          title="Plain Text (.txt)"
          description="Simple text file without formatting"
          onClick={() => handleDownload('txt')}
          disabled={!isEnabled}
          iconColor="text-blue-500"
          iconBg="bg-blue-100 dark:bg-blue-900/30"
        />
        
        <DownloadCard
          icon={<FileCode className="w-6 h-6" />}
          title="Subtitles (.srt)"
          description="Timestamped subtitle format"
          onClick={() => handleDownload('srt')}
          disabled={!isEnabled}
          iconColor="text-purple-500"
          iconBg="bg-purple-100 dark:bg-purple-900/30"
        />
        
        <DownloadCard
          icon={<FileSpreadsheet className="w-6 h-6" />}
          title="Word Document (.docx)"
          description="Formatted document with text"
          onClick={() => handleDownload('docx')}
          disabled={!isEnabled}
          iconColor="text-indigo-500"
          iconBg="bg-indigo-100 dark:bg-indigo-900/30"
        />
      </div>
    </div>
  );
};

interface DownloadCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  disabled: boolean;
  iconColor: string;
  iconBg: string;
}

const DownloadCard: React.FC<DownloadCardProps> = ({
  icon,
  title,
  description,
  onClick,
  disabled,
  iconColor,
  iconBg,
}) => {
  return (
    <div 
      className={`border rounded-lg p-4 flex flex-col h-full transition-all ${
        disabled 
          ? 'border-gray-200 dark:border-gray-700 opacity-60 cursor-not-allowed' 
          : 'border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 cursor-pointer hover:shadow-md'
      }`}
      onClick={disabled ? undefined : onClick}
    >
      <div className={`${iconBg} ${iconColor} p-3 rounded-lg w-fit mb-3`}>
        {icon}
      </div>
      <h3 className="font-medium mb-1">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 flex-grow">{description}</p>
      <button 
        className={`flex items-center justify-center gap-1 text-sm py-2 rounded-lg w-full transition-colors ${
          disabled
            ? 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500'
            : 'bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30'
        }`}
        disabled={disabled}
      >
        <Download className="w-4 h-4" />
        <span>Download</span>
      </button>
    </div>
  );
};

export default DownloadOptions;