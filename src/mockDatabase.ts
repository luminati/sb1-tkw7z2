import { Database, Image } from './types';

const createImageConnections = (images: Image[]): Image[] => {
  return images.map(image => ({
    ...image,
    relatedImages: images
      .filter(img => img.id !== image.id && img.tags.some(tag => image.tags.includes(tag)))
      .map(img => img.id)
  }));
};

export const mockDatabase: Database = {
  images: createImageConnections([
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1682687220566-5599dbbebf11?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8',
      tags: ['nature', 'landscape', 'mountain'],
      description: 'A beautiful mountain landscape',
      relatedImages: [],
      category: 'general',
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8',
      tags: ['nature', 'ocean', 'beach'],
      description: 'A serene beach scene',
      relatedImages: [],
      category: 'general',
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D',
      tags: ['city', 'architecture', 'building'],
      description: 'A modern city skyline',
      relatedImages: [],
      category: 'specialSet',
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3ByaW5nJTIwZmxvd2VyfGVufDB8fDB8fHww',
      tags: ['nature', 'flower', 'spring'],
      description: 'A colorful spring flower',
      relatedImages: [],
      category: 'personalizationCode',
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWFnbGUlMjBmbGlnaHR8ZW58MHx8MHx8fDA%3D',
      tags: ['animal', 'wildlife', 'bird'],
      description: 'A majestic eagle in flight',
      relatedImages: [],
      category: 'specialSet',
    },
  ]),
};