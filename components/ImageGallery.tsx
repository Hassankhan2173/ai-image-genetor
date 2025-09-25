
import React from 'react';
import ImageCard from './ImageCard';
import type { GeneratedImage } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';

interface ImageGalleryProps {
  images: GeneratedImage[];
  isLoading: boolean;
  error: string | null;
}

const SkeletonLoader: React.FC = () => (
  <div className="aspect-square bg-slate-800 rounded-lg animate-pulse"></div>
);

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, isLoading, error }) => {
  const renderContent = () => {
    if (isLoading) {
      return Array.from({ length: 4 }).map((_, index) => <SkeletonLoader key={index} />);
    }

    if (error) {
      return (
        <div className="col-span-full text-center py-10 bg-slate-800/50 border border-red-500/30 rounded-lg">
          <p className="text-red-400 font-semibold">An error occurred:</p>
          <p className="text-slate-400 mt-1">{error}</p>
        </div>
      );
    }

    if (images.length === 0) {
      return (
        <div className="col-span-full text-center py-20 bg-slate-800/30 border border-dashed border-slate-600 rounded-lg">
          <SparklesIcon className="mx-auto h-12 w-12 text-slate-500" />
          <h3 className="mt-2 text-lg font-medium text-white">Your creations will appear here</h3>
          <p className="mt-1 text-sm text-slate-400">Enter a prompt above to start generating images.</p>
        </div>
      );
    }

    return images.map((image) => <ImageCard key={image.id} image={image} />);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default ImageGallery;
