import React from 'react';
import { Github, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-400 text-sm mb-2">
            Made with <Heart className="h-4 w-4 text-red-500 inline mx-1" /> using React + TypeScript
          </p>
          <div className="flex space-x-4">
            <a 
              href="#" 
              className="text-gray-400 hover:text-white transition"
              aria-label="GitHub repository"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;