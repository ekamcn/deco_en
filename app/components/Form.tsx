import React, { useState } from 'react';

export default function Form() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitted(true);
    
    const form = e.target as HTMLFormElement;
    form.reset();
    
  };

  return (
    <div className="pb-4 px-4 flex flex-col items-center justify-center w-full">
      <h2 className="!text-3xl font-bold text-center !pb-5">Contact Us</h2>    

        {isSubmitted && (
          <div className="w-full !max-w-2xl mb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <svg aria-hidden="true" focusable="false" role="presentation" className="icon icon-success flex-shrink-0 w-4 h-4" viewBox="0 0 13 13">
                <path d="M6.5 12.35C9.73087 12.35 12.35 9.73086 12.35 6.5C12.35 3.26913 9.73087 0.65 6.5 0.65C3.26913 0.65 0.65 3.26913 0.65 6.5C0.65 9.73086 3.26913 12.35 6.5 12.35Z" fill="#428445" stroke="white" strokeWidth="0.7"></path>
                <path d="M5.53271 8.66357L9.25213 4.68197" stroke="white"></path>
                <path d="M4.10645 6.7688L6.13766 8.62553" stroke="white"></path>
              </svg>
              <span className="font-semibold text-sm">Thanks for contacting us. We'll get back to you as soon as possible.</span>
            </div>
          </div>
        )}
      
      <form onSubmit={handleSubmit} method="post" action="/contact#ContactForm" id="ContactForm" acceptCharset="UTF-8" className="space-y-6 w-full !max-w-2xl">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <input
              className="!rounded-full w-full px-4 py-3 border !border-gray-400 text-black bg-transparent focus:outline-none focus:ring-2 focus:ring-white placeholder-black"
              autoComplete="name"
              type="text"
              id="ContactForm-name"
              name="contact[Name]"
              placeholder="Name"
              required
            />
            <input
              autoComplete="email"
              type="email"
              id="ContactForm-email"
              className="w-full px-4 py-3 border !border-gray-400 text-black bg-transparent !rounded-full focus:outline-none focus:ring-2 focus:ring-white placeholder-black"
              name="contact[email]"
              spellCheck="false"
              autoCapitalize="off"
              aria-required="true"
              placeholder="Email"
              required
            />
          </div>
          <input
            type="tel"
            id="ContactForm-phone"
            className="w-full px-4 py-3 border !border-gray-400 text-black bg-transparent !rounded-full focus:outline-none focus:ring-2 focus:ring-white placeholder-black"
            autoComplete="tel"
            name="contact[Phone number]"
            pattern="[0-9\-]*"
            placeholder="Phone number"
            required
          />
          <textarea
            id="ContactForm-comments"
            className="w-full px-4 pt-2 border !border-gray-400 text-black bg-transparent !rounded-4xl focus:outline-none focus:ring-2 focus:ring-white placeholder-black placeholder:text-left resize-none min-h-[120px]"
            name="Comments"
            placeholder="Comments"
          />
        </div>
        <div className="flex justify-center">
          <button type="submit" className="button bg-[var(--color-1)] text-white font-medium px-8 py-3 rounded-full shadow hover:bg-[var(--color-1)] transition-colors cursor-pointer" 
          // onClick={()=>{console.log("Button is clicked")}}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
