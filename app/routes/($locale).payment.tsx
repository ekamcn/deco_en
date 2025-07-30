import React from 'react';

export default function PaymentTermsPage() {
    return (
        <div className="bg-white min-h-screen py-12 !pl-5">
            <div className="max-w-7xl mx-auto flex flex-col gap-10 tracking-wider">
                <p className='!text-3xl font-bold'>Payment Terms</p>
                <div>
                    <h2 className="!text-2xl font-semibold">Payment Processing</h2>
                    <p className='!leading-7'>When you place an order on our website, your card is charged immediately and not at the time of shipment. Your billing statement will appear as: {import.meta.env.VITE_COMPANY_NAME}</p>
                </div>
                <div>
                    <h2 className="!text-2xl font-semibold">Accepted Payment Methods</h2>
                    <p className='!leading-7'>We accept payments by credit card (Visa, MasterCard, American Express). For credit card payments, your credit card information will be processed securely by our payment service provider.</p>
                </div>
                <div>
                    <h2 className="!text-2xl font-semibold">Payment Security</h2>
                    <p className='!leading-7'>All transactions made on our site are secured through SSL (Secure Socket Layer) encryption protocol which ensures the confidentiality of transmitted information. We are committed to protecting our customers' personal data in accordance with the General Data Protection Regulation (GDPR).</p>
                </div>
                <div>
                    <h2 className="!text-2xl font-semibold">Billing Information</h2>
                    <p className='!leading-7'>Once your order is placed, a detailed invoice will be sent to you by email. Please verify the billing and shipping information to ensure proper receipt of your order.</p>
                </div>
                <div>
                    <h2 className="!text-2xl font-semibold">Accuracy of Billing Information</h2>
                    <p className='!leading-7'>You are responsible for providing accurate and up-to-date billing and shipping information. If these details change, you must inform us as soon as possible to avoid any delay or delivery issues.</p>
                </div>
                <div>
                    <h2 className="!text-2xl font-semibold">Refunds</h2>
                    <p className='!leading-7'>If you wish to obtain a refund, please contact us at the following address: {import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}. You have 30 days from receipt of your order to exercise your right of withdrawal.</p>
                    <p className='!leading-7'>The refund will be processed to the payment method used for the order and may take between 3 and 5 business days to appear in your bank account.</p>
                </div>
                <div>
                    <h2 className="!text-2xl font-semibold">Claims and Disputes</h2>
                    <p className='!leading-7'>In case of complaints or disputes regarding a transaction, please contact us at the email address mentioned above. We will strive to resolve any complaint as quickly as possible.</p>
                </div>
                <div>
                    <h2 className="!text-2xl font-semibold">Modifications to Payment Terms</h2>
                    <p className='!leading-7'>We reserve the right to modify these payment terms at any time. Any modification will be published on this page and you will be informed by email. By continuing to use our site after the publication of modifications, you accept them.</p>
                </div>
                <div>
                    <h2 className="!text-2xl font-semibold">Contact Information</h2>
                    <p className='!leading-7 !pb-4'>To contact us, simply send an email to {import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL} or call +14842148789 Monday to Friday: 8:00-18:00.</p>
                    <p className='flex flex-col gap-2'>
                        <span>Address: {import.meta.env.VITE_COMPANY_ADDRESS}</span>
                        <span>Email: <a href="mailto:{import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}" className="underline underline-offset-4">{import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}</a></span>
                        <span>Phone: <a href="tel:+14842148789" className="underline underline-offset-4">{import.meta.env.VITE_CUSTOMER_SERVICE_PHONE}</a></span>
                        <span>Website: <a href="{import.meta.env.VITE_DOMAIN_NAME}" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{import.meta.env.VITE_STORE_NAME}.com</a></span>
                        <span className='pt-4'>Last updated: 1-7-2025</span>
                    </p>
                </div>
            </div>
        </div>
    );
}