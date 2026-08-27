"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '@/store/CartContext';
import ProductCard from '@/components/shop/ProductCard';
import { AiOutlineShoppingCart, AiOutlineHeart, AiOutlineInfoCircle, AiOutlineShop, AiOutlineCheckCircle, AiOutlineArrowRight } from 'react-icons/ai';
import { MdVerified, MdLocationOn } from 'react-icons/md';

export default function ProductDetailPage() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);

    const product = {
        id: params.id,
        name: 'Viên Uống Hỗ Trợ Đau Dạ Dày OMEPRAZOL 20mg Cao Cấp',
        brand: 'Pymepharco',
        price: 45000,
        originalPrice: 60000,
        stock: 150,
        images: [
            'https://cdn.nhathuoclongchau.com.vn/unsafe/800x800/https://cms-prod.s3-sgn09.fptcloud.com/00002166_omeprazol_20mg_pymepharco_3x10_7942_6164_large_02c46a6f7b.jpg',
            'https://cdn.nhathuoclongchau.com.vn/unsafe/800x800/https://cms-prod.s3-sgn09.fptcloud.com/00002166_omeprazol_20mg_pymepharco_3x10_7942_6164_large_02c46a6f7b.jpg'
        ],
        description: 'Thuốc giảm đau, hạ sốt hiệu quả. Sản phẩm chăm sóc sức khỏe hàng đầu được khuyên dùng bởi các chuyên gia y tế. Thành phần an toàn và vượt qua kiểm định nghiêm ngặt.',
        usage: 'Uống 1-2 viên mỗi lần, ngày 3-4 lần. Không sử dụng quá 8 viên/ngày đối với người lớn. Uống nhiều nước.',
        ingredients: 'Omeprazol 20mg, tá dược vừa đủ 1 viên nang mềm cao cấp.',
        storage: 'Bảo quản nơi khô ráo, tránh ánh sáng trực tiếp, nhiệt độ dưới 30 độ C. Để xa tầm tay trẻ em.',
        pharmacy: {
            name: 'Pharmacity chi nhánh Quận 1',
            logo: 'https://www.pharmacity.vn/static/img/logo.png',
            address: '123 Lê Lợi, Phường Bến Thành, Quận 1, TP. HCM',
            rating: 4.9,
            verified: true
        }
    };

    const relatedProducts = [
        { id: '2', title: 'Vitamin C 1000mg Hỗ Trợ Kháng Mãn', price: 120000, originalPrice: 150000, discount: 20, image: 'https://cdn.nhathuoclongchau.com.vn/unsafe/800x800/https://cms-prod.s3-sgn09.fptcloud.com/00010173_vitamin_c_1000mg_brauer_ho_tro_mien_dich_hop_30_vien_5885_6396_large_d9f56477d6.jpg', isNew: true, pharmacyName: 'Long Châu' },
        { id: '3', title: 'Aspirin 100mg Bảo Vệ Tim Mạch', price: 35000, image: 'https://cdn.nhathuoclongchau.com.vn/unsafe/800x800/https://cms-prod.s3-sgn09.fptcloud.com/00003254_aspirin_81mg_vidipha_10x10_6380_6164_large_09c3d4a6f7.jpg', isNew: false, pharmacyName: 'Pharmacity' },
    ];

    const handleAddToCart = () => {
        addToCart({
            id: product.id as string,
            title: product.name,
            image: product.images[0],
            price: product.price
        }, quantity);
        router.push('/shop/cart');
    };

    return (
        <div className="min-h-screen bg-slate-50/50 py-12 font-sans">
            <div className="container mx-auto px-4 max-w-7xl">
                
                {/* Breadcrumb Navigation */}
                <nav className="mb-8 flex items-center text-sm font-bold">
                    <Link href="/shop" className="text-slate-400 hover:text-primary transition-colors">Shop</Link>
                    <span className="mx-3 text-slate-300">/</span>
                    <Link href="/shop/products" className="text-slate-400 hover:text-primary transition-colors">Sản Phẩm</Link>
                    <span className="mx-3 text-slate-300">/</span>
                    <span className="text-slate-900 truncate max-w-[250px]">{product.name}</span>
                </nav>

                <div className="flex flex-col lg:flex-row gap-10 mb-16">
                    
                    {/* Left Column: Images */}
                    <div className="w-full lg:w-1/2 space-y-6">
                        <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/40 border border-slate-100 relative group overflow-hidden flex items-center justify-center min-h-[500px]">
                            {/* Tags */}
                            <div className="absolute top-8 left-8 z-10 flex flex-col gap-3">
                                <span className="bg-gradient-to-r from-red-500 to-rose-500 text-white font-black text-xs px-5 py-2 rounded-full shadow-lg shadow-red-500/30 uppercase tracking-widest">
                                    Giảm {Math.round((1 - product.price / product.originalPrice) * 100)}%
                                </span>
                                <span className="bg-white/80 backdrop-blur-md text-primary font-black text-xs px-5 py-2 rounded-full border border-primary/20 shadow-sm uppercase tracking-widest">
                                    Bán chạy
                                </span>
                            </div>
                            
                            <img
                                src={product.images[selectedImage]}
                                alt={product.name}
                                className="max-w-full max-h-[400px] object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                                onError={(e) => (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800'}
                            />
                        </div>
                        
                        {/* Thumbnails */}
                        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all p-3 bg-white shadow-sm ${selectedImage === idx ? 'border-primary ring-4 ring-primary/10' : 'border-transparent hover:border-slate-200'}`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-contain" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Info & Actions */}
                    <div className="w-full lg:w-1/2 flex flex-col">
                        <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/40 border border-slate-100 flex-1">
                            {/* Brand & Title */}
                            <div className="mb-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="px-4 py-1.5 bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                                        Thương hiệu: {product.brand}
                                    </span>
                                </div>
                                <h1 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight mb-6 tracking-tight">
                                    {product.name}
                                </h1>
                                
                                {/* Pricing */}
                                <div className="flex items-baseline gap-4 mb-8">
                                    <span className="text-5xl font-black text-primary tracking-tight">
                                        {product.price.toLocaleString()}<sup className="text-2xl ml-1 uppercase">đ</sup>
                                    </span>
                                    <span className="text-2xl font-bold text-slate-300 line-through">
                                        {product.originalPrice.toLocaleString()}đ
                                    </span>
                                </div>
                                
                                <p className="text-slate-500 leading-relaxed text-lg pb-8 border-b border-slate-100 font-medium">
                                    {product.description}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="space-y-8">
                                <div className="flex items-center gap-3 text-sm font-bold text-teal-600 bg-teal-50 px-6 py-3 rounded-2xl border border-teal-100 w-fit">
                                    <AiOutlineCheckCircle className="text-lg" />
                                    Còn {product.stock} sản phẩm trong kho
                                </div>
                                
                                <div className="flex flex-col md:flex-row items-end gap-6">
                                    {/* Quantity */}
                                    <div className="flex flex-col gap-3 w-full md:w-auto">
                                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Số lượng</span>
                                        <div className="flex items-center bg-slate-50 border border-slate-100 rounded-2xl p-1.5">
                                            <button
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="w-12 h-12 rounded-xl bg-white text-slate-800 font-black text-xl flex items-center justify-center hover:bg-slate-200 transition-colors shadow-sm"
                                            >
                                                -
                                            </button>
                                            <span className="font-black text-xl w-14 text-center text-slate-800">{quantity}</span>
                                            <button
                                                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                                className="w-12 h-12 rounded-xl bg-white text-slate-800 font-black text-xl flex items-center justify-center hover:bg-slate-200 transition-colors shadow-sm"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {/* Add to Cart */}
                                    <div className="flex gap-4 w-full flex-1">
                                        <button
                                            onClick={handleAddToCart}
                                            className="flex-1 h-[68px] bg-slate-900 text-white text-lg font-black rounded-2xl hover:bg-primary transition-all hover:-translate-y-1 shadow-2xl shadow-slate-900/20 flex items-center justify-center gap-3 group"
                                        >
                                            <AiOutlineShoppingCart className="text-2xl group-hover:scale-110 transition-transform" />
                                            THÊM VÀO GIỎ
                                        </button>
                                        
                                        <button className="h-[68px] w-[68px] flex-shrink-0 bg-white border-2 border-slate-100 rounded-2xl hover:border-rose-400 hover:text-rose-500 text-slate-300 transition-all flex items-center justify-center">
                                            <AiOutlineHeart className="text-2xl" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Marketplace Seller Info - NEW SECTION */}
                        <div className="mt-8 bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/40 border border-slate-100 flex items-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 p-3 flex items-center justify-center overflow-hidden">
                                <img src={product.pharmacy.logo} alt="" className="max-w-full max-h-full object-contain" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-black text-slate-800">{product.pharmacy.name}</h4>
                                    {product.pharmacy.verified && <MdVerified className="text-blue-500" />}
                                </div>
                                <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                                    <span className="flex items-center gap-1"><MdLocationOn className="text-slate-300" /> {product.pharmacy.address}</span>
                                    <span className="flex items-center gap-1 text-amber-500">★ {product.pharmacy.rating}</span>
                                </div>
                            </div>
                            <Link href="/shop/pharmacies/1" className="px-5 py-2.5 bg-slate-50 hover:bg-primary hover:text-white rounded-xl text-xs font-black transition-all flex items-center gap-2">
                                <AiOutlineShop className="text-lg" /> XEM SHOP
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Details Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
                    <div className="lg:col-span-2 space-y-10">
                        <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
                            <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                                <div className="w-1.5 h-8 bg-primary rounded-full"></div>
                                Thông Tin Sản Phẩm
                            </h2>
                            <div className="prose prose-slate max-w-none">
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
                                            <AiOutlineInfoCircle className="text-primary" /> Công dụng
                                        </h3>
                                        <p className="text-slate-500 font-medium leading-relaxed bg-slate-50 p-6 rounded-2xl">{product.usage}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
                                            <AiOutlineInfoCircle className="text-primary" /> Thành phần
                                        </h3>
                                        <p className="text-slate-500 font-medium leading-relaxed bg-slate-50 p-6 rounded-2xl">{product.ingredients}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
                                            <AiOutlineInfoCircle className="text-primary" /> Hướng dẫn bảo quản
                                        </h3>
                                        <p className="text-slate-500 font-medium leading-relaxed bg-slate-50 p-6 rounded-2xl">{product.storage}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Sidebar: Delivery Info */}
                    <div className="space-y-8">
                        <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl">
                            <h3 className="text-xl font-black mb-8 tracking-tight">Vận Chuyển & Đổi Trả</h3>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                                        <AiOutlineCheckCircle className="text-xl text-teal-400" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">Giao hàng hỏa tốc</p>
                                        <p className="text-slate-400 text-xs mt-1">Nhận hàng trong 2 giờ tại TP. HCM & Hà Nội</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                                        <AiOutlineCheckCircle className="text-xl text-teal-400" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">Đổi trả dễ dàng</p>
                                        <p className="text-slate-400 text-xs mt-1">Trong vòng 30 ngày nếu có lỗi từ nhà sản xuất</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                <div className="pt-20 border-t border-slate-200">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-black tracking-tight text-slate-900">
                                Sản Phẩm <span className="text-primary">Liên Quan</span>
                            </h2>
                            <p className="text-slate-500 font-medium mt-2">Được nhiều khách hàng xem cùng sản phẩm này</p>
                        </div>
                        <Link href="/shop/products" className="text-primary font-black hover:underline flex items-center gap-2">
                            Xem tất cả <AiOutlineArrowRight />
                        </Link>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                        {relatedProducts.map((item) => (
                            <ProductCard key={item.id} {...item as any} />
                        ))}
                    </div>
                </div>
                
            </div>
            
            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
