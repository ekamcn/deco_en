import { Image } from '@shopify/hydrogen';

interface ImageBannerProps {
    title?: string;
    subtitle?: string;
    description?: string;
    imageUrl?: string;
    mobileImageUrl?: string;
    buttonText?: string;
    buttonUrl?: string;
    className?: string;
}

// Main banner component
export function ImageBanner({
    title = `${import.meta.env.VITE_STORE_TITLE}`,
    subtitle = `Welcome to ${import.meta.env.VITE_STORE_TITLE}, a proudly American brand committed to transforming your home with style, quality, and unbeatable value.`,
    description = 'Founded by a team of passionate home decor enthusiasts, our mission is simple: to make your living space more beautiful, more functional, and above all — more accessible for everyone.',
    imageUrl = '',
    mobileImageUrl = '',
    buttonText = 'Shop Now',
    buttonUrl = '',
    className = '',
}: ImageBannerProps) {
    //console.log("ImageBanner rendered with imageUrl:", imageUrl);
    return (
        <div className={`w-full ${className}`}>
            {/* Image Section */}
            <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[50vh] overflow-hidden">
                {imageUrl || mobileImageUrl ? (
                    <>
                        {/* Desktop Image */}
                        {imageUrl && (
                            <div className="hidden sm:block w-full h-full">
                                <Image
                                    data={{
                                        url: imageUrl,
                                        altText: 'Home decor showcase',
                                        width: 1500,
                                        height: 1200,
                                    }}
                                    sizes="(min-width: 640px) 100vw"
                                    aspectRatio="16/9"
                                    className="w-full h-full object-cover object-center"
                                />
                            </div>
                        )}

                        {/* Mobile Image */}
                        <div className="block sm:hidden w-full h-full">
                            <Image
                                data={{
                                    url: mobileImageUrl || imageUrl || '', // fallback if mobileImageUrl not passed
                                    altText: 'Mobile home decor showcase',
                                    width: 800,
                                    height: 1000,
                                }}
                                sizes="(max-width: 639px) 100vw"
                                aspectRatio="4/5"
                                className="w-full h-full object-cover object-center"
                            />
                        </div>
                    </>
                ) : (
                    // Fallback gradient background
                    <div className="w-full h-full bg-gradient-to-br from-stone-200 via-stone-300 to-amber-200">
                        {/* Geometric shapes */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-amber-300 rounded-full blur-xl" />
                            <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-stone-400 rounded-full blur-lg" />
                            <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-amber-400 rounded-full blur-md" />
                        </div>
                    </div>
                )}
            </div>

            {/* Content Section - Below Image */}
            <div className="bg-[var(--color-2)] text-white py-2 sm:py-1 lg:py-6 xl:py-8">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="w-full text-center flex flex-col items-center justify-center">
                        <div className="max-w-screen mx-auto">
                            {/* Description */}
                            <p className="!text-sm lg:!text-base text-white !leading-7 max-w-7xl mx-auto !py-3">
                                <strong> {subtitle}</strong> {description}
                                <br />
                            </p>
                            {/* <p className="!mt-4 text-sm sm:text-base lg:text-lg text-white leading-relaxed max-w-6xl mx-auto">
                                {description}
                            </p> */}

                            {/* Call to Action Button
                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                                <a
                                    href={buttonUrl}
                                    className="inline-flex items-center justify-center px-8 sm:px-10 py-3 sm:py-4 bg-white text-stone-900 font-semibold text-sm sm:text-base rounded-lg hover:bg-stone-100 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                                >
                                    {buttonText}
                                </a>
                                <a
                                    href="/about"
                                    className="inline-flex items-center justify-center px-8 sm:px-10 py-3 sm:py-4 border-2 border-white text-white font-semibold text-sm sm:text-base rounded-lg hover:bg-white hover:text-stone-900 transition-colors duration-200"
                                >
                                    Learn More
                                </a>
                            </div>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Alternative banner with more layout options
export function ImageBannerVariant({
    title = `${import.meta.env.VITE_STORE_TITLE}`,
    subtitle = `Welcome to ${import.meta.env.VITE_STORE_TITLE}, a proudly American brand committed to transforming your home with style, quality, and unbeatable value.`,
    description = 'Founded by a team of passionate home decor enthusiasts, our mission is simple: to make your living space more beautiful, more functional, and above all — more accessible for everyone.',
    imageUrl = '',
    buttonText = 'Shop Now',
    buttonUrl = '/',
    className = '',
    layout = 'bottom', // "bottom", "center", "left", "right"
    theme = 'dark', // "dark", "light"
}: ImageBannerProps & {
    layout?: 'bottom' | 'center' | 'left' | 'right';
    theme?: 'dark' | 'light';
}) {
    const textColor = theme === 'dark' ? 'text-white' : 'text-stone-900';
    const buttonStyle =
        theme === 'dark'
            ? 'bg-[--color-2] text-stone-900 hover:bg-stone-100'
            : 'bg-[--color-2] text-white hover:bg-stone-800';

    const layoutStyles = {
        bottom: 'justify-end items-start',
        center: 'justify-center items-center text-center',
        left: 'justify-center items-start',
        right: 'justify-center items-end',
    };

    return (
        <div className={`relative w-full min-h-screen ${className}`}>
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden">
                {imageUrl ? (
                    <>
                        <Image
                            data={{
                                url: imageUrl,
                                altText: 'Hero banner',
                                width: 1500,
                                height: 1200,
                            }}
                            sizes="(min-width: 45em) 50vw, 100vw"
                            aspectRatio="4/5"
                            className="w-full h-full object-cover object-center"
                        />
                        <div
                            className={`absolute inset-0 ${theme === 'dark'
                                ? 'bg-gradient-to-t from-black/70 via-black/20 to-transparent'
                                : 'bg-gradient-to-t from-white/70 via-white/20 to-transparent'
                                }`}
                        />
                    </>
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-stone-200 via-stone-300 to-amber-200">
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-amber-300 rounded-full blur-xl" />
                            <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-stone-400 rounded-full blur-lg" />
                            <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-amber-400 rounded-full blur-md" />
                        </div>
                        <div
                            className={`absolute inset-0 ${theme === 'dark'
                                ? 'bg-gradient-to-t from-black/50 via-black/10 to-transparent'
                                : 'bg-gradient-to-t from-white/50 via-white/10 to-transparent'
                                }`}
                        />
                    </div>
                )}
            </div>

            {/* Content */}
            <div
                className={`relative flex flex-col min-h-screen ${layoutStyles[layout]}`}
            >
                <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <div className="max-w-7xl mx-auto">
                        <div className={`max-w-4xl ${layout === 'right' ? 'ml-auto' : ''}`}>
                            <h1
                                className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 tracking-tight ${textColor}`}
                            >
                                {title}
                            </h1>
                            <p
                                className={`text-lg sm:text-xl lg:text-2xl mb-4 sm:mb-6 font-medium leading-relaxed ${textColor} opacity-90`}
                            >
                                {subtitle}
                            </p>
                            <p
                                className={`text-sm sm:text-base lg:text-lg mb-8 sm:mb-10 lg:mb-12 leading-relaxed max-w-6xl ${textColor} opacity-80`}
                            >
                                {description}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                                <a
                                    href={buttonUrl}
                                    className={`inline-flex items-center justify-center px-8 sm:px-10 py-3 sm:py-4 font-semibold text-sm sm:text-base rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 ${buttonStyle}`}
                                >
                                    {buttonText}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImageBanner;

