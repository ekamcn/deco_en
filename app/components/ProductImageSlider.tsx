import React, { useState, useEffect, useRef } from 'react';

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
  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null); // Add ref for thumbnail container

  useEffect(() => {
    const container = sliderRef.current;
    if (!container) return;

    const children = container.children;
    const selectedChild = children[selectedIndex] as HTMLElement;

    if (selectedChild) {
      const scrollLeft =
        selectedChild.offsetLeft -
        container.offsetWidth / 2 +
        selectedChild.offsetWidth / 2;

      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [selectedIndex]);

  if (!images || images.length === 0) return null;

  const scrollToThumb = (idx: number) => {
    const thumbsContainer = thumbsRef.current;
    const currentThumb = document.getElementById(`thumb-${idx}`);
    if (!thumbsContainer || !currentThumb) return;

    // Calculate the scroll position to ensure the thumbnail is fully visible
    const thumbWidth = currentThumb.offsetWidth;
    const containerWidth = thumbsContainer.offsetWidth;
    const scrollLeft =
      currentThumb.offsetLeft - containerWidth / 2 + thumbWidth / 2;

    thumbsContainer.scrollTo({
      left: scrollLeft,
      behavior: 'smooth',
    });
  };

  const goLeft = () => {
    setSelectedIndex((prev) => {
      const newIndex = Math.max(prev - 1, 0);
      scrollToThumb(newIndex);
      return newIndex;
    });
  };

  const goRight = () => {
    setSelectedIndex((prev) => {
      const newIndex = Math.min(prev + 1, images.length - 1);
      scrollToThumb(newIndex);
      return newIndex;
    });
  };

  const handleThumbClick = (idx: number) => {
    setSelectedIndex(idx);
    scrollToThumb(idx);
  };

  const getVisibleThumbs = () => {
    if (images.length <= thumbsToShow) return images;

    let startIndex = Math.max(0, selectedIndex - Math.floor(thumbsToShow / 2));
    if (startIndex + thumbsToShow > images.length) {
      startIndex = Math.max(0, images.length - thumbsToShow);
    }
    return images.slice(startIndex, startIndex + thumbsToShow);
  };

  const visibleThumbs = getVisibleThumbs();

  return (
    <div className="w-full flex flex-col items-center space-y-4">
      {/* Main Image */}
      <div className="w-full">
        {/* Mobile Scrollable Image Slider */}
        <div className="block sm:hidden w-full max-w-full overflow-x-auto touch-auto scrollbar-hide">
          <div className="flex space-x-2" ref={sliderRef}>
            {images.map((img, idx) => (
              <div
                key={img.id || idx}
                className={`flex-shrink-0 transition-all rounded-lg cursor-pointer ${
                  idx === selectedIndex ? 'opacity-100' : 'opacity-60'
                }`}
                onClick={() => {
                  setSelectedIndex(idx);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedIndex(idx);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Select image ${idx + 1}`}
                id={`data-${idx}`}
              >
                <img
                  src={img.url}
                  alt={img.altText || `Product image ${idx + 1}`}
                  className="rounded-lg object-contain w-72 h-72 sm:w-auto sm:h-auto lg:h-[550px] lg:max-w-[550px]"
                />
              </div>
            ))}
          </div>
        </div>
        {/* Show selected image on tablet/desktop */}
        <div className="hidden sm:flex justify-center">
          <img
            src={images[selectedIndex].url}
            alt={
              images[selectedIndex].altText ||
              `Product image ${selectedIndex + 1}`
            }
            className="rounded-lg object-contain max-h-[400px] md:max-h-[500px] lg:max-h-[550px] w-auto h-auto"
          />
        </div>
      </div>

      {/* Thumbnails & Arrows */}
      <div className="flex items-center space-x-2 lg:space-x-4 w-full px-2">
        <button
          onClick={goLeft}
          className={`p-2 rounded-full cursor-pointer transition-all ${
            selectedIndex === 0
              ? 'bg-[var(--color-1)] cursor-not-allowed opacity-70'
              : 'bg-[var(--color-1)] hover:bg-[var(--color-1)]/80'
          }`}
          aria-label="Previous image"
          disabled={selectedIndex === 0}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M15 19l-7-7 7-7"
              stroke="#ffffff"
            />
          </svg>
        </button>

        <div
          className="w-full max-w-full overflow-x-auto touch-auto scrollbar-hide"
          ref={thumbsRef}
        >
          <div className="flex space-x-2 sm:space-x-3 lg:space-x-4">
            {visibleThumbs.map((img, idx) => {
              const actualIndex = images.indexOf(img);
              return (
                <button
                  key={img.id || actualIndex}
                  onClick={() => handleThumbClick(actualIndex)}
                  className={`flex-shrink-0 border transition-all cursor-pointer ${
                    actualIndex === selectedIndex
                      ? 'border-black'
                      : 'border-transparent'
                  }`}
                  aria-label={`Show image ${actualIndex + 1}`}
                  type="button"
                  id={`thumb-${actualIndex}`}
                >
                  <img
                    src={img.url}
                    alt={img.altText || `Thumbnail ${actualIndex + 1}`}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded"
                  />
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={goRight}
          className={`p-2 rounded-full transition-all cursor-pointer ${
            selectedIndex === images.length - 1
              ? 'bg-[var(--color-1)] cursor-not-allowed opacity-70'
              : 'bg-[var(--color-1)] hover:bg-[var(--color-1)]/80'
          }`}
          aria-label="Next image"
          disabled={selectedIndex === images.length - 1}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 5l7 7-7 7"
              stroke="#ffffff"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}