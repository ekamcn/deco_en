import React from 'react';

export default function ShippingPolicyPage() {
    return (
        <div className="bg-white min-h-screen py-8 sm:py-12 px-4 sm:px-5 [&_ul]:-indent-[1.3em]">
            <div className="max-w-7xl mx-auto flex flex-col gap-6 sm:gap-8 lg:gap-10 tracking-wider">
                <p className='!text-2xl sm:!text-3xl font-bold'>Shipping policy</p>
                <p className="!text-2xl sm:!text-3xl lg:!text-3xl font-bold">Shipping Policy</p>

                <div>
                    <h2 className="!text-xl sm:!text-2xl font-semibold">Who We Are</h2>
                    <p className='leading-6 sm:leading-7 !text-sm sm:!text-base'>{import.meta.env.VITE_COMPANY_NAME} ("we," "us," or "our") operates the website {import.meta.env.VITE_DOMAIN_NAME}/ (the "Site"). Our goal is to ensure a seamless and transparent shipping process for your convenience and satisfaction. Below are the details of our shipping process.</p>
                </div>
                <div>
                    <h2 className="!text-xl sm:!text-2xl font-semibold">Shipping Costs</h2>
                    <ul className="!list-disc !list-inside text-gray-700 space-y-2 !text-sm sm:!text-base !pl-6 lg:!pl-8">
                        <li>Free Shipping: We offer free shipping on all orders.</li>
                    </ul>
                </div>
                <div>
                    <h2 className="!text-xl sm:!text-2xl font-semibold">Shipping Range</h2>
                    <ul className="!list-disc !list-inside text-gray-700 space-y-2 !text-sm sm:!text-base !pl-6 lg:!pl-8">
                        <li>Delivery Area: We currently ship within our service regions.</li>
                        <li>Future Expansion: We are considering expanding our delivery areas.</li>
                    </ul>
                </div>
                <div>
                    <h2 className="!text-xl sm:!text-2xl font-semibold">Order Processing Time</h2>
                    <ul className="!list-disc !list-inside text-gray-700 space-y-2 !text-sm sm:!text-base !pl-6 lg:!pl-8">
                        <li>Processing Time: Orders are processed within 1-2 business days, Monday to Saturday.</li>
                        <li>Cut-off Time: Orders placed before 22:00 (GMT-08:00) Pacific Standard Time (Los Angeles) will be processed the same day; those placed after will be processed the next business day.</li>
                        <li>No Shipping Days: Orders are not processed on Sunday or public holidays.</li>
                    </ul>
                </div>
                <div>
                    <h2 className="!text-xl sm:!text-2xl font-semibold">Delivery Time</h2>
                    <ul className="!list-disc !list-inside text-gray-700 space-y-2 !text-sm sm:!text-base !pl-6 lg:!pl-8">
                        <li>Estimated Delivery: Orders typically arrive within 2-4 business days after processing, depending on the destination.</li>
                        <li>Total Delivery Time: 2-6 business days.</li>
                    </ul>
                </div>
                <div>
                    <h2 className="!text-xl sm:!text-2xl font-semibold">Shipping Process</h2>
                    <ul className="!list-disc !list-inside text-gray-700 space-y-2 !text-sm sm:!text-base !pl-6 lg:!pl-8">
                        <li>Courier Services: We use reliable carriers such as DHL, and FedEx for all shipments.</li>
                        <li>Tracking Information: After your order is shipped, you will receive an email with tracking details.</li>
                    </ul>
                </div>
                <div>
                    <h2 className="!text-xl sm:!text-2xl font-semibold">Lost or Damaged Items</h2>
                    <ul className="!list-disc !list-inside text-gray-700 space-y-2 !text-sm sm:!text-base !pl-6 lg:!pl-8">
                        <li>Damaged Orders: If your order arrives damaged, please contact us within 48 hours to initiate a resolution.</li>
                        <li>Lost Orders: If your order is lost, please reach out to us immediately for assistance.</li>
                    </ul>
                </div>
                <div>
                    <h2 className="!text-xl sm:!text-2xl font-semibold">Returns</h2>
                    <p className='leading-6 sm:leading-7 !text-sm sm:!text-base'>Returns Policy: For detailed return instructions, please refer to our Returns Policy.</p>
                </div>
                <div>
                    <h2 className="!text-xl sm:!text-2xl font-semibold">Contact Us</h2>
                    <p className='leading-6 sm:leading-7 !text-sm sm:!text-base !pb-4'>If you have questions or concerns about this Shipping Policy, please contact us:</p>
                    <p className='flex flex-col gap-2 !text-sm sm:!text-base'>
                        <span>Email: <a href="mailto:{import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}" className="underline underline-offset-4">{import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}</a></span>
                        <span>Phone: <a href="tel:+14842148789" className="underline underline-offset-4">{import.meta.env.VITE_CUSTOMER_SERVICE_PHONE}</a></span>
                        <span>Address: {import.meta.env.VITE_COMPANY_ADDRESS}</span>
                        <span className='pt-4'>Last updated: 1-7-2025</span>
                    </p>
                </div>
            </div>
        </div>
    );
}