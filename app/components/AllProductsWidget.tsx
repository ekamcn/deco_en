import * as React from 'react';
import {ProductItem} from '~/components/ProductItem';
import type {ProductItemFragment} from 'storefrontapi.generated';

interface ProductNode {
  id: string;
  title: string;
  description?: string;
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

interface GraphQLResponse {
  data?: GraphQLProductsResponse;
  errors?: Array<{ message: string }>;
}

interface GraphQLProductsResponse {
  products: {
    edges: Array<{
      node: ProductNode;
    }>;
  };
}

interface ProductsData {
  nodes: ProductItemFragment[];
  pageInfo: {
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    startCursor?: string;
    endCursor?: string;
  };
}

// GraphQL query for fetching products
const ALL_PRODUCTS_QUERY = `
 query GetAllProducts($first: Int!) {
  products(first: $first) {
    edges {
      node {
        id
        title
        description
        featuredImage {
          id
          url
        }
        variants(first: 3) {
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
  }
}
`;

// Function to convert GraphQL response to ProductItemFragment format
function convertToProductItemFragment(node: ProductNode): ProductItemFragment {
  const variants = node.variants.edges.map(edge => edge.node);
  const firstVariant = variants[0];
  const price = firstVariant?.price || { amount: '0', currencyCode: 'USD' };
  
  // Find min and max prices from all variants
  const prices = variants.map(v => parseFloat(v.price.amount));
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  
  // Store compare-at-price info in a custom property for access in ProductItem
  const productFragment = {
    id: node.id,
    handle: node.title.toLowerCase().replace(/\s+/g, '-'),
    title: node.title,
    featuredImage: node.featuredImage ? {
      id: node.featuredImage.id,
      altText: node.title,
      url: node.featuredImage.url,
      width: 400,
      height: 400,
    } : undefined,
    priceRange: {
      minVariantPrice: {
        amount: minPrice.toString(),
        currencyCode: price.currencyCode as any,
      },
      maxVariantPrice: {
        amount: maxPrice.toString(),
        currencyCode: price.currencyCode as any,
      },
    },
  };
  
  // Add compare-at-price data as a custom property
  (productFragment as any).__compareAtPrice = firstVariant?.compareAtPrice;
  
  return productFragment;
}

interface AllProductsWidgetProps {
  title?: string;
  limit?: number;
  className?: string;
  showTitle?: boolean;
  storefront?: any; // For when passing storefront context
}

/**
 * AllProductsWidget - A self-contained component to display all products
 * 
 * This component fetches real product data from your Shopify storefront using GraphQL.
 * It can be used anywhere in your application without requiring props.
 * It includes its own loading state and error handling.
 * 
 * Usage:
 * ```tsx
 * // With all default settings
 * <AllProductsWidgetSimple />
 * 
 * // With custom settings
 * <AllProductsWidget 
 *   title="Featured Products" 
 *   limit={12} 
 *   showTitle={true} 
 * />
 * ```
 */
export function AllProductsWidget({
  title = "All Products",
  limit = 20,
  className = "all-products-widget",
  showTitle = true,
  storefront,
}: AllProductsWidgetProps = {}) {
  const [products, setProducts] = React.useState<ProductsData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);
        
        // Use fetch to call the GraphQL API
        const response = await fetch('/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: ALL_PRODUCTS_QUERY,
            variables: {
              first: limit,
            },
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json() as GraphQLResponse;
        if (result.errors && result.errors.length > 0) {
          throw new Error(result.errors[0].message);
        }

        const graphqlData = result.data;
        
        if (!graphqlData) {
          throw new Error('No data received from GraphQL API');
        }
        
        // Convert GraphQL response to our expected format
        const convertedProducts: ProductsData = {
          nodes: graphqlData.products.edges.map(edge => convertToProductItemFragment(edge.node)),
          pageInfo: {
            hasPreviousPage: false,
            hasNextPage: true,
            startCursor: 'start',
            endCursor: 'end',
          },
        };
        
        setProducts(convertedProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [limit]);

  if (loading) {
    return (
      <div className={`${className}`}>
        <div className="text-center p-8 text-gray-600 text-lg">
          <div className="flex items-center justify-center gap-3">
            <span>Loading products...</span>
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

  if (!products || products.nodes.length === 0) {
    return (
      <div className={`${className}`}>
        <p className="text-center p-8 text-gray-600 bg-gray-50 rounded">
          No products found.
        </p>
      </div>
    );
  }

  return (
    <div className={`${className} my-4`}>
      {showTitle && (
        <h2 className="mb-6 text-3xl md:text-2xl text-gray-800 text-center">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 p-4">
        {products.nodes.slice(0, limit).map((product, index) => (
          <ProductItem
            key={product.id}
            product={product}
            loading={index < 8 ? 'eager' : undefined}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * AllProductsWidgetSimple - A no-props version of AllProductsWidget
 * 
 * This is the simplest way to add product display to any route.
 * Just import and use:
 * 
 * ```tsx
 * import {AllProductsWidgetSimple} from '~/components/AllProductsWidget';
 * 
 * export default function MyRoute() {
 *   return (
 *     <div>
 *       <h1>My Page</h1>
 *       <AllProductsWidgetSimple />
 *     </div>
 *   );
 * }
 * ```
 */
export function AllProductsWidgetSimple() {
  return <AllProductsWidget />;
}
