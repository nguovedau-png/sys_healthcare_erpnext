'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/store/CartContext';
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlinePlus, AiOutlineMinus, AiOutlineArrowRight, AiOutlineShop } from 'react-icons/ai';
import { MdVerified } from 'react-icons/md';

// Mock data items (should be shared or fetched)
const allProducts = [
    { id: 'sp1', title: 'Viên uống bổ sung Vitamin D3 Cao Cấp', image: 'https://cdn.nhathuoclongchau.com.vn/unsafe/800x800/https://cms-prod.s3-sgn09.fptcloud.com/00003254_aspirin_81mg_vidipha_10x10_6380_6164_large_09c3d4a6f7.jpg', price: 450000, originalPrice: 550000, category: 'Thực phẩm chức năng', pharmacy: 'Pharmacity' },
    { id: 'sp2', title: 'Vitamin C 1000mg Tăng Cường Miễn Dịch', image: 'https://cdn.nhathuoclongchau.com.vn/unsafe/800x800/https://cms-prod.s3-sgn09.fptcloud.com/00010173_vitamin_c_1000mg_brauer_ho_tro_mien_dich_hop_30_vien_5885_6396_large_d9f56477d6.jpg', price: 350000, originalPrice: 400000, category: 'Thực phẩm chức năng', pharmacy: 'Long Châu' },
    { id: 'sp3', title: 'Omega 3 Fish Oil - Dầu Cá Tinh Khiết', image: 'https://cdn.nhathuoclongchau.com.vn/unsafe/800x800/https://cms-prod.s3-sgn09.fptcloud.com/00010173_vitamin_c_1000mg_brauer_ho_tro_mien_dich_hop_30_vien_5885_6396_large_d9f56477d6.jpg', price: 600000, originalPrice: 750000, category: 'Thực phẩm chức năng', pharmacy: 'Pharmacity' },
    { id: 'sp4', title: 'Máy đo huyết áp Omron Chính Hãng', image: 'https://cdn.nhathuoclongchau.com.vn/unsafe/800x800/https://cms-prod.s3-sgn09.fptcloud.com/00003254_aspirin_81mg_vidipha_10x10_6380_6164_large_09c3d4a6f7.jpg', price: 1200000, originalPrice: 1500000, category: 'Thiết bị y tế', pharmacy: 'An Khang' },
    { id: 'sp5', title: 'Khẩu trang y tế 4 lớp Kháng Khuẩn', image: 'https://cdn.nhathuoclongchau.com.vn/unsafe/800x800/https://cms-prod.s3-sgn09.fptcloud.com/00003254_aspirin_81mg_vidipha_10x10_6380_6164_large_09c3d4a6f7.jpg', price: 50000, originalPrice: 70000, category: 'Y tế', pharmacy: 'Phano' },
];

const ITEMS_PER_PAGE = 8;

export default function QuickOrderPage() {
    const { items, addToCart, removeFromCart, updateQuantity } = useCart();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => { setIsClient(true); }, []);

    const filteredProducts = allProducts.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const getQuantityInCart = (id: string) => {
        const item = items.find(i => i.id === id);
        return item ? item.quantity : 0;
    };

    const handleQuantityChange = (product: any, change: number) => {
        const currentQty = getQuantityInCart(product.id);
        const newQty = currentQty + change;

        if (newQty <= 0) {
            removeFromCart(product.id);
        } else {
            if (currentQty === 0 && change > 0) {
                addToCart({
                    id: product.id,
                    title: product.title,
                    image: product.image,
                    price: product.price,
                    pharmacyName: product.pharmacy
                }, 1);
            } else {
                updateQuantity(product.id, newQty);
            }
        }
    };

    if (!isClient) return null;

    const totalItemsCount = items.reduce((sum, i) => sum + i.quantity, 0);

    return (
        <div className="bg-slate-50/50 min-h-screen py-16 font-sans relative">
            <div className="container mx-auto px-4 max-w-7xl relative z-10">

                {/* Header Section */}
                <div className="mb-16">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-2xl shadow-slate-900/20">
                            <AiOutlineShop className="text-3xl" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                                Đặt Hàng <span className="text-primary">Nhanh</span>
                            </h1>
                            <p className="text-slate-500 font-medium mt-1">Tìm kiếm và lên đơn hàng siêu tốc từ Marketplace</p>
                        </div>
                    </div>
                </div>

                {/* Search Bar - Floating Style */}
                <div className="mb-12 bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col lg:flex-row justify-between items-center gap-8">
                    <div className="relative w-full lg:max-w-2xl">
                        <AiOutlineSearch className="w-6 h-6 absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Tên thuốc, thực phẩm chức năng, thiết bị..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-16 pr-8 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-slate-900 font-bold text-lg placeholder:text-slate-300"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Trạng thái giỏ</span>
                            <div className="flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-700 rounded-xl border border-teal-100 font-black text-sm">
                                <AiOutlineShoppingCart className="text-lg" />
                                {totalItemsCount} Sản phẩm
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-[3rem] shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden mb-12">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Sản phẩm</th>
                                    <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 text-center">Đơn giá</th>
                                    <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 text-center">Số lượng</th>
                                    <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 text-right">Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedProducts.map((product, idx) => {
                                    const qty = getQuantityInCart(product.id);
                                    const isAdded = qty > 0;
                                    return (
                                        <tr key={product.id} className={`group transition-all ${isAdded ? 'bg-primary/[0.02]' : 'hover:bg-slate-50/50'} ${idx !== paginatedProducts.length - 1 ? 'border-b border-slate-50' : ''}`}>
                                            <td className="p-8 align-middle">
                                                <div className="flex items-center gap-6 min-w-[350px]">
                                                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-slate-100 flex-shrink-0 bg-white shadow-sm p-3 group-hover:scale-105 transition-transform">
                                                        <img src={product.image} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1.5">
                                                            <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/10 px-2.5 py-1 rounded-lg">{product.category}</span>
                                                            <div className="flex items-center gap-1 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                                <AiOutlineShop /> {product.pharmacy}
                                                            </div>
                                                        </div>
                                                        <h4 className="font-black text-slate-800 text-lg leading-tight group-hover:text-primary transition-colors">{product.title}</h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-8 align-middle text-center font-black text-slate-900 text-lg">
                                                {product.price.toLocaleString()}<sup className="text-xs ml-0.5">đ</sup>
                                            </td>
                                            <td className="p-8 align-middle">
                                                <div className="flex justify-center">
                                                    <div className={`flex items-center bg-white rounded-2xl p-1.5 shadow-sm border ${isAdded ? 'border-primary ring-4 ring-primary/5' : 'border-slate-100'}`}>
                                                        <button
                                                            onClick={() => handleQuantityChange(product, -1)}
                                                            className={`w-10 h-10 flex items-center justify-center rounded-xl font-black text-lg transition-all ${qty <= 0 ? 'text-slate-200 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100'}`}
                                                            disabled={qty === 0}
                                                        >
                                                            <AiOutlineMinus />
                                                        </button>
                                                        <span className="w-12 text-center font-black text-lg text-slate-800">{qty}</span>
                                                        <button
                                                            onClick={() => handleQuantityChange(product, 1)}
                                                            className="w-10 h-10 flex items-center justify-center rounded-xl font-black text-lg text-primary hover:bg-primary hover:text-white transition-all"
                                                        >
                                                            <AiOutlinePlus />
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-8 align-middle text-right">
                                                {qty > 0 ? (
                                                    <div className="flex flex-col items-end">
                                                        <span className="text-2xl font-black text-slate-900 tracking-tighter">{(product.price * qty).toLocaleString()}<sup className="text-sm ml-0.5 font-bold text-slate-400">đ</sup></span>
                                                        <span className="text-[10px] font-black text-teal-600 uppercase tracking-widest mt-1">Đã thêm vào giỏ</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-slate-200 font-black tracking-widest">---</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                                {paginatedProducts.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="text-center py-24">
                                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
                                                <AiOutlineSearch className="text-4xl" />
                                            </div>
                                            <p className="text-slate-400 font-black uppercase tracking-widest">Không tìm thấy sản phẩm</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center gap-4 mb-24">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`w-14 h-14 rounded-2xl font-black transition-all border ${currentPage === i + 1 ? 'bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-900/20' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300'}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Fixed Footer Bar */}
            <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-2xl border-t border-slate-100 shadow-[0_-20px_50px_rgba(0,0,0,0.05)] z-50 py-6">
                <div className="container mx-auto px-4 max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-[1.5rem] bg-slate-900 flex items-center justify-center text-white shadow-xl">
                            <AiOutlineShoppingCart className="text-3xl" />
                        </div>
                        <div>
                            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Tổng cộng dự kiến</p>
                            <p className="text-3xl font-black text-slate-900 tracking-tighter">
                                {items.reduce((sum, i) => sum + i.price * i.quantity, 0).toLocaleString()}
                                <sup className="text-sm ml-1 font-bold text-slate-400">đ</sup>
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        <Link href="/shop/cart" className="flex-1 sm:flex-none flex items-center justify-center gap-4 px-12 py-5 bg-primary text-white font-black rounded-[2rem] shadow-2xl shadow-primary/20 hover:bg-slate-900 transition-all hover:-translate-y-1 group">
                            ĐẾN GIỎ HÀNG
                            <AiOutlineArrowRight className="text-2xl group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
