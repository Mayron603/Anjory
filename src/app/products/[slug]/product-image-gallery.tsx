
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { getImageById } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function ProductImageGallery({ imageIds }: { imageIds: string[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const images = imageIds.map(id => getImageById(id)).filter(Boolean);
  const selectedImage = images[selectedIndex];

  const handlePrev = () => {
    setSelectedIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };
  
  if (images.length === 0) {
    return <div className="aspect-square w-full bg-muted rounded-lg" />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-square relative rounded-lg overflow-hidden border shadow-sm">
        {selectedImage && (
          <Image
            src={selectedImage.imageUrl}
            alt={selectedImage.description}
            data-ai-hint={selectedImage.imageHint}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        )}
      </div>
      {images.length > 1 && (
        <div className="relative flex items-center gap-2">
            <button 
                onClick={handlePrev} 
                className="absolute -left-3 z-10 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 disabled:opacity-50"
                aria-label="Previous image"
                disabled={images.length <= 5}
            >
                <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4">
                {images.map((image, index) => (
                    <button
                        key={`${image!.id}-${index}`}
                        onClick={() => setSelectedIndex(index)}
                        className={cn(
                        'w-20 h-20 flex-shrink-0 relative rounded-md overflow-hidden border-2',
                        selectedIndex === index ? 'border-primary' : 'border-transparent'
                        )}
                    >
                        <Image
                            src={image!.imageUrl}
                            alt={image!.description}
                            fill
                            className="object-cover"
                            sizes="80px"
                        />
                    </button>
                ))}
            </div>
            <button 
                onClick={handleNext} 
                className="absolute -right-3 z-10 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 disabled:opacity-50"
                aria-label="Next image"
                disabled={images.length <= 5}
            >
                <ChevronRight className="h-5 w-5" />
            </button>
        </div>
      )}
    </div>
  );
}
