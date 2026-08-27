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
        <div className="flex flex-col gap-10">
            {categories.map((category) => (
                <div key={category.id} className="w-full">
                    <div className="flex justify-between items-center mb-5 border-b border-gray-100 pb-2">
                        <h2 className="text-xl font-bold text-text-main uppercase font-sans">{category.title}</h2>
                        <Link
                            href={`/shop/categories/${category.id}`}
                            className="text-primary hover:text-teal font-medium transition-colors"
                        >
                            Xem tất cả
                        </Link>
                    </div>

                    <div className="grid grid-cols-4 gap-5 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
                        {/* Category Banner */}
                        <div className="relative rounded-[5px] overflow-hidden group shadow-sm aspect-[3/4] max-md:hidden">
                            <Image
                                src={category.image}
                                alt={category.title}
                                fill
                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center p-4">
                                <h3 className="text-white text-2xl font-bold text-center drop-shadow-md">
                                    {category.title}
                                </h3>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="col-span-3 max-lg:col-span-3 max-md:col-span-2 max-sm:col-span-1 grid grid-cols-3 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5">
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
