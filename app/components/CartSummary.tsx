import type {CartApiQueryFragment} from 'storefrontapi.generated';
import type {CartLayout} from '~/components/CartMain';
import {Money, type OptimisticCart} from '@shopify/hydrogen';
 
const pricingMatrix = {
  french: [
    {offerId: '49768', price: 9.99, currency: 'EUR'},
    {offerId: '49769', price: 19.5, currency: 'EUR'},
    {offerId: '49770', price: 29.9, currency: 'EUR'},
    {offerId: '49771', price: 39.99, currency: 'EUR'},
    {offerId: '49772', price: 49.9, currency: 'EUR'},
    {offerId: '49773', price: 59.5, currency: 'EUR'},
    {offerId: '49774', price: 69.99, currency: 'EUR'},
    {offerId: '49775', price: 79.9, currency: 'EUR'},
    {offerId: '49776', price: 89.5, currency: 'EUR'},
    {offerId: '49777', price: 99.99, currency: 'EUR'},
    {offerId: '49778', price: 109.9, currency: 'EUR'},
    {offerId: '49779', price: 119.5, currency: 'EUR'},
  ],
  english: [
    {offerId: '49804', price: 9.99, currency: 'USD'},
    {offerId: '49805', price: 19.5, currency: 'USD'},
    {offerId: '49806', price: 29.9, currency: 'USD'},
    {offerId: '49807', price: 39.99, currency: 'USD'},
    {offerId: '49808', price: 49.9, currency: 'USD'},
    {offerId: '49809', price: 59.5, currency: 'USD'},
    {offerId: '49810', price: 69.99, currency: 'USD'},
    {offerId: '49811', price: 79.9, currency: 'USD'},
    {offerId: '49812', price: 89.5, currency: 'USD'},
    {offerId: '49813', price: 99.99, currency: 'USD'},
    {offerId: '49814', price: 109.9, currency: 'USD'},
    {offerId: '49815', price: 119.5, currency: 'USD'},
  ],
};
 
function getOfferId(
  price: number | string,
  locale: 'english' | 'french' = 'english',
): string {
  const matrix = pricingMatrix[locale] || pricingMatrix.english;
  const found = matrix.find(
    (item) => Number(item.price).toFixed(2) === Number(price).toFixed(2),
  );
  return found ? found.offerId : '';
}
 
type CartSummaryProps = {
  cart: OptimisticCart<CartApiQueryFragment | null>;
  layout: CartLayout;
  logoPath?: string;
  affId?: string;
};
 
export function CartSummary({cart, layout, affId}: CartSummaryProps) {
  const className =
    layout === 'page' ? 'cart-summary-page' : 'cart-summary-aside';
  const language = import.meta.env.VITE_LANGUAGE || 'english';
 
  return (
    <div aria-labelledby="cart-summary" className={className}>
      <dl className="cart-subtotal flex items-center justify-between">
        <dt>Total</dt>
        <dd>
          {cart.cost?.subtotalAmount?.amount ? (
            <Money data={cart.cost?.subtotalAmount} />
          ) : (
            '-'
          )}
        </dd>
      </dl>
      <CartCheckoutActions
        cart={cart}
        logoPath={import.meta.env.VITE_SQUARE_LOGO}
        affId={affId}
        locale={language}
      />
    </div>
  );
}
 
type CartCheckoutActionsProps = {
  cart: OptimisticCart<CartApiQueryFragment | null>;
  logoPath?: string;
  affId?: string;
  locale?: string;
};
 
function CartCheckoutActions({cart}: CartCheckoutActionsProps) {
  // Map short language codes to your pricingMatrix keys
  const langMap: Record<string, 'english' | 'french'> = {
    en: 'english',
    fr: 'french',
  };
 
  // Get language from env and normalize it
  const rawLang = import.meta.env.VITE_LANGUAGE || 'en';
  const locale = langMap[rawLang.toLowerCase()] || 'english';
 
  // Get affiliate ID
  const defaultAffId = 'AFF123';
  const finalAffId = encodeURIComponent(defaultAffId);
 
  // Get checkout domain and ID from env
  const checkoutBaseUrl = `${import.meta.env.VITE_CHECKOUT_DOMAIN}/${import.meta.env.VITE_CHECKOUT_ID}`;
 
  const lines = Array.isArray((cart?.lines as any)?.nodes)
    ? (cart?.lines as any).nodes
    : [];
 
  if (!lines.length) return null;
 
  const s2Arr: string[] = [];
  const s3Arr: string[] = [];
  const s4Arr: string[] = [];
 
  lines.forEach((line: any) => {
    const qty = line.quantity || 1;
    const image = line.merchandise?.image?.url || '';
    const title = line.merchandise?.product?.title || '';
    const price =
      line.cost?.amountPerQuantity?.amount || line.merchandise?.priceV2?.amount;
    const offerId = getOfferId(price, locale);
 
    for (let i = 0; i < qty; i++) {
      s2Arr.push(image);
      s3Arr.push(title);
      s4Arr.push(offerId);
    }
  });
 
  const s2Param = encodeURIComponent(s2Arr.join(','));
  const s3Param = encodeURIComponent(s3Arr.join(','));
  const s4Param = encodeURIComponent(s4Arr.join(','));
  const l1Param = encodeURIComponent(import.meta.env.VITE_COMPANY_NAME);
  const l2Param = encodeURIComponent(import.meta.env.VITE_COMPANY_ADDRESS);
  const l3Param = encodeURIComponent(
    import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL,
  );
  const l4Param = encodeURIComponent(
    import.meta.env.VITE_CUSTOMER_SERVICE_PHONE,
  );
  const m1param = encodeURIComponent(`${window.location.origin}/shipping`);
 
  const gclid = (() => {
    const match = document.cookie.match(/(?:^|; )gclid=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : '';
  })();
 
  const url = `${checkoutBaseUrl}?s1=${window.location.origin}/${import.meta.env.VITE_LOGO}&s2=${s2Param}&s3=${s3Param}&s4=${s4Param}&c1=custom1&c2=custom2&c3=custom3&c4=&c5=&c6=&affId=${finalAffId}}&l1=${l1Param}&l2=${l2Param}&l3=${l3Param}&l4=${l4Param}&m1=${m1param}&m2=&gclId=${gclid}`;
 
  return (
    <div>
      <a href={url} target="_self">
        <button
          type="submit"
          className="product-form__submit flex items-center justify-center gap-2 w-[100%] py-2 rounded-full text-lg font-bold transition-colors duration-200 bg-[var(--color-1)] text-white"
        >
          <span className="addbtntext">Continue to Checkout</span>
        </button>
      </a>
      <br />
    </div>
  );
}
 
 