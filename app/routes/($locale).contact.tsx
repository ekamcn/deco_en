import React from 'react';
import Form from '~/components/Form';

export default function ContactPage() {
    return (
        <div>
    <div className="bg-white min-h-screen py-12 !pl-5">
    <div className="max-w-7xl mx-auto flex flex-col gap-10 tracking-wider">
                    <p className='!text-3xl font-bold text-center'>Contact</p>
                    <div>
                        <h1 className="text-4xl font-bold">CONTACT INFORMATION</h1>
                        <p>We strive for optimal customer satisfaction. Please do not hesitate to contact our specialized customer service team via the contact details above or by filling out the contact form below. Your feedback is highly valuable to us. We aim to respond within 48 hours.</p>
                    </div>
                    <div >
                        <h2 className="!text-2xl font-semibold">{import.meta.env.VITE_COMPANY_NAME}</h2>
                        <p className='flex flex-col gap-2'>
                            <span> Address: {import.meta.env.VITE_COMPANY_ADDRESS}</span>
                            <span> Email: <a href="mailto:{import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}" className="underline underline-offset-2">{import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}</a>   </span>
                            <span>
                                Phone: <a href="tel:+14842148789" className="underline underline-offset-2">{import.meta.env.VITE_CUSTOMER_SERVICE_PHONE}</a>
                            </span>
                            <span>
                                Website: <a href="{import.meta.env.VITE_DOMAIN_NAME}" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{import.meta.env.VITE_STORE_NAME}.com</a>
                            </span>
                            <span>
                                Opening Hours: Monday to Friday - 9:00 AM to 5:00 PM
                            </span>
                        </p>
                    </div>
                    <div >
                        <h2 className="!text-2xl font-semibold">QUICK LINKS</h2>
                        <p className='flex flex-col gap-2'>
                            <a href="mailto:{import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}" className="underline underline-offset-2">Frequently Asked Questions</a>
                            <a href="tel:+14842148789" className=" underline underline-offset-2">Privacy Policy</a>
                            <a href="{import.meta.env.VITE_DOMAIN_NAME}" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Terms of service</a>
                        </p>
                    </div>
                </div>
            <Form />
            </div>
        </div>
    );
} 