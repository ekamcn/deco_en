import React from 'react';

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen py-12 !pl-5">
        <div className="max-w-7xl mx-auto flex flex-col gap-10 tracking-wider">
        <p className='!text-3xl font-bold'>About Us</p>
        <div>
          <h1 className="text-4xl font-bold text-[#2c3e50]">Welcome to Deco Bay</h1>
          <p className="text-lg text-gray-700"><strong>Deco Bay</strong> is a home décor brand committed to transforming your space with style, quality, and affordability. Founded by a team passionate about interior design, our mission is simple: to make your home more beautiful, functional, and accessible to everyone.</p>
        </div>
        <div>
          <h2 className="!text-2xl font-semibold text-[#2c3e50]">Our Story</h2>
          <div className='flex flex-col gap-5'>

          <p className="text-gray-700">Deco Bay was born from a simple idea: everyone deserves a home that reflects their personality—without overspending. We know how much the right décor can change a space, and how expensive it often is. That’s why we offer high-quality products at fair prices, with frequent promotions so you can always find a great deal.</p>
          <p className="text-gray-700">From day one, we've focused on delivering an exceptional customer experience—through a smooth online shopping journey, fast delivery, and responsive support.</p>
          </div>
        </div>
        <div>
          <h2 className="!text-2xl font-semibold text-[#2c3e50]">Our Philosophy</h2>
          <div className='flex flex-col gap-5'>
          <p className="text-gray-700">At Deco Bay, we believe home décor should be a pleasure, not a luxury. Our collections are carefully curated to suit all tastes and budgets.</p>
          <p className="text-gray-700">We emphasize durable materials and timeless design that works across all interior styles—from modern minimalism to cozy classics. Each piece is selected for its ability to elevate your home while offering lasting value.</p>
          </div>
        </div>
        <div>
          <h2 className="!text-2xl font-semibold text-[#2c3e50]">What We Offer</h2>
          <div className='flex flex-col gap-5'>
          <p className="text-gray-700">Our catalog features a wide range of home essentials: elegant furniture, trendy decorative accessories, and cozy textiles to style your rooms effortlessly. We also provide smart solutions for small spaces—so every corner counts.</p>
          <p className="text-gray-700">But Deco Bay is more than just products. We aim to support your home projects—big or small—with advice, ideas, and inspiration every step of the way.</p>
          </div>
        </div>
        <div>
          <h2 className="!text-2xl font-semibold text-[#2c3e50]">Smart Shopping, Always</h2>
          <p className="text-gray-700">We believe in value beyond the price tag. That’s why we offer competitive pricing and regular deals without compromising on quality. Our team is constantly sourcing new suppliers and innovative designs to bring you more choices—always at the right price.</p>
        </div>
        <div>
          <h2 className="!text-2xl font-semibold text-[#2c3e50]">Our Commitments</h2>
          <ul className="!list-disc !list-inside text-gray-700 space-y-1">
            <li><strong>Quality first:</strong> We choose materials and products that meet high-quality standards while staying affordable.</li>
            <li><strong>Fast &amp; secure delivery:</strong> Your orders are shipped quickly and arrive safely.</li>
            <li><strong>Helpful customer support:</strong> Our team is ready to assist you—whether you need product advice or order help.</li>
            <li><strong>Eco-aware practices:</strong> We favor sustainable materials and responsible sourcing whenever possible.</li>
          </ul>
        </div>

        <div>
          <h2 className="!text-2xl font-semibold text-[#2c3e50]">Why Choose Deco Bay?</h2>
          <div className='flex flex-col gap-5'>

          <p className="text-gray-700">At Deco Bay, we’re not just another home décor store—we're your partner in making your house feel like home. We’re committed to offering a unique shopping experience, personalized support, and top-quality products that respect your budget.</p>
          <p className="text-gray-700">Each product is handpicked to bring warmth, style, and functionality to your space. Because we believe that every room deserves thoughtful design—without compromise.</p>
          </div>
        </div>
        <div>
          <h2 className="!text-2xl font-semibold text-[#2c3e50]">Join Us!</h2>
          <p className="text-gray-700">Explore our website and find thousands of products to transform your home. Whether you're looking for furniture, accessories, or textiles, <strong>Deco Bay</strong> is here to help you bring your vision to life.</p>
        </div>
        <div>
          <h2 className="!text-2xl font-semibold text-[#2c3e50]">Contact</h2>
          <p className="text-gray-700 flex flex-col gap-2">
            <span>
              <strong>Email:</strong> <a href="mailto:{import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}" className="hover:underline">{import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}</a><br />
              </span>
              <span>
            <strong>Phone:</strong> <a href="tel:+14842148789" className=" hover:underline">{import.meta.env.VITE_CUSTOMER_SERVICE_PHONE}</a><br />
              </span>
              <span>
            <strong>Hours:</strong> Monday to Friday, 8:00 AM – 6:00 PM (EST)
              </span>
          </p>
        </div>
        <div >
          <h2 className="!text-2xl font-semibold text-[#2c3e50]">Company Details</h2>
          <p className="text-gray-700 flex flex-col gap-2">
            <span>
            <strong>Company: </strong> {import.meta.env.VITE_COMPANY_NAME}<br />
            </span>
            <span>  
            <strong>Address: </strong> {import.meta.env.VITE_COMPANY_ADDRESS}<br />
            </span>
            <span>
            <strong>Email: </strong> <a href="mailto:{import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}" className="hover:underline">{import.meta.env.VITE_CUSTOMER_SUPPORT_EMAIL}</a><br />
            </span>
            <span>
            <strong>Phone: </strong> <a href="tel:+14842148789" className=" hover:underline">{import.meta.env.VITE_CUSTOMER_SERVICE_PHONE}</a><br />
            </span>
            <span>
            <strong>Website: </strong> <a href="{import.meta.env.VITE_DOMAIN_NAME}" target="_blank" rel="noopener noreferrer" className="hover:underline">{import.meta.env.VITE_STORE_NAME}.com</a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
} 