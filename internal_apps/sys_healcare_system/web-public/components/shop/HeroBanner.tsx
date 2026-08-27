'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';

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

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 6000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    return (
        <div className="relative w-full h-[500px] max-lg:h-[400px] max-md:h-[350px] rounded-[2.5rem] overflow-hidden group mb-10 shadow-2xl shadow-slate-200/50">
            {/* Banner Slider */}
            <div
                className="flex transition-transform duration-1000 cubic-bezier(0.4, 0, 0.2, 1) h-full w-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {slides.map((slide) => (
                    <div key={slide.id} className="min-w-full h-full relative flex-shrink-0">
                        <div className="relative w-full h-full">
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover object-center transition-transform duration-[10s] group-hover:scale-110"
                                onError={(e) => (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?auto=format&fit=crop&q=80&w=1600'}
                            />
                            {/* Gradient Overlays */}
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent flex items-center px-12 md:px-20">
                                
                                {/* Text Content Area */}
                                <div className="max-w-[600px] animate-in fade-in slide-in-from-left-8 duration-1000">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/20 backdrop-blur-md rounded-full border border-primary/20 text-xs font-bold text-teal-400 uppercase tracking-[0.2em] mb-6">
                                        <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
                                        Marketplace Dược Phẩm
                                    </div>
                                    
                                    <h2 className="text-5xl md:text-6xl font-black mb-6 text-white leading-[1.1] tracking-tight drop-shadow-2xl">
                                        {slide.title}
                                    </h2>
                                    
                                    <p className="text-xl text-slate-100/90 mb-8 font-medium leading-relaxed drop-shadow-lg line-clamp-2 max-w-[500px]">
                                        {slide.description}
                                    </p>
                                    
                                    <div className="flex flex-wrap gap-4">
                                        <Link 
                                            href={slide.link} 
                                            className="inline-flex items-center justify-center gap-3 bg-white text-slate-900 font-black px-8 py-4 rounded-2xl hover:bg-primary hover:text-white transition-all duration-300 shadow-xl hover:shadow-primary/30 hover:-translate-y-1 group/btn"
                                        >
                                            Mua Sắm Ngay
                                            <AiOutlineArrowRight className="text-lg group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                        
                                        <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white font-bold hover:bg-white/20 transition-all">
                                            Tìm Nhà Thuốc
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-10 right-12 flex gap-3 z-30 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                <button
                    onClick={prevSlide}
                    className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-slate-900 transition-all shadow-lg"
                >
                    <AiOutlineArrowLeft className="text-xl" />
                </button>
                <button
                    onClick={nextSlide}
                    className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-slate-900 transition-all shadow-lg"
                >
                    <AiOutlineArrowRight className="text-xl" />
                </button>
            </div>

            {/* Progress Dots */}
            <div className="absolute bottom-10 left-12 flex gap-3 z-30">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`transition-all duration-500 rounded-full h-1.5 ${currentSlide === idx
                            ? 'bg-white w-12'
                            : 'bg-white/30 hover:bg-white/50 w-6'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroBanner;
