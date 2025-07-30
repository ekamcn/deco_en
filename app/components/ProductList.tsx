import { useRef } from 'react';
import { Link } from 'react-router';

export interface Product {
  id: string;
  title: string;
  handle: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  featuredImage?: {
    id: string;
    url: string;
    altText?: string;
    width?: number;
    height?: number;
  } | null;
}

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const sliderRef = useRef<HTMLUListElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    const slider = sliderRef.current;
    if (!slider) return;
    const card = slider.querySelector('li');
    if (!card) return;
    const cardWidth = (card as HTMLElement).offsetWidth + 24;
    slider.scrollBy({
      left: direction === 'left' ? -cardWidth * 2 : cardWidth * 2,
      behavior: 'smooth',
    });
  };

  return (
    <div className="max-w-7xl px-5 !mx-auto">
      <p className="!text-3xl font-bold">You will Love them</p>
      <section>
        {/* Slider for large screens */}
        <div className="hidden lg:block">
          <ul
            ref={sliderRef}
            className="grid grid-flow-col auto-cols-[minmax(220px,1fr)] gap-6 overflow-x-auto scroll-smooth text-center scrollbar-hide"
            role="list"
            aria-label="Slider"
          >
            {products.map((product) => (
              <li key={product.id}>
                <div data-product-handle={product.handle}>
                  <div style={{ aspectRatio: '1/1' }}>
                    <div>
                      <div>
                        <div>
                          {product.featuredImage && (
                            <img
                              src={product.featuredImage.url}
                              alt={product.featuredImage.altText || product.title}
                              className="rounded-lg object-cover w-full h-48"
                              loading="lazy"
                              width={product.featuredImage.width || 300}
                              height={product.featuredImage.height || 300}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <h3 className="text-base font-semibold py-3">
                          <Link
                            to={`/products/${product.handle}`}
                            className="hover:underline"
                          >
                            {product.title}
                          </Link>
                        </h3>
                        {/* Ratings placeholder */}
                        <div className="pb-2" data-id={product.id}></div>
                        <div>
                          <div>
                            <span className="text-sm font-normal">
                              {product.priceRange.minVariantPrice.amount}{' '}
                              {product.priceRange.minVariantPrice.currencyCode}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex gap-2 justify-end items-center px-10">
            <button
              type="button"
              className="p-2 rounded-full bg-[var(--color-1)]"
              aria-label="Slide left"
              onClick={() => scroll('left')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" stroke='#ffffff' />
              </svg>
            </button>
            <button
              type="button"
              className="p-2 rounded-full bg-[var(--color-1)]"
              aria-label="Slide right"
              onClick={() => scroll('right')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" stroke='#ffffff' />
              </svg>
            </button>
          </div>
        </div>
        {/* Grid for md and below */}
        <div className="block lg:hidden">
          <ul className="grid grid-cols-2 sm:grid-cols-2 gap-6 text-center" role="list" aria-label="Product grid">
            {products.map((product) => (
              <li key={product.id}>
                <div data-product-handle={product.handle}>
                  <div style={{ aspectRatio: '1/1' }}>
                    <div>
                      <div>
                        <div>
                          {product.featuredImage && (
                            <img
                              src={product.featuredImage.url}
                              alt={product.featuredImage.altText || product.title}
                              className="rounded-lg object-cover w-full h-48"
                              loading="lazy"
                              width={product.featuredImage.width || 300}
                              height={product.featuredImage.height || 300}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <h3 className="text-base font-semibold py-3">
                          <Link
                            to={`/products/${product.handle}`}
                            className="hover:underline"
                          >
                            {product.title}
                          </Link>
                        </h3>
                        {/* Ratings placeholder */}
                        <div className="pb-2" data-id={product.id}></div>
                        <div>
                          <div>
                            <span className="text-sm font-normal">
                              {product.priceRange.minVariantPrice.amount}{' '}
                              {product.priceRange.minVariantPrice.currencyCode}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}