import React from 'react';
import FaqSection from '~/components/FaqSection';
import Form from '~/components/Form';

const sections = [
  {
    title: 'Shipping & Returns',
    faqs: [
      {
        question: 'What is my order number?',
        answer: (
          <div className="flex flex-col gap-4">
            <p>
              Your order confirmation email may have been filtered into your
              spam or junk folder. Please check those folders first.
            </p>
            <p>
              If you still cannot find the confirmation email containing your
              order number, please contact us at{' '}
              <a
                href={`mailto:${import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}`}
                className="hover:text-blue-300 transition-colors !text-[var(--color-footer)] underline underline-offset-4"
              >
                {import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}
              </a>{' '}
              with the subject line: &quot;My Order Number.&quot;
            </p>
            <p>We respond within 24 business hours.</p>
          </div>
        ),
      },
      {
        
        question: 'How can I cancel my order?',
        answer: (
          <div className="flex flex-col gap-4">
            <p>
              You can cancel your order within 24 hours of purchase on our
              store.
            </p>
            <p>
              If you are within this timeframe, please contact our customer
              service at{' '}
              <a
                href={`mailto:${import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}`}
                className="hover:text-blue-300 transition-colors !text-white underline underline-offset-4"
              >
                {import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}
              </a>{' '}
              with the subject line: &quot;Order Cancellation&quot; and include
              your order number.
            </p>
            <p>Our team will cancel your order and process a full refund.</p>
            <p>
              If your package has already been shipped, we cannot cancel the
              order. Once you receive your order, you may return the item to our
              warehouse for a refund if necessary.
            </p>
            <p>We respond within 24 business hours.</p>
          </div>
        ),
      },
      {
        question: 'What are the delivery times?',
        answer: (
          <div className="flex flex-col gap-4">
            <p>
              When you place an order on our store, it is processed by our
              fulfillment center within 1 business day. Delivery usually takes
              between 2 to 4 days.
            </p>
            <p>
              In rare cases (postal strikes, holiday seasons, etc.), delivery
              may take a little longer.
            </p>
          </div>
        ),
      },
      {
        question: 'Where is my order?',
        answer: (
          <div className="flex flex-col gap-4">
            <p>
              To find out the status of your package or track your order, please
              visit the &quot;Order Tracking&quot; page and enter the following
              information:
            </p>
            <ul className="list-disc ml-6">
              <li>Your order number</li>
              <li>The email address used when placing the order</li>
            </ul>
            <p>
              If you need additional information about your order status, feel
              free to contact our customer service at:{' '}
              <a
                href={`mailto:${import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}`}
                className="hover:text-blue-300 transition-colors !text-white underline underline-offset-4"
              >
                {import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}
              </a>
              .
            </p>
            <p>
              Please include the subject line: &quot;Order Status&quot; and your
              order number. We respond within 24 business hours.
            </p>
          </div>
        ),
      },
      {
        question: 'How to return an item and get a refund?',
        answer: (
          <div className="flex flex-col gap-4">
            <p>
              We&apos;re sorry if you encountered any issues with your order. If
              you received a damaged or incorrect item, or if you are not
              satisfied with your purchase, please contact our customer service
              at:{' '}
              <a
                href={`mailto:${import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}`}
                className="hover:text-blue-300 transition-colors !text-white underline underline-offset-4"
              >
                {import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}
              </a>
              .
            </p>
            <p>
              Please include the subject line: &quot;Return/Refund Request&quot;
              and your order number. We will respond within 24 business hours.
            </p>
          </div>
        ),
      },
      {
        question: 'Can I modify my order?',
        answer: (
          <div className="flex flex-col gap-4">
            <p>
              You can modify your order (color, size, model) within 24 hours of
              purchase on our store. If you are within this timeframe, please
              contact our customer service at:{' '}
              <a
                href={`mailto:${import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}`}
                className="hover:text-blue-300 transition-colors !text-white underline underline-offset-4"
              >
                {import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}
              </a>
              . Include the subject line: &quot;Order Modification&quot; and
              your order number.
            </p>
            <p>
              If your package has already been shipped, we cannot make any
              changes until you receive your order. After that, we can arrange a
              new shipment once the original item is returned to our warehouse.
            </p>
          </div>
        ),
      },
      {
        question: 'Do you ship internationally?',
        answer: (
          <div className="flex flex-col gap-4">
            <p>
              Our store ships many products every day to customers all around
              the world.
            </p>
          </div>
        ),
      },
    ],
  },
  {
    title: 'Order Tracking',
    faqs: [
      {
        question: "My tracking number isn't working",
        answer: (
          <div className="flex flex-col gap-4">
            <p>
              Your tracking number may not work immediately after you receive
              the shipping confirmation email. It usually becomes active within
              7 business days.
            </p>
            <p>
              Don&apos;t worry—your order has been shipped and will be delivered
              to your address.
            </p>
          </div>
        ),
      },
      {
        question: 'Is my information secure?',
        answer: (
          <div className="flex flex-col gap-4">
            <p>
              Our website is fully secure and hosted on HTTPS servers, ensuring
              the protection of your personal data.
            </p>
            <p>
              We also work with trusted global leaders like VISA, Mastercard,
              and American Express—companies that would never support a store
              with high customer dissatisfaction rates.
            </p>
          </div>
        ),
      },
    ],
  },
  {
    title: 'About Us',
    faqs: [
      {
        question: 'Do you have a contact form?',
        answer: (
          <p>
            Yes, absolutely! You can reach us anytime by using the contact form
            located at the bottom of this page.
          </p>
        ),
      },
      {
        question: 'Can I contact you or reply via SMS?',
        answer: (
          <div className="flex flex-col gap-4">
            <p>
              Unfortunately, no. If you have received an SMS from us, please
              note that it is automated, and we will not receive your reply.
            </p>
            <p>Please contact us by email instead.</p>
          </div>
        ),
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div>
      <h1 className="text-center !text-3xl font-bold !py-4">FAQ</h1>
      <FaqSection sections={sections} />
      <div>
        <Form />
      </div>
    </div>
  );
}