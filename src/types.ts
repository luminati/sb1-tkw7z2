export interface Image {
  id: number;
  url: string;
  tags: string[];
  description: string;
  relatedImages: number[];
  category: 'general' | 'specialSet' | 'personalizationCode';
}

export interface Database {
  images: Image[];
}