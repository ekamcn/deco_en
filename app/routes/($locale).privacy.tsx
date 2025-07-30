import React from 'react';

export default function PrivacyPolicyPage() {
    return (
        <div className="bg-white min-h-screen py-12 !pl-5">
            <div className="max-w-7xl mx-auto flex flex-col gap-10 tracking-wider">
                <p className='!text-3xl font-bold'>Privacy Policy</p>
                <div>
                    <h1 className="text-4xl font-bold">Privacy Policy</h1>
                    <p className='!leading-7'>Updated on 1-7-2025</p>
                </div>
                <div>
                    <h2 className="!text-2xl font-semibold">Who We Are</h2>
                    <p className='!leading-7'> ("we," "us," or "our") operates the website {import.meta.env.VITE_DOMAIN_NAME}/ (the "Site"). We are a company that provides various services and products. This Privacy Policy describes how we collect, use, disclose, and safeguard your personal information.</p>
                </div>
                <div>
                    <h2 className="!text-2xl font-semibold">Information We Collect</h2>
                    <h3 className="!text-xl font-semibold">Personal Identification Information</h3>
                    <p className='!leading-7 !pb-4'>We collect personal identification information from Users when they interact with our Site, such as when creating an account, placing an order, subscribing to our newsletter, or contacting customer service. This information may include:</p>
                    <ul className="!list-disc !list-inside text-gray-700 space-y-1">
                        <li>Contact Information: Full name, email address, mailing address, and phone number.</li>
                        <li>Payment Information: Credit card or other payment details needed to process orders. Payment information is processed securely by third-party processors and is not stored on our servers.</li>
                        <li>Authentication Data: For buyers and sellers, we may collect information to confirm product authenticity, including photos and product descriptions.</li>
                    </ul>
                </div>
                <div>
                    <h3 className="!text-xl font-semibold">Non-Personal Identification Information</h3>
                    <p className='!leading-7 !pb-4'>We may automatically collect non-personal identification information about Users whenever they interact with our Site. This may include:</p>
                    <ul className="!list-disc !list-inside text-gray-700 space-y-1">
                        <li>Browser Details and Device Information: Type of browser, device type, operating system, and Internet service provider (ISP).</li>
                        <li>Log Data: IP address, browser type, visited pages, visit time and duration, and other usage statistics.</li>
                    </ul>
                </div>
                <div>
                    <h3 className="!text-xl font-semibold">Cookies and Tracking Technologies</h3>
                    <p className='!leading-7'>Our Site may use "cookies" to improve User experience. Cookies are small files stored on your device by your web browser to help remember settings and preferences, and track site usage. Users can configure their browser settings to refuse cookies or alert them when cookies are sent.</p>
                </div>
                <div>
                    <h2 className="!text-2xl font-semibold">How We Use Collected Information</h2>
                    <p className='!leading-7 !pb-4'>We may use your personal information for the following purposes:</p>
                    <ul className="!list-disc !list-inside text-gray-700 space-y-1">
                        <li>To Provide and Maintain Our Services: To process orders, manage accounts, and provide customer support.</li>
                        <li>To Personalize User Experience: Aggregated data may help us understand how Users use our Site and improve its functionality.</li>
                        <li>To Improve Our Website: We may use feedback to enhance our products, services, and overall user experience.</li>
                        <li>To Process Payments: Only use submitted information to complete transactions.</li>
                        <li>To Send Periodic Communications: We may send order confirmations, updates, or respond to inquiries. With your consent, we may also send promotional information, and you can unsubscribe anytime.</li>
                    </ul>
                </div>
                <div>
                    <h2 className="!text-2xl font-semibold">How We Protect Your Data</h2>
                    <p className='!leading-7'>We implement reasonable security measures to protect your personal information against unauthorized access, alteration, or disclosure. Sensitive and private data exchanged between the Site and Users is encrypted and protected via SSL (Secure Socket Layer) and other digital security measures. We also comply with industry standards for payment card security.</p>
                </div>
                <div>
                    <h2 className="!text-2xl font-semibold">Data Sharing and Disclosure</h2>
                    <p className='!leading-7 !pb-4'>We do not sell, trade, or rent Users' personal identification information. However, we may share information:</p>
                    <ul className="!list-disc !list-inside text-gray-700 space-y-1">
                        <li>With Service Providers: We may share information with third-party providers who assist us in our business operations (e.g., payment processing, shipping, or customer support).</li>
                        <li>For Legal Compliance: We may disclose information if required by law or to protect against legal liability.</li>
                        <li>During Business Transfers: In case of a merger, acquisition, or sale, personal data may be transferred.</li>
                    </ul>
                </div>
                <div>
                    <h2 className="!text-2xl font-semibold">Data Retention</h2>
                    <p className='!leading-7 !pb-4'>We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy, such as keeping your account active or as required by law.</p>
                    <ul className="!list-disc !list-inside text-gray-700 space-y-1">
                        <li>Account Information: Retained as long as the account remains active.</li>
                        <li>Legal Compliance: Retained as needed to meet legal obligations or resolve disputes.</li>
                    </ul>
                </div>
                <div>
                    <h2 className="!text-2xl font-semibold">Your Rights and Choices</h2>
                    <p className='!leading-7 !pb-4'>You have the following rights regarding your personal information:</p>
                    <ul className="!list-disc !list-inside text-gray-700 space-y-1">
                        <li>Access and Update: You have the right to access and update your personal information by logging into your account or contacting us.</li>
                        <li>Data Portability: Request a copy of your personal data in a structured format.</li>
                        <li>Deletion: Request deletion of your personal data, except data we are required to keep for legal, administrative, or security purposes.</li>
                        <li>Opt-Out of Marketing: You may opt out of marketing communications at any time by following unsubscribe links or contacting us directly.</li>
                    </ul>
                </div>
                <div>
                    <h2 className="!text-2xl font-semibold">International Users</h2>
                    <p className='!leading-7'>Please note that we may transfer, store, and process your personal data outside the country where you live. Your personal data is also processed by staff and external service providers (third parties) and partners in these countries. If we transfer your personal data out of Europe, we will rely on recognized transfer mechanisms, such as the European Commission's Standard Contractual Clauses, or equivalent agreements from the relevant competent authority in the UK (if applicable) unless the data transfer is to a country deemed to ensure an adequate level of protection.</p>
                </div>
                <div>
                    <h2 className="!text-2xl font-semibold">Changes to This Privacy Policy</h2>
                    <p className='!leading-7'>We may update this policy periodically. The updated date at the bottom of this document indicates the latest revision. We encourage Users to review this Privacy Policy occasionally to stay informed on how we protect and use their information. Continued use of the Site after updates will constitute acceptance of the updated policy.</p>
                </div>
                <div>
                    <h2 className="!text-2xl font-semibold">Contact Us</h2>
                    <p className='!leading-7 !pb-4'>If you have questions or concerns about this Privacy Policy, please contact us:</p>
                    <p className='flex flex-col gap-2'>
                        <span>Email: <a href="mailto:{import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}" className="underline underline-offset-4">{import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}</a></span>
                        <span>Phone: <a href="tel:+14842148789" className="underline underline-offset-4">{import.meta.env.VITE_CUSTOMER_SERVICE_PHONE}</a></span>
                        <span>Address: {import.meta.env.VITE_COMPANY_ADDRESS}</span>
                        <span>Website: <a href="{import.meta.env.VITE_DOMAIN_NAME}" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{import.meta.env.VITE_STORE_NAME}.com</a></span>
                    </p>
                </div>
            </div>
        </div>
    );
}