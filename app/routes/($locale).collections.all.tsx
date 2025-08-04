import { type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData, type MetaFunction, useSearchParams } from 'react-router';
import { Analytics } from '@shopify/hydrogen';
import CollectionFilters from '~/components/CollectionFilters';
import { ProductItem } from '~/components/ProductItem';

export const meta: MetaFunction = () => {
  return [{ title: `Hydrogen | Products` }];
};

// Helper to build Shopify Storefront API query string from filters
function buildProductQueryString({
  availability,
  priceGte,
  priceLte,
}: {
  availability?: string;
  priceGte?: string;
  priceLte?: string;
}) {
  const queryParts: string[] = [];

  // Handle availability filter
  if (availability && ['0', '1'].includes(availability)) {
    queryParts.push(
      `available_for_sale:${availability === '1' ? 'true' : 'false'}`,
    );
  }

  // Handle price filters
  if (
    priceGte !== undefined &&
    priceGte !== '' &&
    !isNaN(parseFloat(priceGte))
  ) {
    queryParts.push(`variants.price:>=${parseFloat(priceGte).toFixed(2)}`);
  }
  if (
    priceLte !== undefined &&
    priceLte !== '' &&
    !isNaN(parseFloat(priceLte))
  ) {
    queryParts.push(`variants.price:<=${parseFloat(priceLte).toFixed(2)}`);
  }

  return queryParts.join(' ');
}

export async function loader({ context, request }: LoaderFunctionArgs) {
  const { storefront } = context;
  const url = new URL(request.url);

  const page = getPageFromRequest(request);
  const pageSize = 24;
  const availability = url.searchParams.get('filter.v.availability') || undefined;
  const priceGte = url.searchParams.get('filter.v.price.gte') || undefined;
  const priceLte = url.searchParams.get('filter.v.price.lte') || undefined;
  const sortBy = url.searchParams.get('sort_by') || 'best-selling';

  // Convert filters to Shopify query string
  const query = buildProductQueryString({ availability, priceGte, priceLte }) || '';
  console.log('Generated Query:', query, 'Sort By:', sortBy); // Debug filters and sort

  const sortKeyMap: Record<string, string> = {
    'best-selling': 'BEST_SELLING',
    manual: 'COLLECTION_DEFAULT',
    featured: 'COLLECTION_DEFAULT', // Assuming 'featured' uses manual collection order
    'title-ascending': 'TITLE',
    'title-descending': 'TITLE',
    'price-ascending': 'PRICE',
    'price-descending': 'PRICE',
    'created-ascending': 'CREATED_AT', // Use CREATED_AT for date sorting
    'created-descending': 'CREATED_AT',
  };

  const reverseMap: Record<string, boolean> = {
    'title-descending': true,
    'price-descending': true,
    'created-descending': true, // New to old
  };

  const sortKey = sortKeyMap[sortBy] || 'BEST_SELLING';
  const reverse = reverseMap[sortBy] || false;

  // Get all cursors and total products with filters and sort
  const { cursors, totalProducts } = await getAllProductCursors(
    storefront,
    pageSize,
    query,
    sortKey,
    reverse,
  );

  const totalPages = Math.ceil(totalProducts / pageSize);
  const actualPage = Math.min(page, totalPages);
  const after = cursors[actualPage - 1] ?? null;

  const { products } = await storefront.query(CATALOG_QUERY, {
    variables: {
      first: pageSize,
      after,
      query,
      sortKey: sortKey as any, // Type assertion to satisfy InputMaybe<ProductSortKeys>
      reverse,
    },
  });

  return {
    products: products.nodes,
    page: actualPage,
    pageSize,
    totalPages,
    hasNextPage: products.pageInfo.hasNextPage,
    hasPreviousPage: actualPage > 1,
    filters: {
      availability,
      priceGte,
      priceLte,
    },
    sortBy,
    totalProducts,
  };
}

async function getAllProductCursors(
  storefront: any,
  pageSize: number,
  query: string,
  sortKey: string,
  reverse: boolean,
): Promise<{
  cursors: (string | null)[];
  totalProducts: number;
}> {
  const cursors: (string | null)[] = [null]; // page 1 = null
  let hasNextPage = true;
  let after: string | null = null;
  let totalProducts = 0;

  while (hasNextPage) {
    const response: {
      products: {
        edges: { cursor: string }[];
        pageInfo: { hasNextPage: boolean };
      };
    } = await storefront.query(GET_CURSOR_QUERY, {
      variables: { first: pageSize, after, query, sortKey, reverse },
    });

    const products = response.products;
    const edges = products.edges ?? [];
    if (edges.length === 0) break;

    totalProducts += edges.length;

    const lastCursor = edges[edges.length - 1]?.cursor;
    after = lastCursor ?? null;

    if (edges.length === pageSize) {
      cursors.push(after); // store cursor for next page
    }

    hasNextPage = products.pageInfo.hasNextPage;
  }

  return { cursors, totalProducts };
}

function getPageFromRequest(request: Request): number {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  return isNaN(page) || page < 1 ? 1 : page;
}

export default function Collection() {
  const {
    products,
    page,
    pageSize,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    filters,
    sortBy,
    totalProducts,
  } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();

  const updateFilters = (newFilters: {
    availability?: string;
    priceGte?: string;
    priceLte?: string;
  }) => {
    const params = new URLSearchParams(searchParams);
    if (newFilters.availability !== undefined) {
      if (['0', '1'].includes(newFilters.availability)) {
        params.set('filter.v.availability', newFilters.availability);
      } else {
        params.delete('filter.v.availability');
      }
    }
    if (newFilters.priceGte !== undefined) {
      if (newFilters.priceGte && !isNaN(parseFloat(newFilters.priceGte))) {
        params.set('filter.v.price.gte', newFilters.priceGte);
      } else {
        params.delete('filter.v.price.gte');
      }
    }
    if (newFilters.priceLte !== undefined) {
      if (newFilters.priceLte && !isNaN(parseFloat(newFilters.priceLte))) {
        params.set('filter.v.price.lte', newFilters.priceLte);
      } else {
        params.delete('filter.v.price.lte');
      }
    }
    params.set('page', '1'); // Reset to first page on filter change
    setSearchParams(params);
  };

  const updateSort = (newSortBy: string) => {
    const params = new URLSearchParams(searchParams);
    if ([
      'best-selling',
      'manual',
      'featured',
      'title-ascending',
      'title-descending',
      'price-ascending',
      'price-descending',
      'created-ascending',
      'created-descending',
    ].includes(newSortBy)) {
      params.set('sort_by', newSortBy);
    } else {
      params.set('sort_by', 'best-selling'); // Fallback to default
    }
    params.set('page', '1'); // Reset to first page on sort change
    setSearchParams(params);
  };

  const resetFilters = () => {
    const params = new URLSearchParams();
    params.set('page', '1'); // Reset to first page
    setSearchParams(params);
  };

  const getPaginationQueryString = (targetPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', targetPage.toString());
    return `?${params.toString()}`;
  };

  function getPagination(current: number, total: number): (number | string)[] {
    const delta = 2;
    const range: (number | string)[] = [];

    for (
      let i = Math.max(1, current - delta);
      i <= Math.min(total, current + delta);
      i++
    ) {
      range.push(i);
    }

    if (typeof range[0] === 'number' && range[0] > 2) {
      range.unshift('...');
    }

    if (range[0] !== 1) {
      range.unshift(1);
    }

    const last = range[range.length - 1];
    if (typeof last === 'number' && last < total - 1) {
      range.push('...');
    }

    if (last !== total) {
      range.push(total);
    }

    return range;
  }

  const pagination = getPagination(page, totalPages);

  return (
    <div className="collection max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Products</h1>
      <CollectionFilters
        totalProducts={totalProducts}
        filters={filters}
        onChangeFilters={updateFilters}
        sortBy={sortBy}
        onChangeSortBy={updateSort}
        onReset={resetFilters}
      />
      {/* Product Grid */}
      <div className="grid !grid-cols-2  lg:!grid-cols-4 gap-6 mt-10">
        {products.map((product: any, index: number) => (
          <ProductItem
            key={product.id}
            product={product}
            loading={index < 8 ? 'eager' : undefined}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 mt-8">
        {hasPreviousPage && (
          <a
            href={getPaginationQueryString(page - 1)}
            className="px-3 py-1 text-xl font-semibold rounded hover:bg-gray-200"
          >
            ‹
          </a>
        )}

        {pagination.map((p) => (
          <a
            key={p}
            href={getPaginationQueryString(Number(p) || page)}
            className={`px-3 py-1 rounded ${page === p
                ? 'font-semibold underline underline-offset-4'
                : 'hover:bg-gray-200'
              }`}
          >
            {p}
          </a>
        ))}

        {hasNextPage && page < totalPages && (
          <a
            href={getPaginationQueryString(page + 1)}
            className="px-3 py-1 text-xl font-semibold rounded hover:bg-gray-200"
          >
            ›
          </a>
        )}
      </div>

      <Analytics.CollectionView
        data={{
          collection: {
            id: 'all-products',
            handle: 'all-products',
          },
        }}
      />
    </div>
  );
}

const GET_CURSOR_QUERY = `#graphql
  query GetCursors($first: Int!, $after: String, $query: String, $sortKey: ProductSortKeys, $reverse: Boolean) {
    products(first: $first, after: $after, query: $query, sortKey: $sortKey, reverse: $reverse) {
      edges {
        cursor
      }
      pageInfo {
        hasNextPage
      }
    }
  }
` as const;

const CATALOG_QUERY = `#graphql
  fragment MoneyFragment on MoneyV2 {
    amount
    currencyCode
  }
 
  fragment ProductFragment on Product {
    id
    handle
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyFragment
      }
      maxVariantPrice {
        ...MoneyFragment
      }
    }
  }
 
  query ProductList($first: Int, $after: String, $query: String, $sortKey: ProductSortKeys, $reverse: Boolean) {
    products(first: $first, after: $after, query: $query, sortKey: $sortKey, reverse: $reverse) {
      nodes {
        ...ProductFragment
      }
      pageInfo {
        hasNextPage
      }
    }
  }
` as const;
