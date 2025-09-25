
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import PromptForm from './components/PromptForm';
import ImageGallery from './components/ImageGallery';
import Footer from './components/Footer';
import { generateImagesFromPrompt } from './services/geminiService';
import type { GeneratedImage, AspectRatio } from './types';

const App: React.FC = () => {
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async (prompt: string, aspectRatio: AspectRatio) => {
    setIsLoading(true);
    setError(null);
    try {
      const newImageSrcs = await generateImagesFromPrompt(prompt, aspectRatio);
      const newImages: GeneratedImage[] = newImageSrcs.map(src => ({
        id: crypto.randomUUID(),
        src,
        prompt,
        aspectRatio,
      }));
      setImages(prevImages => [...newImages, ...prevImages]);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-white font-sans">
      <Header />
      <main className="flex-grow w-full">
        <div className="py-8 md:py-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">
                AI Image Generator
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-center text-lg text-slate-400">
                Bring your ideas to life. Describe anything you can imagine and let Gemini create it for you.
            </p>
        </div>
        <PromptForm onSubmit={handleGenerate} isLoading={isLoading} />
        <ImageGallery images={images} isLoading={isLoading} error={error} />
      </main>
      <Footer />
    </div>
  );
};

export default App;
