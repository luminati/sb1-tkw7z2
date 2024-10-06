import { Image } from '../types';
import imageData from '../data/images.json';

export const loadImages = (): Image[] => {
  const images = imageData.images as Image[];
  return createImageConnections(images);
};

const createImageConnections = (images: Image[]): Image[] => {
  return images.map(image => ({
    ...image,
    relatedImages: images
      .filter(img => img.id !== image.id && img.tags.some(tag => image.tags.includes(tag)))
      .map(img => img.id)
  }));
};