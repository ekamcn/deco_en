
import { redirect, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData, type MetaFunction } from 'react-router';
import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
} from '@shopify/hydrogen';
import { ProductPrice } from '~/components/ProductPrice';
// import { ProductImage } from '~/components/ProductImage';
import { ProductForm } from '~/components/ProductForm';
import { redirectIfHandleIsLocalized } from '~/lib/redirect';
import { ProductImageSlider } from '~/components/ProductImageSlider';
import { Image } from '@shopify/hydrogen';
import FaqSection from '~/components/FaqSection';
import ProductList from '~/components/ProductList';
import { FixedBuyNowButton } from '~/components/FixBuyNowButton';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Await } from 'react-router';

const sections = [
  {
    title: 'Frequently Asked Questions (FAQ)',
    faqs: [
      {
        question: 'How do I place an order?',
        answer: (
          <div className="flex flex-col gap-4">
            <p>
              To place an order, simply browse our website, select the items you
              want to purchase, and follow the easy checkout steps. If you
              encounter any issues, feel free to contact our customer support
              team for assistance.
            </p>
          </div>
        ),
      },
      {
        question: 'What are the delivery times?',
        answer: (
          <div className="flex flex-col gap-4">
            <p>
              When you place an order on our store, it is processed by our
              fulfillment center within 1 business day. Delivery usually takes
              between 2 to 4 days.
            </p>
          </div>
        ),
      },
      {
        question: 'What is your return policy?',
        answer: (
          <div className="flex flex-col gap-4">
            <p>
              We offer a flexible return policy. If you’re not satisfied with
              your purchase, please contact us within 30 days of receiving your
              order to arrange a return or exchange. For more details, please
              visit our{' '}
              <a
                href="/returns"
                className="transition-colors !text-white underline underline-offset-4"
              >
                Return Policy
              </a>{' '}
              page.            </p>
          </div>
        ),
      },
      {
        question: 'How can I track my order?',
        answer: (
          <div className="flex flex-col gap-4">
            <p>
              Once your order has been shipped, you will receive a confirmation
              email with a tracking number. This number allows you to track your
              package in real time on our website or directly on the carrier’s
              site.
            </p>
          </div>
        ),
      },
      {
        question: 'What payment methods do you accept?',
        answer: (
          <div className="flex flex-col gap-4">
            <p>
              We accept a variety of payment methods including Visa and
              MasterCard. All transactions are secure and encrypted for your
              peace of mind.
            </p>
          </div>
        ),
      },
      {
        question: 'How can I contact you?',
        answer: (
          <div className="flex flex-col gap-4">
            <p>
              You can reach us by visiting our Contact Us page here or by
              emailing us at{' '}
              <a
                href="mailto:{import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}"
                className=" hover:text-blue-300 transition-colors !text-[var(--color-footer)] underline underline-offset-4"
              >
                {import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}
              </a>
              &quot;
            </p>
          </div>
        ),
      },
    ],
  },
];

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: `Hydrogen | ${data?.product.title ?? ''}` },
    {
      rel: 'canonical',
      href: `/products/${data?.product.handle}`,
    },
  ];
};

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return { ...deferredData, ...criticalData };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({
  context,
  params,
  request,
}: LoaderFunctionArgs) {
  const { handle } = params;
  const { storefront } = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const [{ product }] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: { handle, selectedOptions: getSelectedProductOptions(request) },
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!product?.id) {
    throw new Response(null, { status: 404 });
  }

  // The API handle might be localized, so redirect to the localized handle
  redirectIfHandleIsLocalized(request, { handle, data: product });

  return {
    product,
  };
}

function loadDeferredData({ context, params }: LoaderFunctionArgs) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}
const locale = import.meta.env.VITE_LANGUAGE;

function getDeliveryDateOld(daysToAdd: number) {
  const baseDate = new Date(); // Start from today
  const date = new Date(baseDate);
  let businessDaysAdded = 0;

  while (businessDaysAdded < daysToAdd) {
    date.setDate(date.getDate() + 1);
    if (date.getDay() !== 0) {
      // Skip Sundays
      businessDaysAdded++;
    }
  }

  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  // Format based on locale
  if (locale === 'fr') {
    // French format: DD/MM
    return `${day}/${month}`;
  } else {
    // US format: MM/DD
    return `${month}/${day}`;
  }
}
function getDeliveryDate(daysToAdd: number) {
  const baseDate = new Date(); // Start from today
  const date = new Date(baseDate);
  let businessDaysAdded = 0;

  while (businessDaysAdded < daysToAdd) {
    date.setDate(date.getDate() + 1);
    if (date.getDay() !== 0) {
      businessDaysAdded++;
    }
  }

  // Format based on locale
  if (locale === 'fr') {
    // French format: DD/MM
    const day = String(date.getDate()).padStart(2, '0');
    const monthName = date.toLocaleDateString('en', { month: 'long' });
    return `${day}/${monthName}`;
  } else {
    // US format: Full month name with day
    const monthName = date.toLocaleDateString('en', { month: 'long' });
    const day = String(date.getDate()).padStart(2, '0');
    return `${monthName} ${day}`;
  }
}

function FeatureItem({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-center gap-3 sm:gap-2 w-full">
     <span
        className="w-8 h-8 inline-block"
        role="img"
        aria-label={title}
        style={{
          backgroundColor: 'var(--color-1)',
          WebkitMaskImage: `url(${icon})`,
          maskImage: `url(${icon})`,
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
          WebkitMaskPosition: 'center',
          maskPosition: 'center',
        }}
      />
 
      <div className="flex flex-col w-full">
        <strong className="block text-[13px]  tracking-wider">{title}</strong>
        <span className="text-[13px]  tracking-wide  opacity-80">{desc}</span>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      fill="var(--color-1)"
      viewBox="0 0 16 16"
      className="mr-1"
    >
      <path d="M13.854 3.646a.5.5 0 0 0-.708-.708L7 9.793 3.854 6.646a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l6.5-6.5z"></path>
    </svg>
  );
}

export default function Product() {
  const { product } = useLoaderData<typeof loader>();

   
  // State to track visibility of the Buy Now button
  const [isBuyNowVisible, setIsBuyNowVisible] = useState(true);
  const buyNowButtonRef = useRef<HTMLButtonElement>(null);
  // Intersection Observer to detect when Buy Now button is out of view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsBuyNowVisible(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
      },
    );
 
    if (buyNowButtonRef.current) {
      observer.observe(buyNowButtonRef.current);
    }
 
    return () => {
      if (buyNowButtonRef.current) {
        observer.unobserve(buyNowButtonRef.current);
      }
    };
  }, []);

  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );
  // console.log(selectedVariant?.price, "fhjdsfghjdsfhgds");


  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  const { title, descriptionHtml } = product;
  const data = useLoaderData<typeof loader>();
  return (
    <div>
      <div className="product flex flex-col md:flex-row gap-4 mx-auto max-w-7xl p-4 !pt-10">
        <div className="flex flex-col items-center">
          <div className="sticky top-8">
            <ProductImageSlider
              images={
                product.images?.edges.map((edge: { node: any }) => ({
                  id: edge.node.id,
                  url: edge.node.url || edge.node.src || edge.node.originalSrc,
                  altText: edge.node.altText,
                  width: edge.node.width,
                  height: edge.node.height,
                })) ?? []
              }
            />
          </div>
        </div>
        <div className="product-main md:w-11/12 space-y-8">
          {/* Product Title */}
          <h1 className="text-3xl font-bold mb-2">{title}</h1>

          <p className="!pb-8 text-base">
            <strong>{import.meta.env.VITE_STORE_TITLE} 🇺🇸: </strong>The American Brand That Helps You Save
            BIG with Unbeatable Prices!
          </p>
          {/* Price, Date, Info */}
          <div className="flex sm:flex-row items-center sm:items-end gap-4 lg:!gap-2 pb-3">
            <span className="font-bold text-white bg-[var(--color-1)] px-3 py-3 rounded-lg">
              <ProductPrice
                price={selectedVariant?.price}
                compareAtPrice={selectedVariant?.compareAtPrice}
              />
            </span>
            <span className="text-sm text-gray-700 pl-0 sm:pl-4 lg:pb-5 tracking-widest">
              Today&apos;s Offer —
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
          {/* Stock/Offer Status */}
          <p className="font-normal mb-2 flex items-center text-sm">
            <svg
              aria-hidden="true"
              focusable="false"
              role="presentation"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.69502 0.6786C9.91338 0.601796 10.1516 0.603123 10.3691 0.682353L18.2151 3.54058C18.61 3.68445 18.8728 4.05988 18.8728 4.48018V14.4287C18.8728 14.8074 18.6588 15.1537 18.32 15.3231L10.4731 19.2465C10.196 19.385 9.87022 19.3873 9.59117 19.2526L1.45405 15.3244C1.10843 15.1576 0.888794 14.8076 0.888794 14.4239V4.48434C0.888794 4.05997 1.15665 3.68181 1.55699 3.541L9.69502 0.6786ZM6.07999 3.01017L2.5346 4.25719L10.149 7.63545L13.5692 6.118L6.07999 3.01017ZM6.78606 2.76183L14.1997 5.83828L17.5367 4.35774L10.0268 1.62195L6.78606 2.76183ZM1.88879 14.4239L1.88879 5.06467L9.64898 8.50762V18.1701L1.88879 14.4239ZM17.8728 14.4287L10.649 18.0405V8.50762L17.8728 5.30263V14.4287Z"
                fillRule="evenodd"
              ></path>
            </svg>
            <span className="font-normal text-[15px] pl-2 lg:text-base">
              Limited Stock | Ready to Ship
            </span>
          </p>

          {/* Delivery Estimate */}
          <div className="flex items-center gap-2 pt-2">
            <svg
              aria-hidden="true"
              focusable="false"
              role="presentation"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              className='w-7 h-7  lg:w-5 lg:h-5'
            >
              <path d="M18.7014 11.3962C18.7014 16.075 14.9085 19.8679 10.2297 19.8679C5.55095 19.8679 1.75806 16.075 1.75806 11.3962C1.75806 6.71746 5.55095 2.92457 10.2297 2.92457C14.9085 2.92457 18.7014 6.71746 18.7014 11.3962ZM10.2297 18.8679C14.3562 18.8679 17.7014 15.5227 17.7014 11.3962C17.7014 7.26974 14.3562 3.92457 10.2297 3.92457C6.10323 3.92457 2.75806 7.26974 2.75806 11.3962C2.75806 15.5227 6.10323 18.8679 10.2297 18.8679Z"></path>
              <path
                d="M10.7203 1.7782H9.7392C9.18691 1.7782 8.7392 2.22591 8.7392 2.7782V2.92456H11.7203V2.7782C11.7203 2.22591 11.2726 1.7782 10.7203 1.7782ZM9.7392 0.778198C8.63463 0.778198 7.7392 1.67363 7.7392 2.7782V3.92456H12.7203V2.7782C12.7203 1.67363 11.8249 0.778198 10.7203 0.778198H9.7392Z"
                fillRule="evenodd"
              ></path>
              <path d="M8.98448 11.3963C8.98448 10.7086 9.54201 10.1511 10.2298 10.1511C10.9175 10.1511 11.475 10.7086 11.475 11.3963C11.475 12.0841 10.9175 12.6416 10.2298 12.6416C9.54201 12.6416 8.98448 12.0841 8.98448 11.3963Z"></path>
              <path d="M9.72974 11.3962C9.72974 11.1201 9.95359 10.8962 10.2297 10.8962H15.2108C15.487 10.8962 15.7108 11.1201 15.7108 11.3962C15.7108 11.6724 15.487 11.8962 15.2108 11.8962H10.2297C9.95359 11.8962 9.72974 11.6724 9.72974 11.3962Z"></path>
              <path d="M10.2297 5.91517C10.5059 5.91517 10.7297 6.13902 10.7297 6.41517V8.90572C10.7297 9.18186 10.5059 9.40572 10.2297 9.40572C9.95359 9.40572 9.72974 9.18186 9.72974 8.90572V6.41517C9.72974 6.13902 9.95359 5.91517 10.2297 5.91517Z"></path>
              <path d="M13.9544 7.30685C14.1497 7.50211 14.1497 7.8187 13.9544 8.01396L12.1934 9.77505C11.9981 9.97031 11.6815 9.97031 11.4862 9.77505C11.291 9.57978 11.291 9.2632 11.4862 9.06794L13.2473 7.30685C13.4426 7.11159 13.7592 7.11159 13.9544 7.30685Z"></path>
            </svg>
            <span className="font-normal lg:text-base text-[15px] tracking-widest">
              Estimated Delivery Between:&nbsp;
              <strong> {getDeliveryDateOld(2)} </strong> and{' '}
              <strong> {getDeliveryDateOld(4)} </strong>
            </span>
          </div>

          {/* Product Form */}
          <ProductForm
            productOptions={productOptions}
            selectedVariant={selectedVariant}
            buyNowButtonRef={buyNowButtonRef}
          />

          {/* <img src="{import.meta.env.VITE_DOMAIN_NAME}/cdn/shop/files/2025-06-24_19.05.29.jpg?v=1750784750" alt="" /> */}
          <div className=" bg-white rounded flex items-center justify-center">
            <Image src="./image_one.jpg" />
          </div>
          {/* Feature Grid */}
          <div className="grid grid-cols-2  gap-4 sm:gap-4 shadow-xl p-4 sm:p-5 rounded-lg w-full">
            <FeatureItem
              icon="https://cdn.shopify.com/s/files/1/0805/7733/1526/files/surprise.png?v=1722838527"
              title="Free Shipping"
              desc="On all orders"
            />
            <FeatureItem
              icon="https://cdn.shopify.com/s/files/1/0805/7733/1526/files/fast-delivery.png?v=1722838525"
              title="Delivery in 2–4 Days"
              desc={`Starting from ${getDeliveryDate(2)}`}
            />
            <FeatureItem
              icon="https://cdn.shopify.com/s/files/1/0805/7733/1526/files/calendar.png?v=1722838525"
              title="30-Day Money-Back"
              desc="Try it risk-free"
            />
            <FeatureItem
              icon="https://cdn.shopify.com/s/files/1/0805/7733/1526/files/telephone.png?v=1722838526"
              title="24/7 Support"
              desc="We're here anytime"
            />
          </div>
          {/* Product Description */}
          <div className="prose max-w-none mt-4">
            <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
          </div>
          {/* Money-Back Guarantee Box */}
          {/* <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 shadow w-full max-lg:w-3/4 mx-auto"> */}

          <div className="bg-[#f9f9f9] border border-gray-300 rounded-lg p-4 shadow-lg w-full lg:w-[400px] xl:w-[420px] mx-auto">
            <div className="flex items-center pb-6 justify-center pt-3">
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="var(--color-1)"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M9 12L11 14L15 10M20 12C20 16.4611 14.54 19.6937 12.6414 20.683C12.4361 20.79 12.3334 20.8435 12.191 20.8712C12.08 20.8928 11.92 20.8928 11.809 20.8712C11.6666 20.8435 11.5639 20.79 11.3586 20.683C9.45996 19.6937 4 16.4611 4 12V8.21759C4 7.41808 4 7.01833 4.13076 6.6747C4.24627 6.37113 4.43398 6.10027 4.67766 5.88552C4.9535 5.64243 5.3278 5.50207 6.0764 5.22134L11.4382 3.21067C11.6461 3.13271 11.75 3.09373 11.857 3.07827C11.9518 3.06457 12.0482 3.06457 12.143 3.07827C12.25 3.09373 12.3539 3.13271 12.5618 3.21067L17.9236 5.22134C18.6722 5.50207 19.0465 5.64243 19.3223 5.88552C19.566 6.10027 19.7537 6.37113 19.8692 6.6747C20 7.01833 20 7.41808 20 8.21759V12Z" />
              </svg>
              <span className="ml-2 font-bold text-[var(--color-1)] text-base">
                30-DAY MONEY-BACK GUARANTEE
              </span>
            </div>

            <ul className="list-none pl-0 mb-2 text-sm text-gray-700">
              <li className="flex items-center pb-2">
                You&apos;re protected by our purchase guarantee
              </li>
              <li className="flex items-center mb-1">
                <CheckIcon /> 30-day satisfaction guarantee
              </li>
              <li className="flex items-center mb-1">
                <CheckIcon /> Ships within 48 hours
              </li>
              <li className="flex items-center mb-1">
                <CheckIcon /> Tracked delivery in 2–4 business days
              </li>
              <li className="flex items-center mb-1">
                <CheckIcon /> Carefully packaged
              </li>
            </ul>
            <div className="flex flex-col gap-2 border-t border-gray-300">
              <p className="font-bold text-center text-gray-800 mb-1 !pt-4">
                QUESTIONS?
              </p>
              <p className="text-start !text-sm font-normal">
                Our customer support team is available 5 days a week:
                <br />
                 <a
                  href={`mailto:${import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}`}
                  className=" hover:text-blue-300 transition-colors !text-[var(--color-1)] underline underline-offset-4"
                >
                  {import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}
                </a>
                <br />
                <a
                  href={`tel:${import.meta.env.VITE_CUSTOMER_SERVICE_PHONE}`}
                  className=" hover:text-blue-300 transition-colors !text-[var(--color-1)] underline underline-offset-4"
                >
                  {import.meta.env.VITE_CUSTOMER_SERVICE_PHONE}
                </a>
              </p>
            </div>
          </div>
        </div>
        <Analytics.ProductView
          data={{
            products: [
              {
                id: product.id,
                title: product.title,
                price: selectedVariant?.price.amount || '0',
                vendor: product.vendor,
                variantId: selectedVariant?.id || '',
                variantTitle: selectedVariant?.title || '',
                quantity: 1,
              },
            ],
          }}
        />
      </div>
      <div>
        <FaqSection sections={sections} showNewsletter heading='Newsletter' />
      </div>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={data.recommendedProducts}>
            {(response: any) =>
              response &&
                response.products &&
                response.products.nodes.length > 0 ? (
                <ProductList products={response.products.nodes} />
              ) : null
            }
          </Await>
        </Suspense>
      </div>

      {/* Fixed Buy Now Button */}
      {!isBuyNowVisible && <FixedBuyNowButton selectedVariant={selectedVariant} />}
    </div>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
 fragment ProductVariant on ProductVariant {
 availableForSale
 compareAtPrice {
 amount
 currencyCode
 }
 id
 image {
 __typename
 id
 url
 altText
 width
 height
 }
 price {
 amount
 currencyCode
 }
 product {
 title
 handle
 }
 selectedOptions {
 name
 value
 }
 sku
 title
 unitPrice {
 amount
 currencyCode
 }
 }
` as const;

const PRODUCT_FRAGMENT = `#graphql
 fragment Product on Product {
 id
 title
 vendor
 handle
 descriptionHtml
 description
 encodedVariantExistence
 encodedVariantAvailability
 options {
 name
 optionValues {
 name
 firstSelectableVariant {
 ...ProductVariant
 }
 swatch {
 color
 image {
 previewImage {
 url
 }
 }
 }
 }
 }
 selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
 ...ProductVariant
 }
 adjacentVariants (selectedOptions: $selectedOptions) {
 ...ProductVariant
 }
 seo {
 description
 title
 }
 images(first: 10) {
 edges {
 node {
 id
 url
 altText
 width
 height
 }
 }
 }
 }
 ${PRODUCT_VARIANT_FRAGMENT}
` as const;

const PRODUCT_QUERY = `#graphql
 query Product(
 $country: CountryCode
 $handle: String!
 $language: LanguageCode
 $selectedOptions: [SelectedOptionInput!]!
 ) @inContext(country: $country, language: $language) {
 product(handle: $handle) {
 ...Product
 }
 }
 ${PRODUCT_FRAGMENT}
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
 fragment RecommendedProduct on Product {
 id
 title
 handle
 priceRange {
 minVariantPrice {
 amount
 currencyCode
 }
 }
 featuredImage {
 id
 url
 altText
 width
 height
 }
 }
 query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
 @inContext(country: $country, language: $language) {
 products(first: 7, sortKey: UPDATED_AT, reverse: true) {
 nodes {
 ...RecommendedProduct
 }
 }
 }
` as const;

