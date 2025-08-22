import * as React from 'react';
import type {AllProductsItemFragment} from 'storefrontapi.generated';
import {ProductItem} from './ProductItem';

interface ProductNode {
  id: string;
  title: string;
  description?: string;
  handle: string;
  featuredImage?: {
    id: string;
    url: string;
  };
  variants: {
    edges: Array<{
      node: {
        price: {
          amount: string;
          currencyCode: string;
        };
        compareAtPrice?: {
          amount: string;
          currencyCode: string;
        };
      };
    }>;
  };
}

interface CollectionNode {
  id: string;
  title: string;
  description?: string;
  handle: string;
  image?: {
    url: string;
  };
  products: {
    nodes: ProductNode[];
  };
  updatedAt: string;
}

interface GraphQLResponse {
  data?: {
    collectionByHandle: CollectionNode | null;
  };
  errors?: Array<{message: string}>;
}

// GraphQL query for fetching collection by handle with products
const GET_COLLECTION_BY_HANDLE_QUERY = `
  query GetCollectionByHandle($handle: String!) {
    collectionByHandle(handle: $handle) {
      id
      title
      description
      handle
      image {
        url
      }
      products(first: 20) {
        nodes {
          id
          title
          description
          handle
          featuredImage {
            id
            url
          }
          metafield(namespace: "custom", key: "theme_types") {
          value
        }
          variants(first: 1) {
            edges {
              node {
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
      updatedAt
    }
  }
`;

// Function to convert GraphQL product to ProductItemFragment format
function convertToProductItemFragment(
  node: ProductNode,
): AllProductsItemFragment {
  const firstVariant = node.variants.edges[0]?.node;
  const price = firstVariant?.price || {amount: '0', currencyCode: 'USD'};

  const productFragment = {
    id: node.id,
    handle: node.handle,
    title: node.title,
    featuredImage: node.featuredImage
      ? {
          id: node.featuredImage.id,
          altText: node.title,
          url: node.featuredImage.url,
          width: 400,
          height: 400,
        }
      : undefined,
    priceRange: {
      minVariantPrice: {
        amount: price.amount,
        currencyCode: price.currencyCode as any,
      },
      maxVariantPrice: {
        amount: price.amount,
        currencyCode: price.currencyCode as any,
      },
    },
  };

  // Add compare-at-price data as a custom property
  // Add compare-at-price data as a custom property
  (productFragment as any).__compareAtPrice =
    firstVariant?.compareAtPrice ?? null;

  // Ensure the returned object matches AllProductsItemFragment type requirements
  // Add a default description if missing (to satisfy lint/type error)
  return {
    ...productFragment,
    description: (node as any).description ?? '',
  } as AllProductsItemFragment;
}

interface CollectionByHandleProps {
  handle: string;
  title?: string;
  limit?: number;
  columnSize?: string;
  className?: string;
  showTitle?: boolean;
  badgeText?: string; // Optional badge text for flash deals or discounts
  showDescription?: boolean;
  forceSmallCols2?: boolean;
  badgeIcon?: boolean;
}

/**
 * CollectionByHandle - A component that fetches and displays products from a specific collection
 *
 * This component fetches products from a collection using its handle and displays them in a grid.
 * It includes loading states, error handling, and matches the product card styling.
 *
 * Usage:
 * ```tsx
 * <CollectionByHandle
 *   handle="featured-products"
 *   title="Featured Collection"
 *   limit={8}
 *   showTitle={true}
 *   showDescription={true}
 * />
 * ```
 */
export function CollectionByHandle({
  handle,
  title,
  limit = 12,
  columnSize = '4',
  className = 'collection-by-handle',
  badgeText = '',
  showTitle = true,
  showDescription = false,
  forceSmallCols2 = false,
  badgeIcon = false,
}: CollectionByHandleProps) {
  const [collection, setCollection] = React.useState<CollectionNode | null>(
    null,
  );

  const filteredProducts = collection?.products.nodes.filter((product: any) => {
    const values = product.metafield?.value
      ?.split(',')
      .map((v: string) => v.trim());
    return values?.includes(import.meta.env.VITE_STORE_NAME);
  });

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchCollection() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: GET_COLLECTION_BY_HANDLE_QUERY,
            variables: {
              handle,
            },
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = (await response.json()) as GraphQLResponse;
        if (result.errors && result.errors.length > 0) {
          throw new Error(result.errors[0].message);
        }

        const collectionData = result.data?.collectionByHandle;

        if (!collectionData) {
          throw new Error(`Collection with handle "${handle}" not found`);
        }

        setCollection(collectionData);
      } catch (err) {
        console.error('Error fetching collection:', err);
        setError(
          err instanceof Error ? err.message : 'Failed to fetch collection',
        );
      } finally {
        setLoading(false);
      }
    }

    if (handle) {
      fetchCollection();
    }
  }, [handle]);

  if (loading) {
    return (
      <div className={`${className}`}>
        <div className="text-center p-8 text-gray-600 text-lg">
          <div className="flex items-center justify-center gap-3">
            <span>Loading collection...</span>
            <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${className}`}>
        <p className="text-red-600 p-4 text-center bg-red-50 rounded border border-red-200">
          Error: {error}
        </p>
      </div>
    );
  }

  const displayTitle = collection?.title;
  const products = filteredProducts?.slice(0, limit);

  // Map columnSize to actual Tailwind classes
  const getGridCols = (size: string) => {
    const sizeMap: Record<string, string> = {
      '3': 'md:grid-cols-3',
      '4': 'lg:grid-cols-4',
      '5': 'xl:grid-cols-5',
      '6': 'xl:grid-cols-6',
    };
    return sizeMap[size] || 'md:grid-cols-3';
  };

  return (
    <div className={`${className} my-4 px-4 max-w-7xl mx-auto`}>
      {/* Collection Header */}
      {showTitle && (
        <h2 className="mb-4 text-xl md:!text-3xl text-gray-800 text-center capitalize">
          {displayTitle}
        </h2>
      )}

      {/* Collection Description */}
      {showDescription && collection?.description && (
        <p className="mb-6 text-gray-600 text-center max-w-3xl mx-auto">
          {collection?.description}
        </p>
      )}

      {/* Products Grid OR No Products Message */}
      {filteredProducts && filteredProducts.length > 0 ? (
        <div
          className={`grid grid-cols-1 ${
            forceSmallCols2 ? 'grid-cols-2' : 'grid-cols-1'
          } ${getGridCols(columnSize)} gap-6 mt-4 md:grid-cols-3`}
        >
          {filteredProducts.slice(0, limit).map((productNode, index) => {
            const product = convertToProductItemFragment(productNode);
            return (
              <ProductItem
                key={product.id}
                product={product}
                badgeText={badgeText}
                loading={index < 8 ? 'eager' : undefined}
                badgeIcon={badgeIcon}
              />
            );
          })}
        </div>
      ) : (
        <p className="text-center p-8 text-gray-600 bg-gray-50 rounded">
          No products found in this collection.
        </p>
      )}
    </div>
  );
}

/**
 * CollectionByHandleSimple - A no-props version for quick usage
 *
 * Usage:
 * ```tsx
 * <CollectionByHandleSimple handle="featured-products" />
 * ```
 */
export function CollectionByHandleSimple({handle}: {handle: string}) {
  return (
    <CollectionByHandle
      handle={handle}
      limit={8}
      showTitle={true}
      showDescription={false}
      className="collection-simple"
    />
  );
}
