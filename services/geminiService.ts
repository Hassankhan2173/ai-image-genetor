
import { GoogleGenAI } from "@google/genai";
import { AspectRatio } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateImagesFromPrompt = async (prompt: string, aspectRatio: AspectRatio): Promise<string[]> => {
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 4,
        outputMimeType: 'image/png',
        aspectRatio: aspectRatio,
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      return response.generatedImages.map(img => `data:image/png;base64,${img.image.imageBytes}`);
    }
    return [];
  } catch (error) {
    console.error("Error generating images:", error);
    throw new Error("Failed to generate images. Please try again.");
  }
};
