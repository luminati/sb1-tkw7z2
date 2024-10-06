import React, { useState, useMemo } from 'react';
import { Image } from './types';
import ImageCard from './components/ImageCard';
import SearchBar from './components/SearchBar';
import { X } from 'lucide-react';
import { loadImages } from './utils/imageUtils';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const images = useMemo(() => loadImages(), []);

  const filteredImages = useMemo(() => {
    return images.filter(image =>
      (selectedCategory === 'all' || image.category === selectedCategory) &&
      (image.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      image.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [images, searchTerm, selectedCategory]);

  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Image Gallery</h1>
      <div className="mb-6">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>
      <div className="mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Categories</option>
          <option value="general">General</option>
          <option value="specialSet">Special Set</option>
          <option value="personalizationCode">Personalization Code</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredImages.map(image => (
          <ImageCard key={image.id} image={image} onImageClick={handleImageClick} />
        ))}
      </div>
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-3xl w-full relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <img
              src={selectedImage.url}
              alt={selectedImage.description}
              className="w-full h-auto mb-4 rounded"
            />
            <h2 className="text-xl font-semibold mb-2">{selectedImage.description}</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedImage.tags.map(tag => (
                <span key={tag} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-gray-600">Category: {selectedImage.category}</p>
            {selectedImage.relatedImages.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Related Images</h3>
                <div className="grid grid-cols-3 gap-2">
                  {selectedImage.relatedImages.map(relatedId => {
                    const relatedImage = images.find(img => img.id === relatedId);
                    return relatedImage ? (
                      <img
                        key={relatedId}
                        src={relatedImage.url}
                        alt={relatedImage.description}
                        className="w-full h-24 object-cover rounded cursor-pointer"
                        onClick={() => handleImageClick(relatedImage)}
                      />
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;