'use client';

import Image from 'next/image';
import Link from 'next/link';
import ProductCard from './ProductCard';

interface Category {
    id: string;
    title: string;
    image: string;
    products: Array<{
        id: string;
        title: string;
        image: string;
        price: number;
        originalPrice?: number;
        isNew?: boolean;
        discount?: number;
    }>;
}

interface CategoryListProps {
    categories: Category[];
}

const CategoryList = ({ categories }: CategoryListProps) => {
    return (
        <div className="flex flex-col gap-16">
            {categories.map((category) => (
                <div key={category.id} className="w-full">
                    {/* Section Header */}
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 tracking-wide font-sans">{category.title}</h2>
                            <div className="h-1 w-20 bg-gradient-to-r from-primary to-teal-400 rounded-full mt-2"></div>
                        </div>
                        <Link
                            href={`/shop/categories/${category.id}`}
                            className="group flex items-center text-sm font-medium text-gray-500 hover:text-primary transition-colors"
                        >
                            Xem tất cả
                            <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>

                    <div className="grid grid-cols-4 gap-6 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
                        {/* Category Featured Banner - Sleeker Design */}
                        <div className="relative rounded-lg overflow-hidden group shadow-md max-md:hidden h-full min-h-[350px]">
                            <Image
                                src={category.image}
                                alt={category.title}
                                fill
                                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/80 flex flex-col justify-end p-6">
                                <h3 className="text-white text-3xl font-bold drop-shadow-md mb-2">
                                    {category.title}
                                </h3>
                                <p className="text-white/80 font-light text-sm mb-4">Khám phá các sản phẩm nổi bật</p>
                                <Link 
                                    href={`/shop/categories/${category.id}`}
                                    className="inline-flex w-fit items-center px-4 py-2 bg-white/20 backdrop-blur-md rounded-lg text-white text-sm font-medium hover:bg-white hover:text-primary transition-colors border border-white/30"
                                >
                                    Khám phá <span className="ml-2">→</span>
                                </Link>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="col-span-3 max-lg:col-span-3 max-md:col-span-2 max-sm:col-span-1 grid grid-cols-3 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-6">
                            {category.products.slice(0, 6).map((product) => (
                                <ProductCard
                                    key={product.id}
                                    id={product.id}
                                    title={product.title}
                                    image={product.image}
                                    price={product.price}
                                    originalPrice={product.originalPrice}
                                    isNew={product.isNew}
                                    discount={product.discount}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CategoryList;
