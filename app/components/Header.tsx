import { Suspense, useState, useEffect, useRef } from 'react';
import { Await, NavLink, useAsyncValue, useLocation } from 'react-router';
import {
  type CartViewPayload,
  Image,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type { HeaderQuery, CartApiQueryFragment } from 'storefrontapi.generated';
import { useAside } from '~/components/Aside';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

interface CollectionNode {
  id: string;
  handle: string;
  title: string;
  description?: string;
  image?: {
    id: string;
    url: string;
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

type Viewport = 'desktop' | 'mobile';

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
 }
 }
 }
 }
`;

export function Header({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  const { shop, menu } = header;
  const logo = import.meta.env.VITE_LOGO;
  return (
    <>
      {/* Top Marquee Bar */}
      <div className="w-full bg-[var(--color-1)] overflow-hidden whitespace-nowrap text-xs">
        <div className="animate-marquee flex gap-136 px-6 py-2 !font-normal text-black !text-xs  tracking-widest">
          <span>Fast Shipping: 2–4 Days</span>
          <span>{import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}</span>
          <span>US-Based Customer Support 🇺🇸</span> <span>Fast Shipping: 2–4 Days</span>
          <span>{import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}</span>
          <span>US-Based Customer Support 🇺🇸</span>
        </div>
      </div>
      {/* Main Header */}
      <header className="sticky top-0 z-2 w-full bg-white shadow-md px-4 md:px-8 lg:px-20 mb-4">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between py-4 relative">
          {/* Left: Mobile Menu Toggle */}
          <div className="flex items-center md:hidden">
            <HeaderMenuMobileToggle />
          </div>
          {/* Left: Logo (Desktop Only) */}
          <div className="hidden md:flex items-center">
            <NavLink prefetch="intent" to="/" style={activeLinkStyle} end>
              <Image src={logo} alt="Store Logo" className="h-10 w-auto" />
            </NavLink>
          </div>
          {/* Center: Logo (Mobile Only, Centered) */}
          <div className="absolute left-1/2 transform -translate-x-1/2 md:hidden">
            <NavLink prefetch="intent" to="/" end>
              <Image src={logo} alt="Store Logo" className="h-10 w-auto" />
            </NavLink>
          </div>

          {/* Center: Desktop Menu */}
          <div className="hidden md:flex items-center flex-1 justify-center">
            <HeaderMenu
              menu={menu}
              viewport="desktop"
              primaryDomainUrl={header.shop.primaryDomain.url}
              publicStoreDomain={publicStoreDomain}
            />
          </div>
          {/* Right: CTAs (Login, Cart) */}
          <div className="flex items-center space-x-6">
            <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
          </div>
        </div>
      </header>
      {/* Marquee Animation Style */}
      <style>{`
 .animate-marquee {
 display: flex;
 animation: marquee 150s linear infinite;
 }

 @keyframes marquee {
 0% {
 transform: translateX(100%);
 }
 100% {
 transform: translateX(-100%);
 }
 }
`}</style>
    </>
  );
}

// Transform menu object to the desired structure
function transformMenuToHTML(menu: any, collections: any) {
  // Get collections data from the query
  const collectionsData =
    collections?.edges?.map((edge: any) => ({
      id: edge.node.handle,
      href: `/collections/${edge.node.handle}`,
      title: edge.node.title,
    })) || [];

  // Map the original menu items to our desired structure
  const baseItems = menu?.items || [];

  const transformedMenu = {
    className: 'header__inline-menu',
    items: [
      // Always add Home as first item
      {
        id: 'home',
        type: 'simple' as const,
        href: '/',
        title: 'Home',
        // isActive: true,
        className:
          'header__menu-item list-menu__item link link--text focus-inset',
      },
      // Add collections dropdown
      {
        id: 'collections',
        type: 'dropdown' as const,
        title: 'Our Collections',
        className: 'header__menu-item list-menu__item link focus-inset',
        submenu: collectionsData,
      },
      // Add static menu items
      {
        id: 'about',
        type: 'simple' as const,
        href: '/about',
        title: 'About Us',
        className:
          'header__menu-item list-menu__item link link--text focus-inset',
      },
      {
        id: 'faq',
        type: 'simple' as const,
        href: '/faq',
        title: 'FAQ',
        className:
          'header__menu-item list-menu__item link link--text focus-inset',
      },
      // Transform original menu items (except catalog which becomes dropdown)
      ...baseItems
        .filter(
          (item: any) =>
            item.type !== 'CATALOG' &&
            item.type !== 'FRONTPAGE' &&
            !item.title.toLowerCase().includes('catalogue'),
        )
        .map((item: any) => {
          // Convert URL to relative path
          let href = item.url;
          if (
            href &&
            (href.includes('myshopify.com') || href.includes('http'))
          ) {
            try {
              href = new URL(item.url).pathname;
            } catch {
              href = item.url;
            }
          }

          return {
            id: item.id,
            type: 'simple' as const,
            href: '/contact',
            title: 'Contact',
            className:
              'header__menu-item list-menu__item link link--text focus-inset',
          };
        }),
    ],
  };

  return transformedMenu;
}

export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  viewport: Viewport;
  publicStoreDomain: HeaderProps['publicStoreDomain'];
}) {
  const className = `header-menu-${viewport}`;
  const { close } = useAside('header');
  const location = useLocation();

  // State for dynamic collections fetching
  const [collections, setCollections] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Refs for click outside detection
  const dropdownRefs = useRef<{ [key: string]: HTMLDetailsElement | null }>({});

  // Fetch collections dynamically
  useEffect(() => {
    async function fetchCollections() {
      try {
        setLoading(true);

        // Use fetch to call the GraphQL API
        const response = await fetch('/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: ALL_COLLECTIONS_QUERY,
            variables: {
              first: 50,
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

        const graphqlData = result.data;

        if (graphqlData) {
          setCollections(graphqlData.collections);
        }
      } catch (err) {
        console.error('Error fetching collections:', err);
        // Continue with fallback collections on error
      } finally {
        setLoading(false);
      }
    }

    fetchCollections();
  }, []);

  // Handle click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      Object.values(dropdownRefs.current).forEach((dropdownRef) => {
        if (
          dropdownRef &&
          dropdownRef.open &&
          !dropdownRef.contains(event.target as Node)
        ) {
          dropdownRef.open = false;
        }
      });
    }

    // Add event listener when any dropdown might be open
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  // Close dropdowns on route change
  useEffect(() => {
    Object.values(dropdownRefs.current).forEach((dropdownRef) => {
      if (dropdownRef && dropdownRef.open) {
        dropdownRef.open = false;
      }
    });
  }, [location.pathname]);
  // Transform the menu for desktop view
  if (viewport === 'desktop') {
    const transformedMenu = transformMenuToHTML(
      menu || FALLBACK_HEADER_MENU,
      collections,
    );

    return (
      <nav className="header__inline-menu max-sm:!hidden">
        <ul className="list-menu list-menu--inline !text-sm">
          {transformedMenu.items.map((item) => {
            if (item.type === 'simple') {
              return (
                <li key={item.id}>
                  <NavLink
                    to={item.href}
                    className={item.className}
                    end={item.href === '/'}
                    onClick={close}
                    prefetch="intent"
                    style={activeLinkStyle}
                  >
                    <span
                      className={`${item.isActive ? 'header__active-menu-item ' : ''}`}
                    >
                      {item.title}
                    </span>
                  </NavLink>
                </li>
              );
            } else if (item.type === 'dropdown') {
              return (
                <li key={item.id}>
                  <div className="header-menu-dropdown">
                    <details
                      id={`Details-HeaderMenu-${item.id}`}
                      className="header-details-parent"
                      ref={(el) => {
                        dropdownRefs.current[item.id] = el;
                      }}
                    >
                      <summary
                        className={item.className}
                        role="button"
                        aria-expanded="false"
                        aria-controls={`HeaderMenu-MenuList-${item.id}`}
                      >
                        <span className="">
                          {item.title}

                          {/* {loading && <span className="ml-1 text-xs">(Loading...)</span>} */}
                        </span>
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          role="presentation"
                          className="icon icon-caret"
                          viewBox="0 0 10 6"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z"
                            fill="currentColor"
                          />
                        </svg>
                      </summary>
                      <ul
                        id={`HeaderMenu-MenuList-${item.id}`}
                        className="header__submenu color-scheme-1 gradient gradient first-header__submenu list-menu list-menu--disclosure gradient caption-large motion-reduce global-settings-popup"
                        tabIndex={-1}
                      >
                        {item.submenu?.map(
                          (subItem: {
                            id: string;
                            href: string;
                            title: string;
                          }) => (
                            <li key={subItem.id}>
                              <NavLink
                                to={subItem.href}
                                className="header__menu-item list-menu__item link link--text focus-inset caption-large "
                                onClick={close}
                                prefetch="intent"
                                style={activeLinkStyle}
                              >
                                {subItem.title}
                              </NavLink>
                            </li>
                          ),
                        )}
                      </ul>
                    </details>
                  </div>
                </li>
              );
            }
            return null;
          })}
        </ul>
      </nav>
    );
  }

  // Mobile menu with same transformed structure as desktop
  const transformedMenu = transformMenuToHTML(
    menu || FALLBACK_HEADER_MENU,
    collections,
  );

  return (
    <nav
      className={`${className} flex flex-col space-y-2 p-4`}
      role="navigation"
    >
      {transformedMenu.items.map((item) => {
        if (item.type === 'simple') {
          return (
            <NavLink
              key={item.id}
              to={item.href}
              className="header-menu-item block py-2 px-3 text-base font-medium rounded-md hover:bg-gray-100 transition-colors"
              end={item.href === '/'}
              onClick={close}
              prefetch="intent"
              style={activeLinkStyle}
            >
              {item.title}
            </NavLink>
          );
        } else if (item.type === 'dropdown') {
          return (
            <div key={item.id} className="mobile-dropdown">
              <details className="group">
                <summary className="flex justify-between items-center py-2 px-3 text-base font-medium rounded-md hover:bg-gray-100 cursor-pointer list-none">
                  <span>{item.title}</span>
                  <svg
                    className="w-4 h-4 transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="mt-2 ml-4 space-y-1">
                  {item.submenu?.map(
                    (subItem: { id: string; href: string; title: string }) => (
                      <NavLink
                        key={subItem.id}
                        to={subItem.href}
                        className="block py-2 px-3 text-sm text-gray-600 rounded-md hover:bg-gray-50 transition-colors"
                        onClick={close}
                        prefetch="intent"
                      >
                        {subItem.title}
                      </NavLink>
                    ),
                  )}
                </div>
              </details>
            </div>
          );
        }
        return null;
      })}
    </nav>
  );
}

function HeaderCtas({
  isLoggedIn,
  cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  return (
    <nav className="header-ctas flex items-center !gap-2" role="navigation">
      {/* <HeaderMenuMobileToggle /> */}
      {/* <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
 <Suspense fallback="Sign in">
 <Await resolve={isLoggedIn} errorElement="Sign in">
 {(isLoggedIn) => (isLoggedIn ? 'Account' : 'Sign in')}
 </Await>
 </Suspense>
 </NavLink> */}
      {/* <SearchToggle /> */}
      <CartToggle cart={cart} />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const { open } = useAside('header');
  return (
    <button
      className="header-menu-mobile-toggle reset"
      onClick={() => open('mobile')}
    >
<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="presentation"  className='w-5 h-5' fill="none" viewBox="0 0 18 16">
  <path d="M1 .5a.5.5 0 100 1h15.71a.5.5 0 000-1H1zM.5 8a.5.5 0 01.5-.5h15.71a.5.5 0 010 1H1A.5.5 0 01.5 8zm0 7a.5.5 0 01.5-.5h15.71a.5.5 0 010 1H1a.5.5 0 01-.5-.5z" fill="currentColor">
</path></svg>
    </button>
  );
}

function SearchToggle() {
  const { open } = useAside('header');
  return (
    <button className="reset" onClick={() => open('search')}>
      Search
    </button>
  );
}

function CartBadge({ count }: { count: number | null }) {
  const { open } = useAside('header');
  const { publish, shop, cart, prevCart } = useAnalytics();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        } as CartViewPayload);
      }}
      className="relative w-6 h-6 cursor-pointer"
      aria-label="Open cart"
    >
      {/* Cart Icon */}
      <svg
        className="w-full h-full"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.5 7L7 20h10l1.5-13H5.5zM9 10V6a3 3 0 116 0v4"
        />
      </svg>

      {/* Badge */}
      {count !== null && count > 0 && (
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--color-1)] text-white text-[11px] font-medium rounded-full flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
}

function CartToggle({ cart }: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
  };
}

