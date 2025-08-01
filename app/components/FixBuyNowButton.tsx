import {useState, useEffect} from 'react';
import {type FetcherWithComponents} from 'react-router';
import {CartForm, Money, type OptimisticCartLineInput} from '@shopify/hydrogen';
import {BsCircleFill} from 'react-icons/bs';
import {useAside} from './Aside';
import {ProductPrice} from '~/components/ProductPrice';
import type {ProductFragment} from 'storefrontapi.generated';
 
export function FixedBuyNowButton({
  selectedVariant,
  analytics,
}: {
  selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
  analytics?: unknown;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const {open} = useAside('header');
 
  useEffect(() => {
    const handleScroll = () => {
      // Show button when user scrolls down 300px
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 300);
    };
 
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
 
  if (!isVisible) return null;
 
  const lines = selectedVariant
    ? [
        {
          merchandiseId: selectedVariant.id,
          quantity: 1,
          selectedVariant,
        },
      ]
    : [];
 
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-4 py-3 shadow-lg md:hidden">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Price Information */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            {selectedVariant?.price?.amount && (
              <span className="text-xl  text-black px-4 py-4 rounded-lg">
                <Money data={selectedVariant?.price} />
              </span>
            )}
          </div>
        </div>
 
        {/* Buy Now Button */}
        <CartForm
          route="/cart"
          inputs={{lines}}
          action={CartForm.ACTIONS.LinesAdd}
        >
          {(fetcher: FetcherWithComponents<any>) => (
            <>
              <input
                name="analytics"
                type="hidden"
                value={JSON.stringify(analytics)}
              />
              <button
                type="submit"
                onClick={() => open('cart')}
                disabled={
                  !selectedVariant?.availableForSale || fetcher.state !== 'idle'
                }
                className={`
                  px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-white font-semibold text-base sm:text-lg transition-colors duration-200
                  ${
                    selectedVariant?.availableForSale &&
                    fetcher.state === 'idle'
                      ? 'bg-[var(--color-1)] hover:bg-[var(--color-1)]/90 cursor-pointer'
                      : 'bg-gray-400 cursor-not-allowed opacity-60'
                  }
                `}
              >
                {selectedVariant?.availableForSale ? 'Buy Now' : 'Sold out'}
              </button>
            </>
          )}
        </CartForm>
      </div>
    </div>
  );
}
 
 