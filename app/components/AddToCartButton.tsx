import {type FetcherWithComponents} from 'react-router';
import {CartForm, type OptimisticCartLineInput} from '@shopify/hydrogen';
import { BsCircleFill } from 'react-icons/bs';

export function AddToCartButton({
  analytics,
  children,
  disabled,
  lines,
  onClick,
}: {
  analytics?: unknown;
  children: React.ReactNode;
  disabled?: boolean;
  lines: Array<OptimisticCartLineInput>;
  onClick?: () => void;
}) {
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
            <span className="font-semibold text-xs"> ✅ IN STOCK</span>
            <BsCircleFill className='text-green-800 w-3 h-3'/>
          </div>
          <button
            type="submit"
            onClick={onClick}
            disabled={disabled ?? fetcher.state !== 'idle'}
            className={
              `flex items-center justify-center gap-2 py-2 rounded-full w-full max-w-[455px] lg:w-[330px] xl:w-[455px] text-lg  font-normal transition-colors duration-200 bg-[var(--color-1)] text-white cursor-pointer` +
              (disabled || fetcher.state !== 'idle' ? ' opacity-60 cursor-not-allowed' : '')
            }
          >
            <span className="addbtntext">{children}</span>
          </button>
        </>
      )}
    </CartForm>
  );
}