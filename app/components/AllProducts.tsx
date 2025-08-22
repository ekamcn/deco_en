import * as React from 'react';
import {useLoaderData} from 'react-router';
import {getPaginationVariables} from '@shopify/hydrogen';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {ProductItem} from '~/components/ProductItem';
import type {ProductItemFragment} from 'storefrontapi.generated';

interface AllProductsProps {
  products: {
    nodes: ProductItemFragment[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor?: string;
      endCursor?: string;
    };
  };
  resourcesClassName?: string;
}

export function AllProducts({products, resourcesClassName}: AllProductsProps) {
  return (
    <div className="all-products">
      <h2>All Products</h2>
      <PaginatedResourceSection
        connection={products}
        resourcesClassName={resourcesClassName || "products-grid"}
      >
        {({node: product, index}) => (
          <ProductItem
            key={product.id}
            product={product}
            loading={index < 8 ? 'eager' : undefined}
          />
        )}
      </PaginatedResourceSection>
    </div>
  );
}

// GraphQL fragment for products
export const ALL_PRODUCTS_FRAGMENT = `#graphql
  fragment MoneyProduct on MoneyV2 {
    amount
    currencyCode
  }
  fragment AllProductsItem on Product {
    id
    handle
    title
    description
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyProduct
      }
      maxVariantPrice {
        ...MoneyProduct
      }
    }
    variants(first: 3) {
      edges {
        node {
          id
          price {
            amount
            currencyCode
          }
        }
      }
    }
  }
` as const;

// GraphQL query to fetch all products
export const ALL_PRODUCTS_QUERY = `#graphql
  query AllProducts(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes {
        ...AllProductsItem
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
  ${ALL_PRODUCTS_FRAGMENT}
` as const;

// Hook to fetch products data
export async function fetchAllProducts({
  storefront,
  request,
  pageBy = 20,
}: {
  storefront: any;
  request: Request;
  pageBy?: number;
}) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy,
  });

  const {products} = await storefront.query(ALL_PRODUCTS_QUERY, {
    variables: {...paginationVariables},
  });

  return products;
}