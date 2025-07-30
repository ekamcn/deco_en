import {useState} from 'react';

export function StoreConfigViewer() {
  const [activeTab, setActiveTab] = useState('basics');

  // Get environment variables
  const storeConfig = {
    // Store Basics
    storeName: import.meta.env.VITE_STORE_NAME || 'Store Name Not Set', //done
    customerSupportEmail: import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL || 'Email Not Set', //done
    customerServicePhone: import.meta.env.VITE_CUSTOMER_SERVICE_PHONE || 'Phone Not Set', //done
    domainName: import.meta.env.VITE_DOMAIN_NAME || 'Domain Not Set', //done
    shopifyEmail: import.meta.env.VITE_SHOPIFY_EMAIL || 'Optional',
    shopifyURL: import.meta.env.VITE_SHOPIFY_URL || 'Shopify URL Not Set',


    // Theme Selection
    category: import.meta.env.VITE_CATEGORY || 'general', //done
    language: import.meta.env.VITE_LANGUAGE || 'en', //done

    // Brand Customization
    color1: import.meta.env.VITE_COLOR1 || '#000000', //done
    color2: import.meta.env.VITE_COLOR2 || '#ffffff', //done
    logo: import.meta.env.VITE_LOGO || '/deco-bay-logo.avif',
    banner: import.meta.env.VITE_BANNER || '/banner.webp', //done
    typography: import.meta.env.VITE_TYPOGRAPHY || 'sans-serif', //done

    // Legal Information
    companyName: import.meta.env.VITE_COMPANY_NAME || 'Company Name Not Set', //done
    companyAddress: import.meta.env.VITE_COMPANY_ADDRESS || 'Address Not Set', //done

    // Checkout Configuration
    checkoutDomain: import.meta.env.VITE_CHECKOUT_DOMAIN || 'Checkout Domain Not Set', //done
    checkoutId: import.meta.env.VITE_CHECKOUT_ID || 'Checkout ID Not Set', //done
    squareLogo: import.meta.env.VITE_SQUARE_LOGO || '/square-logo.png',
    offerIdType: import.meta.env.VITE_OFFER_ID_TYPE || 'default',

    // Custom Offer IDs
    customOfferIds: {
      '9.99': import.meta.env.VITE_CUSTOM_OFFER_ID_9_99 || '9.99',
      '19.5': import.meta.env.VITE_CUSTOM_OFFER_ID_19_5 || '19.5',
      '29.9': import.meta.env.VITE_CUSTOM_OFFER_ID_29_9 || '29.9',
      '39.99': import.meta.env.VITE_CUSTOM_OFFER_ID_39_99 || '39.99',
      '49.9': import.meta.env.VITE_CUSTOM_OFFER_ID_49_9 || '49.9',
      '59.5': import.meta.env.VITE_CUSTOM_OFFER_ID_59_5 || '59.5',
      '69.99': import.meta.env.VITE_CUSTOM_OFFER_ID_69_99 || '69.99',
      '79.9': import.meta.env.VITE_CUSTOM_OFFER_ID_79_9 || '79.9',
      '89.5': import.meta.env.VITE_CUSTOM_OFFER_ID_89_5 || '89.5',
      '99.99': import.meta.env.VITE_CUSTOM_OFFER_ID_99_99 || '99.99',
      '109.9': import.meta.env.VITE_CUSTOM_OFFER_ID_109_9 || '109.9',
      '119.5': import.meta.env.VITE_CUSTOM_OFFER_ID_119_5 || '119.5',
    },
  };

  const tabs = [
    { id: 'basics', label: 'Store Basics', icon: '🏪' },
    { id: 'theme', label: 'Theme', icon: '🎨' },
    { id: 'brand', label: 'Branding', icon: '✨' },
    { id: 'legal', label: 'Legal', icon: '📋' },
    { id: 'checkout', label: 'Checkout', icon: '💳' },
  ];

  const ConfigItem = ({ label, value, type = 'text' }) => (
    <div className="config-item">
      <label className="config-label">{label}</label>
      <div className="config-value">
        {type === 'color' ? (
          <div className="color-display">
            <div
              className="color-box"
              style={{ backgroundColor: value }}
            ></div>
            <span>{value}</span>
          </div>
        ) : type === 'image' ? (
          <div className="image-display">
            <img src={value} alt={label} className="config-image" />
            <span>{value}</span>
          </div>
        ) : (
          <span className={`value-${type}`}>{value}</span>
        )}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basics':
        return (
          <div className="tab-content">
            <h3>Store Information</h3>
            <ConfigItem label="Store Name" value={storeConfig.storeName} />
            <ConfigItem label="Customer Support Email" value={storeConfig.customerSupportEmail} type="email" />
            <ConfigItem label="Customer Service Phone" value={storeConfig.customerServicePhone} type="phone" />
            <ConfigItem label="Domain Name" value={storeConfig.domainName} />
            <ConfigItem label="Shopify Email" value={storeConfig.shopifyEmail} type="email" />
             <ConfigItem label="Shopify Store URL" value={storeConfig.shopifyURL + '.myshopify.com'} type="name" />
          </div>
        );

      case 'theme':
        return (
          <div className="tab-content">
            <h3>Theme Configuration</h3>
            <ConfigItem label="Category" value={storeConfig.category} />
            <ConfigItem label="Language" value={storeConfig.language} />
          </div>
        );

      case 'brand':
        return (
          <div className="tab-content">
            <h3>Brand Customization</h3>
            <ConfigItem label="Primary Color" value={storeConfig.color1} type="color" />
            <ConfigItem label="Secondary Color" value={storeConfig.color2} type="color" />
            <ConfigItem label="Logo" value={storeConfig.logo} type="image" />
            <ConfigItem label="Banner" value={storeConfig.banner} type="image" />
            <ConfigItem label="Typography" value={storeConfig.typography} />
          </div>
        );

      case 'legal':
        return (
          <div className="tab-content">
            <h3>Legal Information</h3>
            <ConfigItem label="Company Name" value={storeConfig.companyName} />
            <ConfigItem label="Company Address" value={storeConfig.companyAddress} />
          </div>
        );

      case 'checkout':
        return (
          <div className="tab-content">
            <h3>Checkout Configuration</h3>
            <ConfigItem label="Checkout Domain" value={storeConfig.checkoutDomain} />
            <ConfigItem label="Checkout ID" value={storeConfig.checkoutId} />
            <ConfigItem label="Square Logo" value={storeConfig.squareLogo} type="image" />
            <ConfigItem label="Offer ID Type" value={storeConfig.offerIdType} />
            
            {storeConfig.offerIdType === 'custom' && (
              <div className="custom-offers">
                <h4>Custom Offer IDs</h4>
                <div className="offers-grid">
                  {Object.entries(storeConfig.customOfferIds).map(([price, offerId]) => (
                    <div key={price} className="offer-item">
                      <span className="offer-price">${price}</span>
                      <span className="offer-id">{offerId || 'Not Set'}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="store-config-viewer">
      <div className="config-header">
        <h1>Store Configuration</h1>
        <p>Current environment variables and store settings</p>
      </div>

      <div className="config-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="config-content">
        {renderTabContent()}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .store-config-viewer {
              max-width: 1200px;
              margin: 0 auto;
              padding: 2rem;
              font-family: ${storeConfig.typography}, system-ui, sans-serif;
            }

            .config-header {
              text-align: center;
              margin-bottom: 3rem;
            }

            .config-header h1 {
              font-size: 2.5rem;
              color: ${storeConfig.color1};
              margin-bottom: 0.5rem;
            }

            .config-header p {
              color: #666;
              font-size: 1.1rem;
            }

            .config-tabs {
              display: flex;
              gap: 0.5rem;
              margin-bottom: 2rem;
              border-bottom: 2px solid #e5e5e5;
              overflow-x: auto;
            }

            .tab-button {
              display: flex;
              align-items: center;
              gap: 0.5rem;
              padding: 1rem 1.5rem;
              background: none;
              border: none;
              cursor: pointer;
              border-radius: 8px 8px 0 0;
              transition: all 0.3s ease;
              white-space: nowrap;
            }

            .tab-button:hover {
              background-color: #f5f5f5;
            }

            .tab-button.active {
              background-color: ${storeConfig.color1};
              color: white;
              transform: translateY(-2px);
            }

            .tab-icon {
              font-size: 1.2rem;
            }

            .tab-label {
              font-weight: 500;
            }

            .config-content {
              background: white;
              border-radius: 12px;
              padding: 2rem;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
              border: 1px solid #e5e5e5;
            }

            .tab-content h3 {
              color: ${storeConfig.color1};
              margin-bottom: 1.5rem;
              font-size: 1.5rem;
              border-bottom: 2px solid ${storeConfig.color2};
              padding-bottom: 0.5rem;
            }

            .config-item {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 1rem 0;
              border-bottom: 1px solid #f0f0f0;
            }

            .config-item:last-child {
              border-bottom: none;
            }

            .config-label {
              font-weight: 600;
              color: #333;
              min-width: 200px;
            }

            .config-value {
              text-align: right;
              flex: 1;
            }

            .color-display {
              display: flex;
              align-items: center;
              gap: 0.5rem;
              justify-content: flex-end;
            }

            .color-box {
              width: 30px;
              height: 30px;
              border-radius: 6px;
              border: 2px solid #ddd;
            }

            .image-display {
              display: flex;
              align-items: center;
              gap: 0.5rem;
              justify-content: flex-end;
            }

            .config-image {
              width: 40px;
              height: 40px;
              object-fit: cover;
              border-radius: 6px;
              border: 1px solid #ddd;
            }

            .value-email {
              color: ${storeConfig.color1};
              text-decoration: underline;
            }

            .value-phone {
              font-family: monospace;
              background: #f5f5f5;
              padding: 0.25rem 0.5rem;
              border-radius: 4px;
            }

            .custom-offers {
              margin-top: 2rem;
            }

            .custom-offers h4 {
              color: ${storeConfig.color1};
              margin-bottom: 1rem;
            }

            .offers-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
              gap: 1rem;
            }

            .offer-item {
              display: flex;
              flex-direction: column;
              align-items: center;
              padding: 1rem;
              background: #f9f9f9;
              border-radius: 8px;
              border: 1px solid #e5e5e5;
            }

            .offer-price {
              font-weight: bold;
              color: ${storeConfig.color1};
              font-size: 1.1rem;
            }

            .offer-id {
              font-size: 0.9rem;
              color: #666;
              font-family: monospace;
            }

            @media (max-width: 768px) {
              .store-config-viewer {
                padding: 1rem;
              }

              .config-item {
                flex-direction: column;
                align-items: flex-start;
                gap: 0.5rem;
              }

              .config-value {
                text-align: left;
              }

              .color-display,
              .image-display {
                justify-content: flex-start;
              }
            }
          `,
        }}
      />
    </div>
  );
}