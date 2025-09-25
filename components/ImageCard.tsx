
import React from 'react';
import { DownloadIcon } from './icons/DownloadIcon';
import type { GeneratedImage } from '../types';


interface ImageCardProps {
  image: GeneratedImage;
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.src;
    link.download = `${image.prompt.substring(0, 30).replace(/\s/g, '_')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="group relative aspect-square overflow-hidden rounded-lg shadow-lg bg-slate-800 border border-slate-700 transition-all duration-300 ease-in-out hover:shadow-blue-500/20 hover:border-blue-500">
      <img
        src={image.src}
        alt={image.prompt}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <p className="text-white text-sm line-clamp-2">{image.prompt}</p>
        <button
          onClick={handleDownload}
          className="absolute top-2 right-2 bg-slate-900/70 p-2 rounded-full text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-colors"
          aria-label="Download image"
        >
          <DownloadIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ImageCard;
