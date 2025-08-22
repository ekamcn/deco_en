import * as React from 'react';
 
/**
* PaginatedResourceSection — reusable full-page numbered pagination
* without using @remix-run/react (no `useLocation`)
*/
export type ProductType = {
  id: string;
  handle: string;
  title: string;
  featuredImage?: {
    id: string;
    altText?: string;
    url: string;
    width?: number;
    height?: number;
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
};
 
export function PaginatedResourceSection<NodesType>({
  connection,
  children,
  resourcesClassName,
  page,
  totalProducts,
  pageSize = 24,
}: {
  connection: {
    nodes: NodesType[];
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  };
  children: React.FunctionComponent<{node: NodesType; index: number}>;
  resourcesClassName?: string;
  page: number;
  totalProducts: number;
  pageSize?: number;
}) {
  const {nodes, pageInfo} = connection;
  const totalPages = Math.ceil(totalProducts / pageSize);
  const nextPage = page + 1;
  const prevPage = page - 1;
 
  const pagination = getPagination(page, totalPages);
 
  return (
    <div>
      {/* Product Grid */}
      {resourcesClassName ? (
        <div className={resourcesClassName}>
          {nodes.map((node, index) => children({node, index}))}
        </div>
      ) : (
        nodes.map((node, index) => children({node, index}))
      )}
 
      {/* Pagination UI */}
      <div className="flex justify-center items-center gap-2 mt-8">
        {pageInfo.hasPreviousPage && (
          <a
            href={`?page=${prevPage}`}
            className="px-3 py-1 text-xl font-semibold rounded hover:bg-gray-200"
          >
            &lsaquo;
          </a>
        )}
 
        {pagination.map((p, i) =>
          p === '...' ? (
            <span key={i} className="px-2">
              ...
            </span>
          ) : (
            <a
              key={p}
              href={`?page=${p}`}
              className={`px-3 py-1 rounded ${
                page === p
                  ? 'font-semibold underline underline-offset-4'
                  : 'hover:bg-gray-200'
              }`}
            >
              {p}
            </a>
          )
        )}
 
        {pageInfo.hasNextPage && (
          <a
            href={`?page=${nextPage}`}
            className="px-3 py-1 text-xl font-semibold rounded hover:bg-gray-200"
          >
            &rsaquo;
          </a>
        )}
      </div>
    </div>
  );
}
 
/**
* Pagination range generator with ellipses
*/
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
 
 