import React from 'react';
import { Upload, FileAudio, MessageSquare, ArrowRight } from 'lucide-react';

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Extracus makes it easy to convert your audio and video files into accurate, editable text in just a few simple steps.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-12">
            {/* Step 1 */}
            <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                1
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-fit mx-auto mb-4">
                <Upload className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Upload Your File</h3>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                Drag and drop or browse to upload your audio or video file (MP3, WAV, MP4, etc.)
              </p>
            </div>
            
            <div className="hidden md:flex items-center justify-center">
              <ArrowRight className="w-6 h-6 text-gray-400" />
            </div>
            
            {/* Step 2 */}
            <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
                2
              </div>
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full w-fit mx-auto mb-4">
                <FileAudio className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Processing</h3>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                Our system extracts audio and uses Whisper-cpp to generate accurate transcription
              </p>
            </div>
            
            <div className="hidden md:flex items-center justify-center">
              <ArrowRight className="w-6 h-6 text-gray-400" />
            </div>
            
            {/* Step 3 */}
            <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                3
              </div>
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full w-fit mx-auto mb-4">
                <MessageSquare className="w-6 h-6 text-indigo-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Edit & Download</h3>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                View, edit, and download your transcription in TXT, SRT, or DOCX format
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The entire process happens in your browser. Your files are processed securely and are not stored permanently.
            </p>
            <a 
              href="#upload" 
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
            >
              Try It Now
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;