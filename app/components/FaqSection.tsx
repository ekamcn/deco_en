import React from 'react';

interface Faq {
    question: string;
    answer: React.ReactNode;
}

interface FaqSectionType {
    title: string;
    faqs: Faq[];
}

function CheckIcon() {
    return (
        <svg
            className="inline-block mr-2 text-white"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
        >
            <rect x="1.5" y="1.5" width="17" height="17" rx="2.5" stroke="white" />
            <path
                d="M5 10.5L8.5 14L15 7.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function CaretIcon() {
    return (
        <svg
            className="ml-2 text-white"
            width="16"
            height="10"
            viewBox="0 0 10 6"
            fill="none"
        >
            <path
                d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z"
                fill="white"
            />
        </svg>
    );
}

interface FaqSectionProps {
    sections: FaqSectionType[];
    showNewsletter?: boolean;
    rounded?: boolean;
}

export default function FaqSection({
    sections,
    showNewsletter = false,
    rounded,
}: FaqSectionProps) {
    return (
        <section className="relative bg-[var(--color-2)] text-white my-20">
            {/* Top Wave */}
            {rounded && (
                <div className="absolute top-10 left-0 w-full overflow-hidden leading-none rotate-0 -translate-y-full z-0">
                    <svg
                        viewBox="0 0 1440 110"
                        className="w-full h-[110px]"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M0,11L120,25.7C240,40,480,70,720,67.8C960,66,1200,33,1440,16.5V110H0Z"
                             fill="var(--color-2)"
                        />
                    </svg>
                </div>
            )}

            <div className="relative z-1 max-w-2xl mx-auto px-4">
                {sections.map((section) => (
                    <div key={section.title} className="pb-12">
                        <h1 className="text-4xl font-bold text-center pb-8">
                            {section.title}
                        </h1>
                        <div className="divide-y divide-white/10">
                            {section.faqs.map((faq) => (
                                <details key={faq.question} className="group bg-[var(--color-2)]">
                                    <summary className="flex items-center justify-between py-4 px-2 cursor-pointer text-base font-medium group-open:bg-[var(--color-2)] group-open:font-semibold transition-colors">
                                        <span className="flex items-center hover:underline">
                                            <CheckIcon />
                                            {faq.question}
                                        </span>
                                        <CaretIcon />
                                    </summary>
                                    <div className="accordion__content px-6 pb-4 pt-2 text-white text-sm">
                                        {faq.answer}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                ))}

                {showNewsletter && (
                    <div className="text-center mt-8">
                        <h3 className="text-2xl font-bold">Subscribe to Our Newsletter</h3>
                        <p className="text-sm text-[var(--color-2)] mt-1 mb-4">
                            Be the first to know about our new product launches and exclusive
                            promotions!
                        </p>
                        <form className="max-w-md mx-auto relative mt-2">
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full px-4 py-3 border-2 !rounded-full !border-white text-white placeholder-white bg-[var(--color-2)] focus:outline-none focus:ring-2 focus:ring-white"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white p-2"
                                aria-label="Subscribe"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                    />
                                </svg>
                            </button>
                        </form>
                    </div>
                )}
            </div>
            {rounded && (
                <>
                    {/* Bottom Wave */}
                    <div className="absolute -bottom-20 left-0 w-full overflow-hidden leading-none z-0 rotate-180">
                        <svg
                            viewBox="0 0 1440 110"
                            className="w-full h-[110px]"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M0,11L120,25.7C240,40,480,70,720,67.8C960,66,1200,33,1440,16.5V110H0Z"
                                fill="var(--color-2)"
                            />
                        </svg>
                    </div>
                </>
            )}
        </section>
    );
}

