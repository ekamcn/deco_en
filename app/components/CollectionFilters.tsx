
import React, { useState, useEffect, useRef } from 'react';
import { Aside, useAside } from './Aside';
import { BsArrowLeft } from 'react-icons/bs';
import { useLocation } from 'react-router';

export default function CollectionFilters({
  totalProducts = 0,
  filters,
  onChangeFilters,
  sortBy,
  onChangeSortBy,
  onReset,
  featured,
}: {
  totalProducts: number;
  filters: any;
  featured?: boolean;
  onChangeFilters: (filters: {
    availability?: string;
    priceGte?: string;
    priceLte?: string;
  }) => void;
  sortBy: string;
  onChangeSortBy: (sortBy: string) => void;
  onReset: () => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showAvailability, setShowAvailability] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const aside = useAside ? useAside('filters') : null;
  const location = useLocation();

  // Refs for click outside detection
  const availabilityRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);

  // Local state for price filters
  const [localPriceGte, setLocalPriceGte] = useState(filters.priceGte || '');
  const [localPriceLte, setLocalPriceLte] = useState(filters.priceLte || '');

  // Sync local state with filters prop when filters change (e.g., on reset)
  useEffect(() => {
    setLocalPriceGte(filters.priceGte || '');
    setLocalPriceLte(filters.priceLte || '');
  }, [filters.priceGte, filters.priceLte]);

  // Debounce price filter changes for desktop only
  useEffect(() => {
    // Only apply for desktop (when showPrice is true)
    if (
      showPrice &&
      (localPriceGte !== (filters.priceGte || '') ||
        localPriceLte !== (filters.priceLte || ''))
    ) {
      const handler = setTimeout(() => {
        onChangeFilters({
          ...filters,
          priceGte: localPriceGte,
          priceLte: localPriceLte,
        });
      }, 500);
      return () => clearTimeout(handler);
    }
  }, [localPriceGte, localPriceLte, showPrice, filters, onChangeFilters]);

  // Handle click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        showAvailability &&
        availabilityRef.current &&
        !availabilityRef.current.contains(event.target as Node)
      ) {
        setShowAvailability(false);
      }
      if (
        showPrice &&
        priceRef.current &&
        !priceRef.current.contains(event.target as Node)
      ) {
        setShowPrice(false);
      }
    }

    if (showAvailability || showPrice) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showAvailability, showPrice]);

  // Close dropdowns on route change
  useEffect(() => {
    setShowAvailability(false);
    setShowPrice(false);
  }, [location.pathname]);

  // Handlers for desktop filter toggles
  const handleAvailabilityClick = () => {
    setShowAvailability((prev) => {
      if (!prev) setShowPrice(false);
      return !prev;
    });
  };
  const handlePriceClick = () => {
    setShowPrice((prev) => {
      if (!prev) setShowAvailability(false);
      return !prev;
    });
  };

  // Open mobile sub-asides
  function openMobileAvailabilityAside() {
    if (aside) aside.open('mobile-availability');
  }
  function openMobilePriceAside() {
    if (aside) aside.open('mobile-price');
  }

  const handleReset = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => {
    e.preventDefault();
    onReset();
    setShowAvailability(false);
    setShowPrice(false);
    setLocalPriceGte('');
    setLocalPriceLte('');
    setMobileOpen(false);
    if (aside) aside.close();
  };

  const handleApply = () => {
    setMobileOpen(false);
    if (aside) aside.close();
  };

  const filterBar = (
    <div className="w-full pt-6">
      <div className="flex flex-wrap items-center gap-4 justify-between">
        <div className="flex items-center gap-2 text-base font-semibold">
          <span className="text-sm font-bold">Filter :</span>
          <div className="relative" ref={availabilityRef}>
            <button
              type="button"
              className="flex items-center gap-1 px-2 py-1 font-normal text-sm rounded"
              onClick={handleAvailabilityClick}
            >
              Availability
              <svg width="10" height="10" viewBox="0 0 10 6" className="ml-1">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z"
                  fill="currentColor"
                />
              </svg>
            </button>
            {showAvailability && (
              <div className="absolute left-0 top-full pt-2 bg-white border border-gray-300 rounded shadow p-4 z-10 min-w-[350px]">
                <div className="flex items-center justify-between pb-3">
                  <span className="font-normal text-sm">0 selected</span>
                  <a
                    href="#"
                    className="font-normal underline text-sm"
                    onClick={handleReset}
                  >
                    Reset
                  </a>
                </div>
                <div className="border-t pt-4">
                  <legend className="sr-only">Availability</legend>
                  <ul role="list" className="space-y-2">
                    <li>
                      <label
                        htmlFor="Filter-Availability-1"
                        className="flex items-center gap-2 cursor-pointer font-normal text-base"
                      >
                        <input
                          type="checkbox"
                          className="w-5 h-5"
                          name="filter.v.availability"
                          value="1"
                          id="Filter-Availability-1"
                          checked={filters.availability === '1'}
                          onChange={(e) =>
                            onChangeFilters({
                              ...filters,
                              availability: e.target.checked ? '1' : undefined,
                            })
                          }
                        />
                        <span>In stock ({totalProducts})</span>
                      </label>
                    </li>
                    <li>
                      <label
                        htmlFor="Filter-Availability-2"
                        className="flex items-center gap-2 cursor-pointer opacity-50 font-normal text-base"
                      >
                        <input
                          type="checkbox"
                          className="w-5 h-5"
                          name="filter.v.availability"
                          value="0"
                          id="Filter-Availability-2"
                          disabled
                        />
                        <span>Out of stock (0)</span>
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
          <div className="relative" ref={priceRef}>
            <button
              type="button"
              className="flex items-center gap-1 px-2 py-1 font-normal text-sm rounded"
              onClick={handlePriceClick}
            >
              Price
              <svg width="10" height="10" viewBox="0 0 10 6" className="ml-1">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z"
                  fill="currentColor"
                />
              </svg>
            </button>
            {showPrice && (
              <div className="absolute left-0 top-full pt-2 bg-white border border-gray-300 rounded shadow p-4 z-10 min-w-[350px]">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-normal text-sm">
                    The highest price is $69.99
                  </span>
                  <a
                    href="#"
                    className="underline text-sm font-normal"
                    onClick={handleReset}
                  >
                    Reset
                  </a>
                </div>
                <div className="flex items-center gap-3 border-t pt-4">
                  <span className="font-normal">$</span>
                  <div>
                    <input
                      className="border !border-gray-600 !rounded-full p-1 w-32"
                      name="filter.v.price.gte"
                      id="Filter-Price-GTE"
                      type="number"
                      placeholder="From"
                      min="0"
                      max="69.99"
                      value={localPriceGte}
                      onChange={(e) => setLocalPriceGte(e.target.value)}
                    />
                  </div>
                  <span className="font-normal">$</span>
                  <div>
                    <input
                      className="border !border-gray-600 !rounded-full p-1 w-32"
                      name="filter.v.price.lte"
                      id="Filter-Price-LTE"
                      type="number"
                      placeholder="To"
                      min="0"
                      max="69.99"
                      value={localPriceLte}
                      onChange={(e) => setLocalPriceLte(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <span className="font-bold text-sm">Sort by:</span>
          <select
            className="rounded p-1 text-sm text-black"
            name="sort_by"
            id="SortBy"
            value={sortBy}
            onChange={(e) => onChangeSortBy(e.target.value)}
          >
            <option value="best-selling">Best selling</option>
            {featured && <option value="manual">Featured</option>}
            <option value="title-ascending">Alphabetically, A-Z</option>
            <option value="title-descending">Alphabetically, Z-A</option>
            <option value="price-ascending">Price, low to high</option>
            <option value="price-descending">Price, high to low</option>
            <option value="created-ascending">Date, old to new</option>
            <option value="created-descending">Date, new to old</option>
          </select>
        </div>
        <p className="font-semibold text-gray-700 !text-sm">
          {totalProducts} products
        </p>
      </div>
    </div>
  );

  // Mobile filter button
  const mobileFilterButton = aside ? (
    <div className="flex justify-between items-center pb-4 px-2 lg:hidden">
      <button
        className="flex items-center gap-2 pt-6 rounded bg-primary text-black cursor-pointer"
        onClick={() => aside.open('mobile')}
        type="button"
      >
        <svg
          aria-hidden="true"
          focusable="false"
          width={20}
          height={20}
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M4.833 6.5a1.667 1.667 0 1 1 3.334 0 1.667 1.667 0 0 1-3.334 0ZM4.05 7H2.5a.5.5 0 0 1 0-1h1.55a2.5 2.5 0 0 1 4.9 0h8.55a.5.5 0 0 1 0 1H8.95a2.5 2.5 0 0 1-4.9 0Zm11.117 6.5a1.667 1.667 0 1 0-3.334 0 1.667 1.667 0 0 0 3.334 0ZM13.5 11a2.5 2.5 0 0 1 2.45 2h1.55a.5.5 0 0 1 0 1h-1.55a2.5 2.5 0 0 1-4.9 0H2.5a.5.5 0 0 1 0-1h8.55a2.5 2.5 0 0 1 2.45-2Z"
            fill="currentColor"
          />
        </svg>
        Filter & Sort
      </button>
      <p className="font-semibold text-gray-700 !text-sm !pt-5">
        {totalProducts} products
      </p>
    </div>
  ) : null;

  // Mobile main filter drawer
  const mobileDrawer = aside && aside.type === 'mobile' && (
    <div className="lg:hidden">
      <Aside type="mobile" heading="Filter and sort" contextId="filters">
        <div className="bg-white h-full overflow-y-auto relative pt-4 flex flex-col gap-8 pb-24">
          {/* Availability Dropdown (opens sub-aside) */}
          <div>
            <button
              type="button"
              className="flex items-center gap-1 px-2 py-1 rounded w-full justify-between"
              onClick={openMobileAvailabilityAside}
            >
              <span className="font-normal text-sm text-gray-700 tracking-widest">
                Availability
              </span>
              <svg
                width="16"
                height="10"
                viewBox="0 0 14 10"
                fill="none"
                aria-hidden="true"
                focusable="false"
                role="presentation"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </div>
          {/* Price Dropdown (opens sub-aside) */}
          <div>
            <button
              type="button"
              className="flex items-center gap-1 px-2 py-1 rounded w-full justify-between"
              onClick={openMobilePriceAside}
            >
              <span className="font-normal text-sm text-gray-700 tracking-widest">
                Price
              </span>
              <svg
                width="16"
                height="10"
                viewBox="0 0 14 10"
                fill="none"
                aria-hidden="true"
                focusable="false"
                role="presentation"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </div>
          {/* Sort by */}
          <div className="flex items-center gap-2 px-2 justify-between">
            <span className="font-normal text-gray-700 text-sm tracking-widest">
              Sort by:
            </span>
            <select
              className="rounded p-1 font-normal text-sm"
              name="sort_by"
              id="MobileSortBy"
              value={sortBy}
              onChange={(e) => onChangeSortBy(e.target.value)} // Fixed: Added onChange handler
            >
              <option value="best-selling">Best selling</option>
              {featured && <option value="manual">Featured</option>}
              <option value="title-ascending">Alphabetically, A-Z</option>
              <option value="title-descending">Alphabetically, Z-A</option>
              <option value="price-ascending">Price, low to high</option>
              <option value="price-descending">Price, high to low</option>
              <option value="created-ascending">Date, old to new</option>
              <option value="created-descending">Date, new to old</option>
            </select>
          </div>
          {/* Sticky/fixed bottom buttons */}
          <div className="fixed left-0 right-0 bottom-0 z-50 bg-white px-4 py-3 flex gap-2 border-t border-gray-200">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-full text-md font-medium transition-colors duration-200 text-black underline underline-offset-4 cursor-pointer"
            >
              <span className="font-normal text-sm tracking-widest">
                Remove all
              </span>
            </button>
            <button
              type="submit"
              onClick={handleApply}
              className="product-form__submit flex items-center justify-center gap-2 w-full px-3 py-2 rounded-full text-md font-medium transition-colors duration-200 bg-[var(--color-1)] text-white cursor-pointer"
            >
              <span className="addbtntext">Apply</span>
            </button>
          </div>
        </div>
      </Aside>
    </div>
  );

  // Mobile sub-Aside for Availability
  const mobileAvailabilityAside = aside &&
    aside.type === 'mobile-availability' && (
      <div className="lg:hidden">
        <Aside
          type="mobile-availability"
          heading="Filter and sort"
          contextId="filters"
        >
          <div className="bg-white h-full overflow-y-auto relative pt-4 flex flex-col gap-8 pb-24">
            <div className="px-4 flex flex-col gap-3">
              <div
                className="flex gap-2 cursor-pointer"
                onClick={() => aside.open('mobile')}
              >
                <BsArrowLeft className="w-5 h-5" />
                <p className="font-normal text-gray-700 text-sm tracking-widest">
                  Availability
                </p>
              </div>
              <div>
                <ul role="list" className="flex flex-col gap-3">
                  <li>
                    <label
                      htmlFor="Mobile-Filter-Availability-1"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="w-5 h-5"
                        name="filter.v.availability"
                        value="1"
                        id="Mobile-Filter-Availability-1"
                        checked={filters.availability === '1'} // Fixed: Sync with filters.availability
                        onChange={(e) =>
                          onChangeFilters({
                            ...filters,
                            availability: e.target.checked ? '1' : undefined,
                          })
                        } // Fixed: Call onChangeFilters
                      />
                      <span>In stock ({totalProducts})</span>
                    </label>
                  </li>
                  <li>
                    <label
                      htmlFor="Mobile-Filter-Availability-2"
                      className="flex items-center gap-2 cursor-pointer opacity-50"
                    >
                      <input
                        type="checkbox"
                        className="w-5 h-5"
                        name="filter.v.availability"
                        value="0"
                        id="Mobile-Filter-Availability-2"
                        disabled
                      />
                      <span>Out of stock (0)</span>
                    </label>
                  </li>
                </ul>
              </div>
            </div>
            {/* Sticky/fixed bottom buttons */}
            <div className="fixed left-0 right-0 bottom-0 z-50 bg-white px-4 py-3 flex gap-2 border-t border-gray-200">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-full text-md font-medium transition-colors duration-200 text-black underline underline-offset-4 cursor-pointer"
              >
                <span className="font-normal text-sm tracking-widest">
                  Clear
                </span>
              </button>
              <button
                type="submit"
                onClick={() => {
                  onChangeFilters({ ...filters }); // Fixed: Ensure current filters are applied
                  handleApply();
                }}
                className="product-form__submit flex items-center justify-center gap-2 w-full px-3 py-2 rounded-full text-md font-medium transition-colors duration-200 bg-[var(--color-1)] text-white cursor-pointer"
              >
                <span className="addbtntext">Apply</span>
              </button>
            </div>
          </div>
        </Aside>
      </div>
    );

  // Mobile sub-Aside for Price
  const mobilePriceAside = aside && aside.type === 'mobile-price' && (
    <div className="lg:hidden">
      <Aside type="mobile-price" heading="Filter and sort" contextId="filters">
        <div className="bg-white h-full overflow-y-auto relative pt-4 flex flex-col gap-8 pb-24">
          <div className="px-4 flex flex-col gap-3">
            <div
              className="flex gap-2 cursor-pointer"
              onClick={() => aside.open('mobile')}
            >
              <BsArrowLeft className="w-5 h-5" />
              <p className="font-normal text-gray-700 text-sm tracking-widest">
                Price
              </p>
            </div>
            <div className="flex items-center justify-between pt-3">
              <span className="font-normal text-sm tracking-widest">
                The highest price is $69.99
              </span>
            </div>
            <div className="flex items-center gap-3 pt-4">
              <span className="font-normal">$</span>
              <div>
                <input
                  className="border !border-gray-600 !rounded-full p-1 w-32"
                  name="filter.v.price.gte"
                  id="Filter-Price-GTE"
                  type="number"
                  placeholder="From"
                  min="0"
                  max="69.99"
                  value={localPriceGte}
                  onChange={(e) => setLocalPriceGte(e.target.value)}
                />
              </div>
              <span className="font-normal">$</span>
              <div>
                <input
                  className="border !border-gray-600 !rounded-full p-1 w-32"
                  name="filter.v.price.lte"
                  id="Filter-Price-LTE"
                  type="number"
                  placeholder="To"
                  min="0"
                  max="69.99"
                  value={localPriceLte}
                  onChange={(e) => setLocalPriceLte(e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* Sticky/fixed bottom buttons */}
          <div className="fixed left-0 right-0 bottom-0 z-50 bg-white px-4 py-3 flex gap-2 border-t border-gray-200">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-full text-md font-medium transition-colors duration-200 text-black underline underline-offset-4 cursor-pointer"
            >
              <span className="font-normal text-sm tracking-widest">Clear</span>
            </button>
            <button
              type="submit"
              onClick={() => {
                onChangeFilters({
                  ...filters,
                  priceGte: localPriceGte,
                  priceLte: localPriceLte,
                });
                handleApply(); // Fixed: Close aside after applying
              }}
              className="product-form__submit flex items-center justify-center gap-2 w-full px-3 py-2 rounded-full text-md font-medium transition-colors duration-200 bg-[var(--color-1)] text-white cursor-pointer"
            >
              <span className="addbtntext">Apply</span>
            </button>
          </div>
        </div>
      </Aside>
    </div>
  );

  return (
    <>
      <div className="hidden lg:block">{filterBar}</div>
      {mobileFilterButton}
      {mobileDrawer}
      {mobileAvailabilityAside}
      {mobilePriceAside}
    </>
  );
}

