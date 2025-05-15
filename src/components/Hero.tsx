import React from 'react';
import { ArrowRight, MessageSquare, FileAudio, Download } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-blue-900 to-purple-900 text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Transform Audio & Video to Text with <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Extracus</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8">
            Free, open-source tool that transcribes your files with accuracy and speed. 
            No sign-up required.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <a 
              href="#upload" 
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
            >
              Start Transcribing
              <ArrowRight className="w-5 h-5" />
            </a>
            <a 
              href="#samples" 
              className="bg-white/10 hover:bg-white/20 text-white py-3 px-8 rounded-lg font-medium transition-colors"
            >
              View Samples
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <div className="bg-blue-500/20 p-3 rounded-full w-fit mx-auto mb-4">
                <FileAudio className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Any Format</h3>
              <p className="text-white/70">
                Support for MP3, WAV, MP4, AVI, MOV, and more
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <div className="bg-purple-500/20 p-3 rounded-full w-fit mx-auto mb-4">
                <MessageSquare className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Accurate Transcription</h3>
              <p className="text-white/70">
                Powered by FFmpeg and Whisper-cpp technology
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <div className="bg-indigo-500/20 p-3 rounded-full w-fit mx-auto mb-4">
                <Download className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multiple Formats</h3>
              <p className="text-white/70">
                Download as TXT, SRT, or DOCX files
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;