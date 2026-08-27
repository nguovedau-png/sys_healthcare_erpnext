'use client';

import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
    id: string;
    title: string;
    image: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    isNew?: boolean;
}

const ProductCard = ({
    id,
    title,
    image,
    price,
    originalPrice,
    discount,
    isNew
}: ProductCardProps) => {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN').format(price);
    };

    return (
        <Link
            href={`/shop/products/${id}`}
            className="block bg-white rounded-[5px] shadow-sm overflow-hidden transition-all duration-300 relative group hover:shadow-md hover:-translate-y-0.5"
        >
            {/* Product Tags */}
            {(isNew || discount) && (
                <div className="absolute top-2.5 left-2.5 flex flex-col gap-2 z-10">
                    {isNew && (
                        <span className="inline-block px-2 py-1 rounded-[3px] text-xs font-medium text-white bg-primary">
                            MỚI
                        </span>
                    )}
                    {discount && (
                        <span className="inline-block px-2 py-1 rounded-[3px] text-xs font-medium text-white bg-danger">
                            -{discount}%
                        </span>
                    )}
                </div>
            )}

            {/* Product Image */}
            <div className="relative w-full aspect-square overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover w-full h-full"
                />
            </div>

            {/* Product Content */}
            <div className="p-4 max-md:p-3">
                <h3 className="text-sm text-text-main mb-2.5 line-clamp-2 min-h-[40px] leading-[1.4] max-md:text-[13px]">
                    {title}
                </h3>

                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <span className="text-base font-semibold text-primary max-md:text-[15px]">
                            {formatPrice(price)}<sup className="text-xs underline">đ</sup>
                        </span>
                        {originalPrice && (
                            <span className="text-[13px] text-gray-400 line-through">
                                {formatPrice(originalPrice)}<sup className="text-[10px]">đ</sup>
                            </span>
                        )}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center text-yellow-400">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                                key={star}
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
