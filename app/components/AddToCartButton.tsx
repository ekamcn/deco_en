import {forwardRef, useEffect, useRef, useState} from 'react';
import {type FetcherWithComponents} from 'react-router';
import {CartForm, type OptimisticCartLineInput} from '@shopify/hydrogen';
import {BsCircleFill} from 'react-icons/bs';
import {LuLoaderCircle} from 'react-icons/lu';

export const AddToCartButton = forwardRef<
  HTMLButtonElement,
  {
    analytics?: unknown;
    children: React.ReactNode;
    disabled?: boolean;
    lines: Array<OptimisticCartLineInput>;
    onClick?: () => void;
  }
>(({analytics, children, disabled, lines, onClick}, ref) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const spinnerTimeoutRef = useRef<number | null>(null);

  function startSpinnerForOneSecond() {
    setShowSpinner(true);
    if (spinnerTimeoutRef.current) {
      window.clearTimeout(spinnerTimeoutRef.current);
    }
    spinnerTimeoutRef.current = window.setTimeout(() => {
      setShowSpinner(false);
      spinnerTimeoutRef.current = null;
    }, 400);
  }

  useEffect(() => {
    return () => {
      if (spinnerTimeoutRef.current) {
        window.clearTimeout(spinnerTimeoutRef.current);
      }
    };
  }, []);

  return (
    <CartForm route="/cart" inputs={{lines}} action={CartForm.ACTIONS.LinesAdd}>
      {(fetcher: FetcherWithComponents<any>) => (
        <>
          <input
            name="analytics"
            type="hidden"
            value={JSON.stringify(analytics)}
          />
          <div className="flex items-center justify-end rounded-full py-1 gap-2 max-w-[450px] lg:w-[330px] xl:w-[450px] md:w-[255px]">
            <span className="font-semibold text-xs"> ✅ EN STOCK</span>
            <BsCircleFill className="text-green-800 w-3 h-3" />
          </div>
          <button
            ref={ref}
            type="submit"
            onClick={() => {
              if (onClick) onClick();
              startSpinnerForOneSecond();
            }}
            disabled={disabled ?? fetcher.state !== 'idle'}
            className={
              `flex items-center justify-center gap-2 py-3 rounded-full w-full max-w-[455px] lg:w-[330px] xl:w-[455px] text-base font-normal transition-colors duration-200 bg-[var(--color-1)] text-white cursor-pointer` +
              (disabled || fetcher.state !== 'idle'
                ? ' opacity-60 cursor-not-allowed'
                : '')
            }
          >
            {showSpinner ? (
              <div className="w-full flex justify-center items-center">
                <LuLoaderCircle className="w-6 h-6 text-gray-200 animate-spin" />
              </div>
            ) : (
              <span className="addbtntext">{children}</span>
            )}
          </button>
        </>
      )}
    </CartForm>
  );
});