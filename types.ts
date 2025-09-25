
export interface GeneratedImage {
  id: string;
  src: string;
  prompt: string;
  aspectRatio: string;
}

export type AspectRatio = "1:1" | "3:4" | "4:3" | "9:16" | "16:9";
