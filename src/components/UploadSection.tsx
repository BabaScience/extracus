import React, { useState, useEffect } from 'react';
import FileUpload from './FileUpload';
import TranscriptionProgress from './TranscriptionProgress';
import TranscriptionEditor from './TranscriptionEditor';
import DownloadOptions from './DownloadOptions';
import LanguageSelector from './LanguageSelector';
import ErrorMessage from './ErrorMessage';

const UploadSection: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [transcription, setTranscription] = useState('');
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('en');
  
  // Handle file selection
  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    setTranscription('');
    setError('');
    
    // Start processing
    simulateTranscription(file);
  };
  
  // Simulate transcription progress (in a real app this would connect to a backend)
  const simulateTranscription = (file: File) => {
    setIsProcessing(true);
    setProgress(0);
    
    // Fake loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          return 100;
        }
        return prev + 2;
      });
    }, 300);
    
    // After "processing" complete, set fake transcription
    setTimeout(() => {
      const duration = (file.size / 1024 / 1024) * 2; // Roughly 2 seconds per MB as a demo
      
      // Generate sample transcription based on file name and size
      // In a real app, this would be the actual transcription from the backend
      const sampleTranscription = `Transcription of ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)
      
[00:00:01] Thank you for using Extracus, the open-source audio and video transcription tool.

[00:00:07] This is a sample transcription that demonstrates how the actual content would appear after processing your file.

[00:00:15] In a real implementation, we would be using Whisper-cpp to analyze the audio content and convert it to text.

[00:00:22] The quality of transcription depends on several factors including audio clarity, background noise, and the speaker's pronunciation.

[00:00:30] You can edit this text directly if you notice any mistakes or want to make changes to the output.

[00:00:38] Once you're satisfied with the transcription, you can download it in various formats including plain text, SRT for subtitles, or as a Word document.

[00:00:48] Extracus processes everything locally in your browser, ensuring your data remains private and secure.

[00:00:55] Thank you for trying our demo. We hope you found it useful!`;
      
      setTranscription(sampleTranscription);
      setIsProcessing(false);
      setProgress(100);
    }, 5000 + Math.min(file.size / 100000, 10000)); // Simulate longer processing for larger files
  };
  
  // Handle transcription text changes
  const handleTranscriptionChange = (value: string) => {
    setTranscription(value);
  };
  
  // Handle language change
  const handleLanguageChange = (languageCode: string) => {
    setLanguage(languageCode);
    // In a real app, this would trigger a re-transcription with the new language
  };
  
  // Handle download
  const handleDownload = (format: 'txt' | 'srt' | 'docx') => {
    if (!transcription || !selectedFile) return;
    
    // Create filename based on original file and format
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
    const originalName = selectedFile.name.split('.')[0];
    const filename = `${originalName}_transcription_${timestamp}.${format}`;
    
    // For demo purposes, we're just downloading the text content
    // In a real app, proper formatting for SRT and DOCX would be needed
    const blob = new Blob([transcription], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <section id="upload" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Transcribe Your Media</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Upload your audio or video file and get accurate transcription in minutes. Free, private, and no sign-up required.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <ErrorMessage 
            message={error} 
            onDismiss={() => setError('')} 
          />
          
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-xl font-semibold">
              {selectedFile ? 'Processing: ' + selectedFile.name : 'Upload File'} 
            </h3>
            {(selectedFile || transcription) && (
              <div className="flex items-center gap-3">
                <span className="text-gray-500 dark:text-gray-400">Language:</span>
                <LanguageSelector onLanguageChange={handleLanguageChange} />
              </div>
            )}
          </div>
          
          {!selectedFile && !transcription ? (
            <FileUpload onFileSelected={handleFileSelected} />
          ) : (
            <>
              <TranscriptionProgress isProcessing={isProcessing} progress={progress} />
              
              {transcription && (
                <div className="space-y-6 animate-fadeIn">
                  <TranscriptionEditor 
                    transcription={transcription} 
                    onTranscriptionChange={handleTranscriptionChange} 
                  />
                  
                  <DownloadOptions 
                    isEnabled={!!transcription} 
                    onDownload={handleDownload} 
                  />
                  
                  <div className="text-center mt-8">
                    <button
                      onClick={() => {
                        setSelectedFile(null);
                        setTranscription('');
                        setProgress(0);
                      }}
                      className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-2 px-6 rounded-lg transition-colors"
                    >
                      Transcribe Another File
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default UploadSection;