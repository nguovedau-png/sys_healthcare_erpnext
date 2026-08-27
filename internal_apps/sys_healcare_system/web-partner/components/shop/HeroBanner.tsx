'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Slide {
    id: number;
    image: string;
    title: string;
    description: string;
    link: string;
}

interface HeroBannerProps {
    slides: Slide[];
}

const HeroBanner = ({ slides }: HeroBannerProps) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    return (
        <div className="relative w-full h-[400px] max-md:h-[300px] max-sm:h-[200px] rounded-[5px] overflow-hidden group mb-8">
            {/* Banner Slider */}
            <div
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {slides.map((slide) => (
                    <div key={slide.id} className="min-w-full h-full relative">
                        <Link href={slide.link} className="block w-full h-full">
                            <div className="relative w-full h-full">
                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    fill
                                    className="object-cover w-full h-full"
                                    priority={slide.id === 1}
                                />
                                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-[60px] text-white max-md:px-[30px] max-sm:px-[20px]">
                                    <h2 className="text-3xl font-bold mb-4 max-md:text-2xl max-sm:text-xl line-clamp-2">
                                        {slide.title}
                                    </h2>
                                    <p className="text-lg max-md:text-base max-sm:text-sm line-clamp-2 max-w-[600px]">
                                        {slide.description}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((slide) => (
                    <button
                        key={slide.id}
                        onClick={() => setCurrentSlide(slide.id - 1)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${currentSlide === slide.id - 1
                            ? 'bg-white scale-125'
                            : 'bg-white/50 hover:bg-white'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroBanner;
