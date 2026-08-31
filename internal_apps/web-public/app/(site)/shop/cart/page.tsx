"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useCart, CartItem } from '@/store/CartContext';
import { AiOutlineShoppingCart, AiOutlineDelete, AiOutlinePlus, AiOutlineMinus, AiOutlineArrowRight, AiOutlineShop } from 'react-icons/ai';
import { MdVerified } from 'react-icons/md';

export default function CartPage() {
    const { items, updateQuantity, removeFromCart, getTotalPrice } = useCart();

    // For hydration safety
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Group items by pharmacy
    const groupedItems = useMemo(() => {
        const groups: Record<string, CartItem[]> = {};
        items.forEach(item => {
            const pharmacy = item.pharmacyName || "Pharmacity";
            if (!groups[pharmacy]) groups[pharmacy] = [];
            groups[pharmacy].push(item);
        });
        return groups;
    }, [items]);

    const subtotal = getTotalPrice();
    const shipping = subtotal > 500000 || subtotal === 0 ? 0 : 30000;
    const total = subtotal + shipping;

    if (!isClient) return null;

    return (
        <div className="min-h-screen bg-slate-50/50 pb-24 font-sans">
            <div className="container mx-auto px-4 py-12 max-w-7xl">
                
                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm">
                            <AiOutlineShoppingCart className="text-2xl" />
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                            Giỏ Hàng <span className="text-primary">Của Bạn</span>
                        </h1>
                    </div>
                    <p className="text-slate-500 font-medium ml-16">Bạn đang có {items.length} sản phẩm trong giỏ hàng</p>
                </div>

                {items.length === 0 ? (
                    <div className="bg-white rounded-[3rem] p-20 text-center shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col items-center justify-center min-h-[500px]">
                        <div className="w-40 h-40 bg-slate-50 rounded-full flex items-center justify-center mb-10 shadow-inner group">
                            <AiOutlineShoppingCart className="text-6xl text-slate-200 group-hover:text-primary transition-colors duration-500" />
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 mb-4">Giỏ hàng đang trống</h3>
                        <p className="text-slate-400 mb-10 max-w-md mx-auto font-medium text-lg">Hãy khám phá hàng ngàn sản phẩm y tế chất lượng từ các nhà thuốc uy tín trên Marketplace.</p>
                        <Link href="/shop" className="inline-flex bg-slate-900 text-white font-black px-10 py-5 rounded-[2rem] hover:bg-primary transition-all shadow-2xl shadow-slate-900/20 items-center gap-3 group">
                            TIẾP TỤC MUA SẮM 
                            <AiOutlineArrowRight className="text-xl group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        
                        {/* Cart Items Column */}
                        <div className="lg:col-span-2 space-y-12">
                            {Object.entries(groupedItems).map(([pharmacy, pharmacyItems]) => (
                                <div key={pharmacy} className="space-y-6">
                                    {/* Pharmacy Header */}
                                    <div className="flex items-center gap-3 px-6 py-4 bg-white rounded-3xl border border-slate-100 shadow-sm">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                            <AiOutlineShop className="text-xl" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-black text-slate-800 text-lg uppercase tracking-tight">{pharmacy}</h4>
                                                <MdVerified className="text-blue-500" />
                                            </div>
                                        </div>
                                        <Link href="#" className="text-xs font-black text-primary hover:underline uppercase tracking-widest">Xem shop</Link>
                                    </div>

                                    {/* Products for this pharmacy */}
                                    <div className="space-y-4">
                                        {pharmacyItems.map(item => (
                                            <div key={item.id} className="bg-white rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col sm:flex-row gap-8 group relative overflow-hidden">
                                                {/* Background Accent */}
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 group-hover:bg-primary/5 transition-colors duration-500"></div>
                                                
                                                {/* Image */}
                                                <div className="relative w-full sm:w-32 h-40 sm:h-32 flex-shrink-0 bg-slate-50 rounded-2xl overflow-hidden p-4 border border-slate-100 group-hover:bg-white transition-colors duration-500">
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                                                        onError={(e) => (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=200'}
                                                    />
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 flex flex-col justify-between relative z-10">
                                                    <div className="flex justify-between items-start gap-4 mb-4">
                                                        <div className="flex-1">
                                                            <Link href={`/shop/products/${item.id}`}>
                                                                <h3 className="font-black text-lg text-slate-800 hover:text-primary transition-colors line-clamp-2 leading-tight mb-2">
                                                                    {item.title}
                                                                </h3>
                                                            </Link>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] bg-slate-50 px-2.5 py-1 rounded-lg">ID: {item.id}</span>
                                                                <span className="text-[10px] font-black text-teal-600 uppercase tracking-[0.2em] bg-teal-50 px-2.5 py-1 rounded-lg">Chính hãng</span>
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all border border-transparent hover:border-rose-100"
                                                            title="Xóa sản phẩm"
                                                        >
                                                            <AiOutlineDelete className="text-xl" />
                                                        </button>
                                                    </div>

                                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                                                        {/* Quantity Controller */}
                                                        <div className="flex items-center bg-slate-50 border border-slate-100 rounded-xl p-1 shadow-inner">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                className="w-10 h-10 rounded-lg bg-white shadow-sm hover:bg-primary hover:text-white flex items-center justify-center font-black text-slate-600 transition-all"
                                                            >
                                                                <AiOutlineMinus />
                                                            </button>
                                                            <span className="font-black text-lg text-slate-800 w-12 text-center">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                className="w-10 h-10 rounded-lg bg-white shadow-sm hover:bg-primary hover:text-white flex items-center justify-center font-black text-slate-600 transition-all"
                                                            >
                                                                <AiOutlinePlus />
                                                            </button>
                                                        </div>

                                                        {/* Price */}
                                                        <div className="text-right w-full sm:w-auto">
                                                            <div className="text-2xl font-black text-primary tracking-tight">{(item.price * item.quantity).toLocaleString()}<sup className="text-xs ml-0.5">đ</sup></div>
                                                            {item.quantity > 1 && <div className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">{item.price.toLocaleString()}đ / sản phẩm</div>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary Section */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-[3rem] p-10 shadow-xl shadow-slate-200/40 border border-slate-100 sticky top-28">
                                <h3 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-widest border-b border-slate-50 pb-6 flex items-center gap-3">
                                    <div className="w-1 h-6 bg-primary rounded-full"></div>
                                    Tóm tắt đơn hàng
                                </h3>
                                
                                <div className="space-y-6 mb-8 pb-8 border-b border-slate-50">
                                    <div className="flex justify-between text-slate-500 font-bold text-sm">
                                        <span className="uppercase tracking-widest">Tạm tính ({items.length})</span>
                                        <span className="text-slate-900 font-black">{subtotal.toLocaleString()}đ</span>
                                    </div>
                                    <div className="flex justify-between text-slate-500 font-bold text-sm">
                                        <span className="uppercase tracking-widest">Phí vận chuyển</span>
                                        <span className="text-slate-900 font-black">
                                            {shipping === 0 ? (subtotal === 0 ? '0đ' : 'MIỄN PHÍ') : shipping.toLocaleString() + 'đ'}
                                        </span>
                                    </div>
                                    {subtotal > 0 && shipping === 0 && (
                                        <div className="mt-4 text-[10px] font-black text-teal-600 bg-teal-50 border border-teal-100 px-4 py-3 rounded-2xl flex items-center gap-3 uppercase tracking-[0.1em]">
                                            <div className="w-6 h-6 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0">✨</div>
                                            Đã áp dụng miễn phí vận chuyển!
                                        </div>
                                    )}
                                </div>
                                
                                <div className="flex flex-col gap-2 mb-10">
                                    <span className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Tổng số tiền</span>
                                    <div className="flex items-baseline gap-1">
                                        <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 tracking-tighter">
                                            {total.toLocaleString()}
                                        </div>
                                        <span className="text-xl font-black text-slate-400 uppercase">đ</span>
                                    </div>
                                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Đã bao gồm thuế giá trị gia tăng (VAT)</div>
                                </div>
                                
                                <Link
                                    href="/shop/checkout"
                                    className="flex items-center justify-center gap-4 w-full bg-slate-900 text-white font-black py-6 rounded-[2rem] shadow-2xl shadow-slate-900/20 hover:bg-primary transition-all hover:-translate-y-1 text-lg group"
                                >
                                    THANH TOÁN NGAY
                                    <AiOutlineArrowRight className="text-2xl group-hover:translate-x-1 transition-transform" />
                                </Link>
                                
                                <Link
                                    href="/shop"
                                    className="block w-full text-center text-slate-400 font-black py-4 hover:text-primary transition-colors text-xs uppercase tracking-widest mt-4"
                                >
                                    ← TIẾP TỤC MUA SẮM
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
