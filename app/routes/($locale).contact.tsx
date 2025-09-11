import React from 'react';
import Form from '~/components/Form';

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen py-8 sm:py-12 px-4 sm:px-5">
      <div className="max-w-7xl mx-auto flex flex-col gap-6 sm:gap-8 lg:gap-10 tracking-wider">
        <p className="!text-2xl lg:!text-3xl font-bold text-center">Contact</p>
        <p className="!text-xl sm:!text-xl lg:!text-2xl font-bold mb-4">
          CONTACT INFORMATION
        </p>
        <div>
          <p className="leading-6 sm:leading-7 !text-sm sm:!text-base">
            We strive for optimal customer satisfaction. Please do not hesitate
            to contact our specialized customer service team via the contact
            details above or by filling out the contact form below. Your
            feedback is highly valuable to us. We aim to respond within 48
            hours.
          </p>
        </div>
        <div>
          <h2 className="!text-lg sm:!text-2xl font-semibold">
            {import.meta.env.VITE_COMPANY_NAME}
          </h2>
          <div className="flex flex-col gap-2 !text-sm sm:!text-base">
            <span>Address: {import.meta.env.VITE_COMPANY_ADDRESS}</span>
            <span>
              Email:
              <a
                href={`mailto:${import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}`}
                className="underline underline-offset-2"
              >
                {import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}
              </a>
            </span>
            <span>
              Phone:
              <a
                href={`tel:${import.meta.env.VITE_CUSTOMER_SERVICE_PHONE}`}
                className="underline underline-offset-2"
              >
                {import.meta.env.VITE_CUSTOMER_SERVICE_PHONE}
              </a>
            </span>
            <span>
              Website:
              <a
                href={
                  import.meta.env.VITE_DOMAIN_NAME.startsWith('http')
                    ? import.meta.env.VITE_DOMAIN_NAME
                    : `https://${import.meta.env.VITE_DOMAIN_NAME}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                {import.meta.env.VITE_DOMAIN_NAME}
              </a>
            </span>
            <span>Opening Hours: Monday to Friday - 9:00 AM to 5:00 PM</span>
          </div>
        </div>
        <div>
          <h2 className="!text-lg sm:!text-2xl font-semibold">QUICK LINKS</h2>
          <div className="flex flex-col gap-2 !text-sm sm:!text-base">
            <a href="/faq" className="underline underline-offset-2">
              Frequently Asked Questions
            </a>
            <a href="/privacy" className="underline underline-offset-2">
              Privacy Policy
            </a>
            <a
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              Terms of Service
            </a>
          </div>
        </div>
        {/* Centered Form */}
        <div className="flex justify-center">
          <Form />
        </div>
      </div>
    </div>
  );
}
