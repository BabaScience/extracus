import React from 'react';
import { Headphones, Github, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Headphones className="w-6 h-6 text-blue-400" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Extracus
            </span>
          </div>
          
          <div className="flex gap-6">
            <a 
              href="https://github.com/extracus/extracus"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
            <a 
              href="#documentation"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Documentation
            </a>
            <a 
              href="#privacy"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Privacy
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Extracus. Open Source Project.
          </p>
          <p className="flex items-center gap-1 text-gray-400">
            Built with 
            <Heart className="w-4 h-4 text-red-500" /> 
            using Next.js, TypeScript & Whisper-cpp
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;