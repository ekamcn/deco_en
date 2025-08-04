import {redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction, useSearchParams} from 'react-router';
import {Analytics} from '@shopify/hydrogen';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import {ProductItem} from '~/components/ProductItem';
import CollectionFilters from '~/components/CollectionFilters';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `Hydrogen | ${data?.collection.title ?? ''} Collection`}];
};

export async function loader({context, params, request}: LoaderFunctionArgs) {
  const {handle} = params;
  const {storefront} = context;

  if (!handle) {
    throw redirect('/collections');
  }

  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  const pageSize = 24;
  const availability = url.searchParams.get('filter.v.availability');
  const priceGte = url.searchParams.get('filter.v.price.gte');
  const priceLte = url.searchParams.get('filter.v.price.lte');
  const sortBy = url.searchParams.get('sort_by') || 'best-selling';

  // Build filters array for GraphQL
  const filters = [];
  if (availability) {
    filters.push({available: availability === '1'});
  }
  if (priceGte || priceLte) {
    const priceFilter: {price?: {min?: number; max?: number}} = {};
    if (priceGte)
      priceFilter.price = {...priceFilter.price, min: parseFloat(priceGte)};
    if (priceLte)
      priceFilter.price = {...priceFilter.price, max: parseFloat(priceLte)};
    filters.push(priceFilter);
  }

  // Map sortBy to Shopify sort keys
  const sortKeyMap: Record<string, string> = {
    'best-selling': 'BEST_SELLING',
    manual: 'COLLECTION_DEFAULT',
    'title-ascending': 'TITLE',
    'title-descending': 'TITLE',
    'price-ascending': 'PRICE',
    'price-descending': 'PRICE',
    'created-ascending': 'CREATED',
    'created-descending': 'CREATED',
  };

  const reverseMap: Record<string, boolean> = {
    'title-descending': true,
    'price-descending': true,
    'created-descending': true,
  };

  // Get cursor for the current page with filters and sort
  const {after} = await getCursorForPage({
    storefront,
    handle,
    pageSize,
    page,
    filters,
    sortKey: sortKeyMap[sortBy] || 'BEST_SELLING',
    reverse: reverseMap[sortBy] || false,
  });

  // Get paginated products with filters and sort
  const {collection} = await storefront.query(COLLECTION_QUERY, {
    variables: {
      handle,
      first: pageSize,
      after,
      filters,
      sortKey: sortKeyMap[sortBy]?.toUpperCase() as any || 'BEST_SELLING',
      reverse: reverseMap[sortBy] || false,
    },
  });

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {status: 404});
  }

  // Get total product count with filters
  const totalCountResponse = await storefront.query(GET_TOTAL_COUNT_QUERY, {
    variables: {handle, filters},
  });

  const totalProducts =
    totalCountResponse?.collection?.products?.edges?.length ?? 0;

  redirectIfHandleIsLocalized(request, {handle, data: collection});

  return {
    collection,
    page,
    totalProducts,
    filters: {
      availability,
      priceGte,
      priceLte,
    },
    sortBy,
  };
}

function getPageFromRequest(request: Request): number {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  return isNaN(page) || page < 1 ? 1 : page;
}

async function getCursorForPage({
  storefront,
  handle,
  pageSize,
  page,
  filters,
  sortKey,
  reverse,
}: {
  storefront: any;
  handle: string;
  pageSize: number;
  page: number;
  filters: any[];
  sortKey: string;
  reverse: boolean;
}) {
  if (page === 1) return {after: null};

  const {collection} = await storefront.query(GET_CURSOR_QUERY, {
    variables: {
      handle,
      first: (page - 1) * pageSize,
      filters,
      sortKey,
      reverse,
    },
  });

  const edges = collection?.products?.edges || [];
  const lastEdge = edges[edges.length - 1];

  return {after: lastEdge?.cursor ?? null};
}

export default function Collection() {
  const {collection, page, totalProducts, filters, sortBy} =
    useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();

  const hasNextPage = collection.products.pageInfo.hasNextPage;
  const hasPreviousPage = page > 1;
  const nextPage = page + 1;
  const prevPage = page - 1;

  const pageSize = 24;
  const totalPages = Math.ceil(totalProducts / pageSize);

  const updateFilters = (newFilters: {
    availability?: string;
    priceGte?: string;
    priceLte?: string;
  }) => {
    const params = new URLSearchParams(searchParams);
    if (newFilters.availability !== undefined) {
      if (newFilters.availability) {
        params.set('filter.v.availability', newFilters.availability);
      } else {
        params.delete('filter.v.availability');
      }
    }
    if (newFilters.priceGte !== undefined) {
      if (newFilters.priceGte) {
        params.set('filter.v.price.gte', newFilters.priceGte);
      } else {
        params.delete('filter.v.price.gte');
      }
    }
    if (newFilters.priceLte !== undefined) {
      if (newFilters.priceLte) {
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
    params.set('sort_by', newSortBy);
    params.set('page', '1'); // Reset to first page on sort change
    setSearchParams(params);
  };

  const resetFilters = () => {
    const params = new URLSearchParams();
    params.set('page', '1'); // Reset to first page
    setSearchParams(params);
  };

  // Build query string with current filters and sort for pagination links
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
    <>
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 py-8">
        {/* Sidebar Filters */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{collection.title}</h1>
          {collection.description && (
            <p className="text-gray-600 mt-2">{collection.description}</p>
          )}
          <CollectionFilters
            totalProducts={totalProducts}
            filters={filters}
            featured
            onChangeFilters={updateFilters}
            sortBy={sortBy}
            onChangeSortBy={updateSort}
            onReset={resetFilters}
          />
          <div className="products-grid  !grid-cols-2  lg:!grid-cols-4 gap-6 mt-10">
            {collection.products.nodes.map((product: any, index: any) => (
              <ProductItem
                key={product.id}
                product={product}
                loading={index < 8 ? 'eager' : undefined}
              />
            ))}
          </div>

          <div className="flex justify-center items-center gap-2 mt-8">
            {hasPreviousPage && (
              <a
                href={getPaginationQueryString(prevPage)}
                className="px-3 py-1 text-xl font-semibold rounded hover:bg-gray-200"
              >
                ‹
              </a>
            )}

            {pagination.map((p) => (
              <a
                key={p}
                href={getPaginationQueryString(Number(p) || page)}
                className={`px-3 py-1 rounded ${
                  page === p
                    ? 'font-semibold underline underline-offset-4'
                    : 'hover:bg-gray-200'
                }`}
              >
                {p}
              </a>
            ))}

            {hasNextPage && (
              <a
                href={getPaginationQueryString(nextPage)}
                className="px-3 py-1 text-xl font-semibold rounded hover:bg-gray-200"
              >
                ›
              </a>
            )}
          </div>

          <Analytics.CollectionView
            data={{
              collection: {
                id: collection.id,
                handle: collection.handle,
              },
            }}
          />
        </div>
      </div>
    </>
  );
}

const GET_TOTAL_COUNT_QUERY = `#graphql
  query CollectionProductCount($handle: String!, $filters: [ProductFilter!]) {
    collection(handle: $handle) {
      products(first: 250, filters: $filters) {
        edges {
          cursor
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  }
` as const;

const GET_CURSOR_QUERY = `#graphql
query CollectionCursor($handle: String!, $first: Int!, $filters: [ProductFilter!], $sortKey: ProductCollectionSortKeys, $reverse: Boolean) {
  collection(handle: $handle) {
    products(first: $first, filters: $filters, sortKey: $sortKey, reverse: $reverse) {
      edges {
        cursor
      }
    }
  }
}
` as const;

const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment CollectionProductItem on Product {
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
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
  }
` as const;

// NOTE: https://shopify.dev/docs/api/storefront/2022-04/objects/collection
const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $after: String
    $filters: [ProductFilter!]
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(first: $first, after: $after, filters: $filters, sortKey: $sortKey, reverse: $reverse) {
        nodes {
          ...CollectionProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
        }
      }
    }
  }
` as const;

