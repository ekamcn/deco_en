import React from 'react';

export default function Form() {
  return (
    <div className="py-12 px-4 flex flex-col items-center justify-center w-full">
      <h2 className="!text-3xl font-bold text-center !pb-5">Contact Us</h2>
      <form method="post" action="/contact#ContactForm" id="ContactForm" acceptCharset="UTF-8" className="space-y-6 w-full !max-w-2xl">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <input
              className="!rounded-full w-full px-4 py-3 border !border-gray-400 text-black bg-transparent focus:outline-none focus:ring-2 focus:ring-white placeholder-black"
              autoComplete="name"
              type="text"
              id="ContactForm-name"
              name="contact[Name]"
              placeholder="Name"
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
          />
          <textarea
            id="ContactForm-comments"
            className="w-full px-4 pt-2 border !border-gray-400 text-black bg-transparent !rounded-4xl focus:outline-none focus:ring-2 focus:ring-white placeholder-black placeholder:text-left resize-none min-h-[120px]"
            name="Comments"
            placeholder="Comments"
          />
        </div>
        <div className="flex justify-center">
          <button type="submit" className="button bg-[var(--color-1)] text-white font-medium px-8 py-3 rounded-full shadow hover:bg-[var(--color-1)] transition-colors" 
          // onClick={()=>{console.log("Button is clicked")}}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
