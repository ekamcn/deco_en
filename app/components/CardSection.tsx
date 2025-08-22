import Card from '~/components/Card';
import React from 'react';

import {RxGlobe, RxRocket} from 'react-icons/rx';
import {FiLock} from 'react-icons/fi';
import {VscSend} from 'react-icons/vsc';

const cardData = [
  {
    icon: <RxGlobe />,
    title: 'US-Based Customer Support',
    description: (
      <>
        Our dedicated team is located right here in the United States, ready to
        assist you promptly with any questions about our products or your order.
      </>
    ),
  },
  {
    icon: <FiLock strokeWidth={1.5} />,
    title: 'Secure Payments',
    description: (
      <>
        All online payments are processed with 100% secure encryption to keep
        your information safe..
      </>
    ),
  },
  {
    icon: <VscSend />,
    title: 'Free Shipping',
    description: <>Enjoy fast delivery within 2 to 4 business days.</>,
  },
  {
    icon: <RxRocket />,
    title: 'Satisfaction Guaranteed or Your Money Back',
    description: (
      <>
        We offer a 30-day satisfaction guarantee from the date you receive your
        items.
      </>
    ),
  },
];

export default function CardSection() {
  return (
    <section className="py-10">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-2 px-4">
        {cardData.map((card, idx) => (
          <Card
            key={idx}
            icon={card.icon}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </section>
  );
}

