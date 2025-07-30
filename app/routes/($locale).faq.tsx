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
          <div className='flex flex-col gap-4'>
            <p>Your order confirmation email may have been filtered into your spam or junk folder. Please check those folders first.</p>
            <p>If you still cannot find the confirmation email containing your order number, please contact us at <a href="mailto:{import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}" className=" hover:text-blue-300 transition-colors !text-[var(--color-1)] underline underline-offset-4">{import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}</a> with the subject line: "My Order Number."</p>
            <p>We respond within 24 business hours.</p>
          </div>
        ),
      },
      {
        question: 'How can I cancel my order?',
        answer: (
          <div className='flex flex-col gap-4'>
            <p>You can cancel your order within 24 hours of purchase on our store.</p>
            <p>If you are within this timeframe, please contact our customer service at <a href="mailto:{import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}" className=" hover:text-blue-300 transition-colors !text-[var(--color-1)] underline underline-offset-4">{import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}</a> with the subject line: "Order Cancellation" and include your order number.</p>
            <p>Our team will cancel your order and process a full refund.</p>
            <p>If your package has already been shipped, we cannot cancel the order. Once you receive your order, you may return the item to our warehouse for a refund if necessary.</p>
            <p>We respond within 24 business hours.</p>
          </div>
        ),
      },
      {
        question: 'What are the delivery times?',
        answer: (
          <div className='flex flex-col gap-4'>
            <p>When you place an order on our store, it is processed by our fulfillment center within 1 business day. Delivery usually takes between 2 to 4 days.</p>
            <p>In rare cases (postal strikes, holiday seasons, etc.), delivery may take a little longer.</p>
          </div>
        ),
      },
      {
        question: 'Where is my order?',
        answer: (
          <div className='flex flex-col gap-4'>
            <p>To find out the status of your package or track your order, please visit the "Order Tracking" page and enter the following information:</p>
            <ul className="list-disc ml-6">
              <li>Your order number</li>
              <li>The email address used when placing the order</li>
            </ul>
            <p>If you need additional information about your order status, feel free to contact our customer service at: <a href="mailto:{import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}" className=" hover:text-blue-300 transition-colors !text-[var(--color-1)] underline underline-offset-4">{import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}</a></p>
            <p>Please include the subject line: "Order Status" and your order number. We respond within 24 business hours.</p>
          </div>
        ),
      },
      {
        question: 'How to return an item and get a refund?',
        answer: (
          <div className='flex flex-col gap-4'>
            <p>We're sorry if you encountered any issues with your order. If you received a damaged or incorrect item, or if you are not satisfied with your purchase, please contact our customer service at: <a href="mailto:{import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}" className=" hover:text-blue-300 transition-colors !text-[var(--color-1)] underline underline-offset-4">{import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}</a></p>
            <p>Please include the subject line: "Return/Refund Request" and your order number. We will respond within 24 business hours.</p>
          </div>
        ),
      },
      {
        question: 'Can I modify my order?',
        answer: (
          <div className='flex flex-col gap-4'>
            <p>You can modify your order (color, size, model) within 24 hours of purchase on our store. If you are within this timeframe, please contact our customer service at: <a href="mailto:{import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}" className=" hover:text-blue-300 transition-colors !text-[var(--color-1)] underline underline-offset-4">{import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}</a> Include the subject line: "Order Modification" and your order number.</p>
            <p>If your package has already been shipped, we cannot make any changes until you receive your order. After that, we can arrange a new shipment once the original item is returned to our warehouse.</p>
          </div>
        ),
      },
      {
        question: 'Do you ship internationally?',
        answer: (
          <div className='flex flex-col gap-4'>
            <p>Our store ships many products every day to customers all around the world.</p>
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
        answer: <p>Please allow up to 24 hours for your tracking number to update. If it still doesn't work, contact us at <a href="mailto:{import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}" className=" hover:text-blue-300 transition-colors !text-[var(--color-1)] underline underline-offset-4">{import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}</a>.</p>,
      },
      {
        question: 'Is my information secure?',
        answer: <p>Yes, we use industry-standard security measures to protect your information.</p>,
      },
    ],
  },
  {
    title: 'About Us',
    faqs: [
      {
        question: 'Do you have a contact form?',
        answer: <p>Yes, you can contact us via our contact form on the website or by emailing <a href="mailto:{import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}" className=" hover:text-blue-300 transition-colors !text-[var(--color-1)] underline underline-offset-4">{import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}</a>.</p>,
      },
      {
        question: 'Can I contact you or reply via SMS?',
        answer: <p>Currently, we only support email communication for customer service.</p>,
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div>
      <h1 className='text-center !text-3xl font-bold !py-4'>FAQ</h1>
      <FaqSection sections={sections}/>
<div>

      <Form/>
</div>
    </div>
  );
} 