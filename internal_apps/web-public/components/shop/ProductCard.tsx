import Image from 'next/image';
import Link from 'next/link';
import { AiFillStar, AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';
import { MdVerified } from 'react-icons/md';

interface ProductCardProps {
    id: string;
    title: string;
    image: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    isNew?: boolean;
    pharmacyName?: string;
    pharmacyVerified?: boolean;
    pharmacyId?: string;
}

const ProductCard = ({
    id,
    title,
    image,
    price,
    originalPrice,
    discount,
    isNew,
    pharmacyName = "Pharmacity",
    pharmacyVerified = true,
    pharmacyId = "1"
}: ProductCardProps) => {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN').format(price);
    };

    return (
        <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 border border-slate-100 flex flex-col h-full hover:-translate-y-1.5">
            {/* Product Tags */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
                {isNew && (
                    <span className="inline-flex px-3 py-1 rounded-full text-[10px] uppercase font-black tracking-wider text-white bg-gradient-to-r from-teal-400 to-primary shadow-lg shadow-primary/20">
                        MỚI
                    </span>
                )}
                {discount && (
                    <span className="inline-flex px-3 py-1 rounded-full text-[10px] uppercase font-black tracking-wider text-white bg-gradient-to-r from-rose-500 to-pink-500 shadow-lg shadow-rose-500/20">
                        -{discount}%
                    </span>
                )}
            </div>

            {/* Favorite Button */}
            <button className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md text-slate-400 hover:text-rose-500 shadow-sm flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0">
                <AiOutlineHeart className="text-xl" />
            </button>

            <div className="flex-1 flex flex-col">
                {/* Product Image Container */}
                <Link href={`/shop/products/${id}`} className="relative w-full aspect-square overflow-hidden bg-slate-50 p-6 group-hover:bg-white transition-colors duration-500">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-110"
                        onError={(e) => (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400'}
                    />
                </Link>

                {/* Product Info */}
                <div className="p-5 flex flex-col flex-1">
                    {/* Pharmacy Info */}
                    <Link href={`/shop/pharmacies/${pharmacyId}`} className="flex items-center gap-1.5 mb-2.5 hover:text-primary transition-colors w-fit relative z-30">
                        <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider truncate max-w-[120px] group-hover:text-slate-600 transition-colors">
                            {pharmacyName}
                        </span>
                        {pharmacyVerified && <MdVerified className="text-blue-500 text-xs flex-shrink-0" title="Nhà thuốc uy tín" />}
                    </Link>

                    <Link href={`/shop/products/${id}`} className="block">
                        <h3 className="text-[15px] font-black text-slate-800 mb-3 line-clamp-2 min-h-[44px] leading-snug group-hover:text-primary transition-colors duration-300">
                            {title}
                        </h3>
                    </Link>

                    <div className="mt-auto">
                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-3">
                            <div className="flex text-amber-400">
                                <AiFillStar className="text-xs" />
                                <AiFillStar className="text-xs" />
                                <AiFillStar className="text-xs" />
                                <AiFillStar className="text-xs" />
                                <AiFillStar className="text-xs text-slate-200" />
                            </div>
                            <span className="text-[11px] text-slate-400 font-bold">(4.8)</span>
                        </div>

                        {/* Price */}
                        <div className="flex flex-col">
                            {originalPrice && (
                                <span className="text-[11px] text-slate-400 line-through mb-0.5 font-medium">
                                    {formatPrice(originalPrice)}đ
                                </span>
                            )}
                            <div className="flex items-end justify-between">
                                <span className="text-xl font-black text-slate-900 tracking-tight group-hover:text-primary transition-colors">
                                    {formatPrice(price)}<sup className="text-xs ml-0.5 font-bold uppercase tracking-tighter">đ</sup>
                                </span>
                                
                                {/* Add to Cart Small Button */}
                                <button className="w-10 h-10 rounded-xl bg-slate-900 text-white hover:bg-primary transition-all duration-300 flex items-center justify-center group/btn shadow-xl shadow-slate-900/10">
                                    <AiOutlineShoppingCart className="text-xl transform group-hover/btn:scale-110 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
