import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type AsideType = 'search' | 'cart' | 'mobile' | 'closed' | 'mobile-availability' | 'mobile-price' | 'collections';
type AsideContextValue = {
  type: AsideType;
  open: (mode: AsideType) => void;
  close: () => void;
};

// Create a map to store multiple contexts
const asideContexts = new Map<string, React.Context<AsideContextValue | null>>();

// Get or create a context for a specific ID
function getAsideContext(contextId: string) {
  if (!asideContexts.has(contextId)) {
    asideContexts.set(contextId, createContext<AsideContextValue | null>(null));
  }
  return asideContexts.get(contextId)!;
}

/**
 * A side bar component with Overlay
 * @example
 * ```jsx
 * <Aside type="search" heading="SEARCH">
 *  <input type="search" />
 *  ...
 * </Aside>
 * ```
 */
export function Aside({
  children,
  heading,
  type,
  contextId = 'default',
}: {
  children?: React.ReactNode;
  type: AsideType;
  heading: React.ReactNode;
  contextId?: string;
}) {
  const { type: activeType, close } = useAside(contextId);
  const expanded = type === activeType;

  useEffect(() => {
    const abortController = new AbortController();

    if (expanded) {
      document.addEventListener(
        'keydown',
        function handler(event: KeyboardEvent) {
          if (event.key === 'Escape') {
            close();
          }
        },
        { signal: abortController.signal },
      );
    }
    return () => abortController.abort();
  }, [close, expanded]);

  return (
    <div
      aria-modal
      className={`overlay ${expanded ? 'expanded' : ''}`}
      role="dialog"
    >
      <button className="close-outside" onClick={close} />
      <aside style={{ height: '100vh' }} className="flex flex-col">
        <header className="flex-shrink-0">
          <h3>{heading}</h3>
          <button className="close reset w-5 h-5" onClick={close} aria-label="Close">
            <svg onClick={close} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="presentation"  fill="none" viewBox="0 0 18 17">
              <path d="M.865 15.978a.5.5 0 00.707.707l7.433-7.431 7.579 7.282a.501.501 0 00.846-.37.5.5 0 00-.153-.351L9.712 8.546l7.417-7.416a.5.5 0 10-.707-.708L8.991 7.853 1.413.573a.5.5 0 10-.693.72l7.563 7.268-7.418 7.417z" fill="currentColor">
              </path></svg>
          </button>
        </header>
        <main className="flex-1 min-h-0 overflow-y-auto">{children}</main>
      </aside>
    </div>
  );
}

Aside.Provider = function AsideProvider({ 
  children, 
  contextId = 'default' 
}: { 
  children: ReactNode;
  contextId?: string;
}) {
  const [type, setType] = useState<AsideType>('closed');
  const AsideContext = getAsideContext(contextId);

  return (
    <AsideContext.Provider
      value={{
        type,
        open: setType,
        close: () => setType('closed'),
      }}
    >
      {children}
    </AsideContext.Provider>
  );
};

export function useAside(contextId: string = 'default') {
  const AsideContext = getAsideContext(contextId);
  const aside = useContext(AsideContext);
  if (!aside) {
    throw new Error(`useAside must be used within an AsideProvider with contextId: ${contextId}`);
  }
  return aside;
}

