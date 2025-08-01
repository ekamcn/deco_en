import { type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { Await, useLoaderData, Link, type MetaFunction } from 'react-router';
import { Suspense } from 'react';
import { Image, Money } from '@shopify/hydrogen';
import type {
  FeaturedCollectionFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';
import { ProductItem } from '~/components/ProductItem';
import { ImageBanner } from '~/components/ImageBanner';
import { AllProductsWidget } from '~/components/AllProductsWidget';
import { AllCollectionsWidgetSimple } from '~/components/AllCollections';
import { CollectionByHandle } from '~/components/GetCollectionByHandle';
import FaqSection from '~/components/FaqSection';



const sections = [
  {
    title: 'Questions? We’ve Got Answers',
    faqs: [
      {
        question: 'Before You Reach Out',
        answer: (
          <div className='flex flex-col gap-4'>
            <p><strong>PLEASE NOTE :</strong> We kindly ask you to check our FAQ carefully before contacting us.</p>
            <p>If you don’t find the answer to your question, feel free to email us at <a href="mailto:{import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}" className=" hover:text-blue-300 transition-colors !text-[var(--color-1)] underline underline-offset-4">{import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}</a>"</p>
          </div>
        ),
      },
      {
        question: 'What Payment Methods Do You Accept?',
        answer: (
          <div className='flex flex-col gap-4'>
            <p>We accept a variety of payment methods, including Visa and MasterCard.</p>
            <p>All transactions are securely processed and encrypted to ensure your peace of mind.</p>

          </div>
        ),
      },
      {
        question: 'How Can I Track My Order?',
        answer: (
          <div className='flex flex-col gap-4'>
            <p>Once your order has been shipped, you’ll receive a confirmation email with a tracking number.</p>
            <p>You can use this number to track your package in real time on our website or directly on the carrier’s website.</p>
          </div>
        ),
      },
      {
        question: 'What Is Your Return Policy?',
        answer: (
          <div className='flex flex-col gap-4'>
            <p>We offer a flexible return policy. If you’re not satisfied with your purchase, please contact us within 30 days of receiving your order to arrange a return or exchange.</p>
            <p>For full details, please visit our Returns Policy page.</p>

          </div>
        ),
      }
    ],
  },
];


export const meta: MetaFunction = () => {
  return [{ title: 'Hydrogen | Home' }];
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
async function loadCriticalData({ context }: LoaderFunctionArgs) {
  const [{ collections }] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    featuredCollection: collections.nodes[0],
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({ context }: LoaderFunctionArgs) {
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

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="home">

      <ImageBanner
        title="Deco Bay"
        imageUrl={`/logo?imagename=VITE_BANNER`}
        subtitle="Welcome to Deco Bay, a proudly American brand committed to transforming your home with style, quality, and unbeatable value."
        description="Founded by a team of passionate home decor enthusiasts, our mission is simple: to make your living space more beautiful, more functional, and above all — more accessible for everyone."
        buttonText="Shop Now"
        buttonUrl=""
      />

      <CollectionByHandle
        handle="offre-flash"
        title="offer flash"
        limit={6}
        columnSize="6"
        badgeText="Flash Sale"
        showTitle={true}
        showDescription={false}
        className="featured-collection"
      />

      <CollectionByHandle
        handle="derniere-chance"
        title="derniere chance"
        limit={20}
        columnSize="4"
        badgeText="Last Chance"
        showTitle={true}
        showDescription={false}
        className="featured-collection"
      />


      <AllCollectionsWidgetSimple />
      {/* <AllProductsWidget limit={8} /> */}

      <CollectionByHandle
        handle="tout-a-moins-de-20"
        title="tout a moins de 20"
        limit={20}
        columnSize="5"
        showTitle={true}
        badgeText=""
        showDescription={false}
        className="featured-collection"
      />

      <FaqSection sections={sections} showNewsletter rounded />

      {/* <FeaturedCollection collection={data.featuredCollection} />
      <RecommendedProducts products={data.recommendedProducts} /> */}
    </div>
  );
}

function FeaturedCollection({
  collection,
}: {
  collection: FeaturedCollectionFragment;
}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image data={image} sizes="100vw" />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}

// function RecommendedProducts({
//   products,
// }: {
//   products: Promise<RecommendedProductsQuery | null>;
// }) {
//   return (
//     <div className="recommended-products">
//       <h2>Recommended Products</h2>
//       <Suspense fallback={<div>Loading...</div>}>
//         <Await resolve={products}>
//           {(response) => (
//             <div className="recommended-products-grid">
//               {response
//                 ? response.products.nodes.map((product) => (
//                     <ProductItem key={product.id} product={product} />
//                   ))
//                 : null}
//             </div>
//           )}
//         </Await>
//       </Suspense>
//       <br />
//     </div>
//   );
// }

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
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
  query RecommendedProductsPage ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;
