//@/components/AllCollections.tsx

import * as React from 'react';
import {Link} from 'react-router';
import {Image} from '@shopify/hydrogen';
import type {CollectionFragment} from 'storefrontapi.generated';

interface CollectionNode {
  id: string;
  handle: string;
  title: string;
  description?: string;
  image?: {
    id: string;
    url: string;
  };
  metafield?: {
    value: string | null;
  };
}

interface GraphQLResponse {
  data?: GraphQLCollectionsResponse;
  errors?: Array<{ message: string }>;
}

interface GraphQLCollectionsResponse {
  collections: {
    edges: Array<{
      cursor: string;
      node: CollectionNode;
    }>;
  };
}

interface CollectionsData {
  nodes: CollectionFragment[];
  pageInfo: {
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    startCursor?: string;
    endCursor?: string;
  };
}

// GraphQL query for fetching collections
const ALL_COLLECTIONS_QUERY = `
  query GetAllCollections($first: Int!) {
    collections(first: $first) {
      edges {
        cursor
        node {
          id
          handle
          title
          description
          image {
            id
            url
          }
          metafield(namespace: "custom", key: "theme_types") {
            value
          }
        }
      }
    }
  }
`;

// Function to convert GraphQL response to CollectionFragment format
function convertToCollectionFragment(
  node: CollectionNode,
): CollectionFragment & {metafield?: {value: string | null}} {
  return {
    id: node?.id,
    handle: node?.handle,
    title: node?.title,
    image: node?.image
      ? {
          id: node?.image.id,
          url: node?.image.url,
          altText: node?.title,
          width: 400,
          height: 400,
        }
      : undefined,
    metafield: node?.metafield,
  };
}

interface AllCollectionsWidgetProps {
  title?: string;
  limit?: number;
  className?: string;
  showTitle?: boolean;
  storefront?: any; // For when passing storefront context
}

/**
 * AllCollectionsWidget - A self-contained component to display all collections
 * 
 * This component fetches real collection data from your Shopify storefront using GraphQL.
 * It can be used anywhere in your application without requiring props.
 * It includes its own loading state and error handling.
 * 
 * Usage:
 * ```tsx
 * // With all default settings
 * <AllCollectionsWidgetSimple />
 * 
 * // With custom settings
 * <AllCollectionsWidget 
 *   title="Shop Collections" 
 *   limit={6} 
 *   showTitle={true} 
 * />
 * ```
 */
export function AllCollectionsWidget({
  title = 'Discover Our Collections',
  limit = 100,
  className = 'all-collections-widget',
  showTitle = true,
  storefront,
}: AllCollectionsWidgetProps = {}) {
  const [collections, setCollections] = React.useState<CollectionsData | null>(
    null,
  );
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchCollections() {
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
            query: ALL_COLLECTIONS_QUERY,
            variables: {
              first: limit,
            },
          }),
        });

    

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = (await response.json()) as GraphQLResponse;
        //  console.log('GraphQL response collection:', result);
        if (result.errors && result.errors.length > 0) {
          throw new Error(result.errors[0].message);
        }

        const graphqlData = result.data;

        if (!graphqlData) {
          throw new Error('No data received from GraphQL API');
        }

        // Convert GraphQL response to our expected format
        const convertedCollections: CollectionsData = {
          nodes: graphqlData.collections.edges.map((edge) =>
            convertToCollectionFragment(edge.node),
          ),
          pageInfo: {
            hasPreviousPage: false,
            hasNextPage: true,
            startCursor: 'start',
            endCursor: 'end',
          },
        };

        setCollections(convertedCollections);
      } catch (err) {
        console.error('Error fetching collections:', err);
        setError(
          err instanceof Error ? err.message : 'Failed to fetch collections',
        );
      } finally {
        setLoading(false);
      }
    }

    fetchCollections();
  }, [limit]);


  const filteredCollections = collections?.nodes.filter(
    (collection: CollectionFragment) => {
      const titleMatch = import.meta.env.VITE_DISCOVER_OUR_COLLECTIONS?.includes(
        collection.title,
      );
      const values = collection?.metafield?.value
        ?.split(',')
        .map((v: string) => v.trim());        
      const metafieldMatch = values?.includes(import.meta.env.VITE_STORE_NAME);
      return titleMatch && metafieldMatch;
    },
  );
  if (loading) {
    return (
      <div className={`${className} loading`}>
        <div className="text-center py-8 text-gray-600 text-lg">
          <span>Loading collections...</span>
          <div className="inline-block w-5 h-5 border-3 border-gray-200 border-t-gray-800 rounded-full animate-spin ml-2 align-middle"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${className} error`}>
        <p className="text-red-600 p-4 text-center bg-red-50 rounded border border-red-200">
          Error: {error}
        </p>
      </div>
    );
  }

  if (!filteredCollections || filteredCollections.length === 0) {
    return (
      <div className={`${className} no-collections`}>
        <p className="text-center py-8 text-gray-600 bg-gray-100 rounded">
          No collections found.
        </p>
      </div>
    );
  }

  return (
    <div className={`${className} p-2 my-12 w-full`}>
      <div className="border-y-3 border-[var(--color-1)] max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
        {showTitle && (
          <h2 className="!pb-6 !text-3xl max-sm:!text-2xl font-bold text-[var(--color-2)] text-center tracking-tight">
            {title}
          </h2>
        )}
        <div className="grid lg:grid-cols-3 grid-cols-2 md:grid-cols-3 gap-5">
          {filteredCollections.slice(0, 3).map((collection, index) => (
            <CollectionItem
              key={collection.id}
              collection={collection}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
function CollectionItem({
  collection,
  index,
}: {
  collection: CollectionFragment;
  index: number;
}) {
  return (
    <Link
      className="group flex flex-col items-center no-underline text-inherit transition-transform duration-300 ease-in-out hover:transform hover:scale-105"
      key={collection.id}
      to={`/collections/${collection.handle}`}
      prefetch="intent"
    >
      <div className="w-[100px] h-[100px] max-sm:w-[80px] max-sm:h-[80px] rounded-full bg-gray-100 border-3 border-[var(--color-1)] shadow-[0_2px_4px_rgba(0,0,0,0.1)] flex items-center justify-center mb-2.5 overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:transform hover:scale-105">
        {collection?.image && (
          <Image
            alt={collection.image.altText || collection.title}
            aspectRatio="1/1"
            data={collection.image}
            loading={index < 3 ? 'eager' : undefined}
            sizes="(min-width: 45em) 100px, 100px"
            className="w-full h-full object-cover object-center"
          />
        )}
      </div>
      <h5 className="mt-2 mb-0 p-0 text-base font-semibold text-gray-800 text-center tracking-tight leading-tight">
        {collection.title}
      </h5>
    </Link>
  );
}

/**
 * AllCollectionsWidgetSimple - A no-props version of AllCollectionsWidget
 *
 * This is the simplest way to add collection display to any route.
 * Just import and use:
 *
 * ```tsx
 * import {AllCollectionsWidgetSimple} from '~/components/AllCollections';
 *
 * export default function MyRoute() {
 *   return (
 *     <div>
 *       <h1>My Page</h1>
 *       <AllCollectionsWidgetSimple />
 *     </div>
 *   );
 * }
 * ```
 */
export function AllCollectionsWidgetSimple() {
  return <AllCollectionsWidget />;
}
