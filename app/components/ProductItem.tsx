import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import type {
  ProductItemFragment,
  CollectionItemFragment,
  RecommendedProductFragment,
} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';
 
export function ProductItem({
  product,
  loading,
  badgeText,
  badgeIcon,
}: {
  product:
    | CollectionItemFragment
    | ProductItemFragment
    | RecommendedProductFragment;
  loading?: 'eager' | 'lazy';
  badgeText?: string; // Optional badge text for flash deals or discounts
  badgeIcon?: boolean; // Optional badge icon for flash deals or discounts
}) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;
  //console.log('ProductItem:', product);
  // Get price range data
  const priceRange = product.priceRange as any;
  const minPrice = priceRange.minVariantPrice;
  const maxPrice = priceRange.maxVariantPrice || priceRange.minVariantPrice;
 
  // Get compare-at-price from custom property added by AllProductsWidget
  const compareAtPrice = (product as any).__compareAtPrice;
 
  // Check if there's a discount (compareAtPrice exists and is higher than regular price)
  const hasDiscount =
    compareAtPrice &&
    parseFloat(compareAtPrice.amount) > parseFloat(minPrice.amount);
 
  return (
    <Link
      className="border border-gray-300 bg-white p-2.5 text-center shadow-md relative flex flex-col justify-between transition-transform duration-200 ease-in-out hover:scale-105 rounded-sm"
      key={product.id}
      prefetch="intent"
      to={variantUrl}
    >
      {badgeText && (
        <div className="absolute top-1 left-1 bg-[var(--color-1)] text-white p-2 text-xs rounded-sm flex items-center gap-1">
          {badgeIcon && (
            <img 
              src="/alarmClock.svg" 
              alt="Alarm clock icon" 
              width="16" 
              height="16"
              className="flex-shrink-0"
            />
          )}
          {badgeText}
        </div>
      )}
 
      {/* Product Image */}
      <div className="mb-2.5">
        {image && (
          <Image
            alt={image.altText || product.title}
            aspectRatio="1/1"
            data={image}
            loading={loading}
            sizes="(min-width: 45em) 400px, 100vw"
            className="max-w-full h-auto object-cover w-full"
          />
        )}
      </div>
 
      {/* Product Title */}
<p className="text-sm font-bold text-gray-800 mb-2 line-clamp-2 min-h-[2.5rem] leading-tight text-center">
        {product.title}
      </p>
 
      {/* Price Info Section - with margin like CSS */}
      <div
        className={`my-2.5 flex ${compareAtPrice ? 'flex-wrap' : 'flex-col'} gap-1 justify-center items-center`}
      >
        {/* Compare At Price (strikethrough if discounted) - show first */}
        {hasDiscount && compareAtPrice && (
          <div className="text-md text-[gray-500] line-through">
            <Money data={compareAtPrice} />
          </div>
        )}
 
        {/* Current Price */}
        <div className="text-lg font-bold text-[var(--color-1)]">
          <Money data={minPrice} />
          {minPrice.amount !== maxPrice.amount && compareAtPrice && (
            <>
              <span className="text-sm font-normal text-[var(--color-1)]">
                {' '}
                -{' '}
              </span>
              <Money data={maxPrice} />
            </>
          )}
        </div>
 
        {/* Savings Badge - only if there's a discount */}
        {badgeText === 'Flash Sale' && (
          <div className="w-full !text-sm font-medium text-[#666666] px-2 py-1 self-center border-t border-gray-300 m-2">
            <p className="text-[#B7B7B7] !text-xs !pt-2">
              Today&apos;s Special Offer:
            </p>
            <div className="flex flex-wrap justify-center gap-1 !text-xs text-center">
              <span>
                {new Date().toLocaleDateString('en-US', {weekday: 'long'})},
              </span>
              <span className="text-red-600">
                {new Date().toLocaleDateString('en-US', {month: 'long'})}
              </span>
              <span>
                {new Date().toLocaleDateString('en-US', {day: 'numeric'})},
              </span>
              <span>
                {new Date().toLocaleDateString('en-US', {year: 'numeric'})}
              </span>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
 
 