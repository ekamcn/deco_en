import React, { useState, useEffect } from 'react';

interface ProductImage {
  url: string;
  altText?: string;
  id?: string | number;
  width?: number;
  height?: number;
}

interface ProductImageSliderProps {
  images: ProductImage[];
}

export function ProductImageSlider({ images }: ProductImageSliderProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [thumbsToShow, setThumbsToShow] = useState(5);

  useEffect(() => {
    const updateThumbsToShow = () => {
      const isMdOrSmaller = window.matchMedia('(max-width: 768px)').matches;
      setThumbsToShow(isMdOrSmaller ? 4 : 5);
    };

    updateThumbsToShow();

    window.addEventListener('resize', updateThumbsToShow);

    return () => window.removeEventListener('resize', updateThumbsToShow);
  }, []);

  if (!images || images.length === 0) return null;

  const goLeft = () => {
    setSelectedIndex((prev) => Math.max(prev - 1, 0));
  };

  const goRight = () => {
    setSelectedIndex((prev) => Math.min(prev + 1, images.length - 1));
  };

  const handleThumbClick = (idx: number) => {
    setSelectedIndex(idx);
  };

  const getVisibleThumbs = () => {
    if (images.length <= thumbsToShow) {
      return images;
    }

    let startIndex = Math.max(0, selectedIndex - Math.floor(thumbsToShow / 2));
    
    if (startIndex + thumbsToShow > images.length) {
      startIndex = Math.max(0, images.length - thumbsToShow);
    }

    return images.slice(startIndex, startIndex + thumbsToShow);
  };

  const visibleThumbs = getVisibleThumbs();

  return (
    <div className="w-full flex flex-col items-center">
      {/* Main Image */}
      <div className="w-full flex justify-center mb-4 lg:mb-8">
        <img
          src={images[selectedIndex].url}
          alt={images[selectedIndex].altText || `Product image ${selectedIndex + 1}`}
          className="rounded-lg object-contain max-h-[300px] max-w-[300px] lg:max-h-[500px] lg:max-w-[500px] w-auto mx-auto"
        />
      </div>
      {/* Slider Controls and Thumbnails */}
      <div className="flex items-center space-x-2 lg:space-x-4 pt-2 lg:pt-4">
        <button
          onClick={goLeft}
          className="p-2 rounded-full bg-[var(--color-1)]"
          aria-label="Select previous image"
          disabled={selectedIndex === 0}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" stroke='#ffffff' />
          </svg>
        </button>
        <div className="flex space-x-2 lg:space-x-4 overflow-x-auto">
          {visibleThumbs.map((img, idx) => {
            const actualIndex = images.indexOf(img);
            return (
              <button
                key={img.id || actualIndex}
                onClick={() => handleThumbClick(actualIndex)}
                className={`border rounded-md p-1 transition-all ${
                  actualIndex === selectedIndex ? 'border-black' : 'border-transparent'
                }`}
                aria-label={`Show image ${actualIndex + 1}`}
                type="button"
              >
                <img
                  src={img.url}
                  alt={img.altText || `Thumbnail ${actualIndex + 1}`}
                  className="w-20 h-20 lg:w-20 lg:h-20 object-cover rounded"
                />
              </button>
            );
          })}
        </div>
        <button
          onClick={goRight}
          className="p-2 rounded-full bg-[var(--color-1)]"
          aria-label="Select next image"
          disabled={selectedIndex === images.length - 1}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" stroke='#ffffff' />
          </svg>
        </button>
      </div>
    </div>
  );
}