import React from 'react';

export default function ReturnPolicyPage() {
  return (
    <div className="bg-white min-h-screen py-8 sm:py-12 px-4 sm:px-5 [&_ul]:-indent-[1.3em]">
      <div className="max-w-7xl mx-auto flex flex-col gap-6 sm:gap-8 lg:gap-10 tracking-wider">
        <p className="!text-[clamp(28px,5vw,32px)] font-bold">Return Policy</p>
        <p className="!text-[clamp(28px,5vw,32px)] font-bold">
          {import.meta.env.VITE_COMPANY_NAME} Return and Refund Policy
        </p>
        <div>
          <p className="leading-6 sm:leading-7 !text-sm sm:!text-base !pb-4">
            Last Updated: 9-9-2025
          </p>
          <p className="leading-6 sm:leading-7 !text-sm sm:!text-base">
            Thank you for shopping with us at{' '}
            {import.meta.env.VITE_COMPANY_NAME}. Our Return and Refund Policy
            aims to ensure a smooth and transparent experience. Please review
            the guidelines below for eligibility, processes, and timelines for
            returns, refunds, and exchanges.
          </p>
        </div>
        <div>
          <h2 className="!text-[clamp(22px,4vw,26px)] font-semibold">
            Scope and Contact Information
          </h2>
          <p className="leading-6 sm:leading-7 !text-sm sm:!text-base !pb-4">
            For questions regarding returns and refunds, please contact us
            through any of the methods below:
          </p>
          <p className="flex flex-col gap-2 !text-sm sm:!text-base">
            <span>
              Email:{' '}
              <a
                href={`mailto:${import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}`}
                className="underline underline-offset-4"
              >
                {import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}
              </a>
            </span>
            <span>
              Phone:{' '}
              <a
                href={`tel:${import.meta.env.VITE_CUSTOMER_SERVICE_PHONE}`}
                className="underline underline-offset-4"
              >
                {import.meta.env.VITE_CUSTOMER_SERVICE_PHONE}
              </a>
            </span>
            <span>Address: {import.meta.env.VITE_COMPANY_ADDRESS}</span>
          </p>
        </div>
        <div>
          <h2 className="!text-[clamp(22px,4vw,26px)] font-semibold">
            Policy Overview
          </h2>
          <ul className="!list-disc !list-inside text-gray-700 space-y-2 !text-sm sm:!text-base !pl-6 lg:!pl-8">
            <li>
              Return Period: 30 days from
              delivery date
            </li>
            <li>
              Refund Processing Time:
              5 business days from
              receipt
            </li>
            <li>
              Return Shipping Costs:
              Free and Covered by us even the product is defective or incorrect.
            </li>
            <li>Return label: Included in the package, Free</li>
          </ul>
        </div>
        <div>
          <h2 className="!text-[clamp(22px,4vw,26px)] font-semibold">
            Order Cancellations
          </h2>
          <p className="leading-6 sm:leading-7 !text-sm sm:!text-base">
            You may cancel your order within two hours of purchase by contacting
            our customer service team. If your order has already been shipped,
            please follow the steps in our Return Instructions below.
          </p>
        </div>
        <div>
          <h2 className="!text-[clamp(22px,4vw,26px)] font-semibold">
            Return Conditions
          </h2>
          <p className="leading-6 sm:leading-7 !text-sm sm:!text-base !pb-4">
            We offer returns under the following conditions:
          </p>
          <ul className="!list-disc !list-inside text-gray-700 space-y-2 !text-sm sm:!text-base !pl-6 lg:!pl-8">
            <li>
              Return Window:Items can be returned within{' '}
              30 days of delivery.
            </li>
            <li>
              Item Condition: Items must be in their original, unused condition
              with all tags attached and in the original packaging.
            </li>
            <li>Receipt or Proof of Purchase: Required for all returns.</li>
            <li>
              Exceptions:Certain products, such as custom or personalized items
              and hygiene products (e.g., undergarments), are{' '}
              non-returnable unless unopened and unused.
            </li>
          </ul>
        </div>
        <div>
          <h2 className="!text-[clamp(22px,4vw,26px)] font-semibold">
            Return Instructions
          </h2>
          <p className="leading-6 sm:leading-7 !text-sm sm:!text-base !pb-4">
            To start a return, please follow these steps:
          </p>
          <ul className="!list-disc !list-inside text-gray-700 space-y-2 !text-sm sm:!text-base !pl-6 lg:!pl-8">
            <li>
              Contact Customer Service: Email{' '}
              <a
                href={`mailto:${import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}`}
                className="underline underline-offset-4"
              >
                {import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}
              </a>{' '}
              with your order
              number, reason for return, and any supporting photos if
              applicable.
            </li>
            <li>
              Receive Return Authorization: Our team will review your request
              and provide a return authorization and detailed instructions.
            </li>
            <li>
              Return Packaging: Safely package the item, ensuring all tags and
              original packaging are included, and attach the return
              authorization form.
            </li>
            <li>Shipping: Use a reliable shipping service with tracking. Return shipping free and Covered by us even the product is defective or incorrect.</li>
          </ul>
        </div>
        <div>
          <h2 className="!text-[clamp(22px,4vw,26px)] font-semibold">Refund Policy</h2>
          <p className="leading-6 sm:leading-7 !text-sm sm:!text-base !pb-4">
            Refund Approval: Once we receive and inspect your returned item, we
            will notify you regarding the approval status within{' '}
            5 business days.
          </p>
          <ul className="!list-disc !list-inside text-gray-700 space-y-2 !text-sm sm:!text-base !pl-6 lg:!pl-8">
            <li>
              Processing Time: Approved refunds will be processed to your
              original payment method within{' '}
              5 business days. Your
              bank or credit card provider may require additional time to post
              the refund.
            </li>
            <li>
              Confirmation: You will receive a confirmation email once the
              refund is processed.
            </li>
          </ul>
          <p className="leading-6 sm:leading-7 !text-sm sm:!text-base !pt-4">
            If you do not see the refund within the expected time, please check
            with your bank. For further assistance, contact us at{' '}
            <a
              href={`mailto:${import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}`}
              className="underline underline-offset-4"
            >
              {import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}
            </a>
            .
          </p>
        </div>
        <div>
          <h2 className="!text-[clamp(22px,4vw,26px)] font-semibold">
            Exchange Policy
          </h2>
          <p className="leading-6 sm:leading-7 !text-sm sm:!text-base">
            We offer exchanges for incorrect or defective items. Contact us
            within 30 days of delivery, and we&apos;ll cover the return shipping
            costs for eligible exchanges. If an incorrect size was ordered,
            please follow the return process and then place a new order for the
            correct size.
          </p>
        </div>
        <div>
          <h2 className="!text-[clamp(22px,4vw,26px)] font-semibold">
            Exceptions and Special Cases
          </h2>
          <ul className="!list-disc !list-inside text-gray-700 space-y-2 !text-sm sm:!text-base !pl-6 lg:!pl-8">
            <li>
              Defective or Damaged Items: If your item arrives damaged or
              defective, contact us within 48 hours. We&apos;ll arrange a return
              at no cost to you and offer a replacement or full refund as per
              your preference.
            </li>
            <li>
              Incorrect Product: If you receive an incorrect item, please
              contact us, and we&apos;ll cover the return shipping and send you
              the correct item promptly.
            </li>
            <li>
              Lost Packages: If your package does not arrive within the
              estimated timeframe, contact us so we can initiate an
              investigation with the shipping carrier.
            </li>
          </ul>
        </div>
        <div>
          <h2 className="!text-[clamp(22px,4vw,26px)] font-semibold">
            Processing Times
          </h2>
          <ul className="!list-disc !list-inside text-gray-700 space-y-2 !text-sm sm:!text-base !pl-6 lg:!pl-8">
            <li>Return Window: Returns must be initiated and shipped within 30 days of receiving the item.</li>
            <li>
              Inspection Period: Once received, returns are inspected within{' '}
              5 business days.
            </li>
            <li>
              Refund Issuance: Refunds are processed to the original payment
              method within 5.
              business days after inspection.
            </li>
          </ul>
        </div>
        <div>
          <h2 className="!text-[clamp(22px,4vw,26px)] font-semibold">
            Return Shipping Address
          </h2>
          <p className="leading-6 sm:leading-7 !text-sm sm:!text-base !pb-4">
            Please send approved returns to:
          </p>
          <p className="flex flex-col gap-2 !text-sm sm:!text-base">
            <span>{import.meta.env.VITE_COMPANY_NAME}</span>
            <span>{import.meta.env.VITE_COMPANY_ADDRESS}</span>
          </p>
        </div>
        <div>
          <h2 className="!text-[clamp(22px,4vw,26px)] font-semibold">
            Contact Information
          </h2>
          <p className="leading-6 sm:leading-7 !text-sm sm:!text-base !pb-4">
            If you have further questions or require assistance with returns or
            refunds, please reach out:
          </p>
          <p className="flex flex-col gap-2 !text-sm sm:!text-base">
            <span>
              Email:{' '}
              <a
                href={`mailto:${import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}`}
                className="underline underline-offset-4"
              >
                {import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}
              </a>
            </span>
            <span>
              Phone:{' '}
              <a
                href={`tel:${import.meta.env.VITE_CUSTOMER_SERVICE_PHONE}`}
                className="underline underline-offset-4"
              >
                {import.meta.env.VITE_CUSTOMER_SERVICE_PHONE}
              </a>
            </span>
            <span>Address: {import.meta.env.VITE_COMPANY_ADDRESS}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
