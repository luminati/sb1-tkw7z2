import React from 'react';
import { Image } from '../types';

interface ImageCardProps {
  image: Image;
  onImageClick: (image: Image) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onImageClick }) => {
  const copyTag = (e: React.MouseEvent, tag: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(tag);
    alert(`Tag "${tag}" copied to clipboard!`);
  };

  return (
    <div
      className="relative group cursor-pointer bg-white rounded-lg shadow-md overflow-hidden"
      onClick={() => onImageClick(image)}
    >
      <img
        src={image.url}
        alt={image.description}
        className="w-full h-48 object-cover transition-transform transform group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
        <div className="flex flex-wrap gap-1">
          {image.tags.map(tag => (
            <span
              key={tag}
              className="text-xs bg-white text-black px-1 rounded cursor-pointer hover:bg-gray-200"
              onClick={(e) => copyTag(e, tag)}
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-sm font-semibold text-white truncate">{image.description}</h3>
      </div>
    </div>
  );
};

export default ImageCard;