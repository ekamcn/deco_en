import {Money} from '@shopify/hydrogen';
import type {MoneyV2} from '@shopify/hydrogen/storefront-api-types';

export function ProductPrice({
  price,
  compareAtPrice,
}: {
  price?: MoneyV2;
  compareAtPrice?: MoneyV2 | null;
}) {
  return (
    <div className="flex flex-col gap-1">
      {compareAtPrice ? (
        <div className="flex flex-col">
          {price ? (
            <div className="text-lg font-bold text-white">
              <Money data={price} />
            </div>
          ) : null}
          <div className="text-sm text-gray-500 line-through">
            <span>Was: </span>
            <Money data={compareAtPrice} />
          </div>
        </div>
      ) : price ? (
        <div className="text-2xl font-bold text-white">
          <Money data={price} />
        </div>
      ) : (
        <span>&nbsp;</span>
      )}
    </div>
  );
}
