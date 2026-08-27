'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AiOutlineCheckCircle, AiOutlineLock, AiOutlineArrowRight, AiOutlineQrcode, AiOutlineBank, AiOutlineWallet } from 'react-icons/ai';

function PaymentContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const bookingId = searchParams.get('bookingId');
    
    const [selectedMethod, setSelectedMethod] = useState<string>('vnpay');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (!bookingId) {
            router.push('/booking');
        }
    }, [bookingId, router]);

    const handlePayment = () => {
        setIsProcessing(true);
        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
        }, 2000);
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-[#f8fafc] py-12 flex flex-col items-center justify-center animate-in zoom-in-95 duration-500">
                <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-xl shadow-slate-200 text-center relative overflow-hidden">
                    <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                        <AiOutlineCheckCircle className="text-5xl text-emerald-500" />
                    </div>
                    
                    <h2 className="text-2xl font-black text-slate-900 mb-2 relative z-10">Thanh toán thành công!</h2>
                    <p className="text-slate-500 font-medium mb-8 relative z-10">
                        Mã đặt lịch của bạn là <span className="font-bold text-indigo-600">#{bookingId}</span>
                    </p>
                    
                    <div className="space-y-4 relative z-10">
                        <button 
                            onClick={() => router.push('/profile?tab=bookings')}
                            className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2"
                        >
                            Xem chi tiết lịch hẹn
                            <AiOutlineArrowRight />
                        </button>
                        <button 
                            onClick={() => router.push('/')}
                            className="w-full py-4 bg-slate-50 text-slate-600 rounded-xl font-bold hover:bg-slate-100 transition-all"
                        >
                            Về trang chủ
                        </button>
                    </div>

                    <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-black text-slate-900 mb-2">Thanh toán an toàn</h1>
                    <p className="text-slate-500 font-medium">Hoàn tất thanh toán để xác nhận lịch hẹn #{bookingId}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Payment Methods */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">Phương thức thanh toán</h3>
                            
                            <div className="space-y-3">
                                {/* VNPay */}
                                <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                    selectedMethod === 'vnpay' ? 'border-indigo-600 bg-indigo-50/30' : 'border-slate-100 hover:border-indigo-200'
                                }`}>
                                    <input 
                                        type="radio" 
                                        name="payment" 
                                        value="vnpay" 
                                        checked={selectedMethod === 'vnpay'}
                                        onChange={() => setSelectedMethod('vnpay')}
                                        className="w-5 h-5 text-indigo-600 border-slate-300 focus:ring-indigo-600" 
                                    />
                                    <div className="w-10 h-10 bg-white rounded-lg border border-slate-100 shadow-sm flex items-center justify-center shrink-0">
                                        <AiOutlineQrcode className="text-xl text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800">Thanh toán qua VNPAY-QR</p>
                                        <p className="text-xs text-slate-500">Quét mã QR bằng ứng dụng ngân hàng</p>
                                    </div>
                                </label>

                                {/* Momo */}
                                <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                    selectedMethod === 'momo' ? 'border-indigo-600 bg-indigo-50/30' : 'border-slate-100 hover:border-indigo-200'
                                }`}>
                                    <input 
                                        type="radio" 
                                        name="payment" 
                                        value="momo" 
                                        checked={selectedMethod === 'momo'}
                                        onChange={() => setSelectedMethod('momo')}
                                        className="w-5 h-5 text-indigo-600 border-slate-300 focus:ring-indigo-600" 
                                    />
                                    <div className="w-10 h-10 bg-pink-50 rounded-lg flex items-center justify-center shrink-0">
                                        <AiOutlineWallet className="text-xl text-pink-600" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800">Ví MoMo</p>
                                        <p className="text-xs text-slate-500">Thanh toán an toàn qua ví điện tử</p>
                                    </div>
                                </label>

                                {/* ATM */}
                                <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                    selectedMethod === 'atm' ? 'border-indigo-600 bg-indigo-50/30' : 'border-slate-100 hover:border-indigo-200'
                                }`}>
                                    <input 
                                        type="radio" 
                                        name="payment" 
                                        value="atm" 
                                        checked={selectedMethod === 'atm'}
                                        onChange={() => setSelectedMethod('atm')}
                                        className="w-5 h-5 text-indigo-600 border-slate-300 focus:ring-indigo-600" 
                                    />
                                    <div className="w-10 h-10 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-center shrink-0">
                                        <AiOutlineBank className="text-xl text-slate-600" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800">Thẻ ATM nội địa</p>
                                        <p className="text-xs text-slate-500">Hỗ trợ tất cả các ngân hàng tại Việt Nam</p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Security Notice */}
                        <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                            <AiOutlineLock className="text-emerald-600 text-xl shrink-0 mt-0.5" />
                            <p className="text-xs text-emerald-800 font-medium leading-relaxed">
                                Giao dịch của bạn được mã hóa an toàn 256-bit SSL. Chúng tôi không lưu trữ trực tiếp thông tin thẻ của bạn.
                            </p>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-4">
                        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm sticky top-24">
                            <h3 className="font-bold text-slate-900 uppercase tracking-tight mb-6">Chi tiết đơn hàng</h3>
                            
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-slate-500">Mã đơn</span>
                                    <span className="text-sm font-black text-slate-800">#{bookingId}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-slate-500">Phí khám</span>
                                    <span className="text-sm font-black text-slate-800">300.000đ</span>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                                    <span className="text-sm font-bold text-slate-500">Phí dịch vụ</span>
                                    <span className="text-xs font-black text-emerald-600 uppercase tracking-tighter bg-emerald-50 px-2 py-0.5 rounded-md">Miễn phí</span>
                                </div>
                                <div className="flex justify-between items-end pt-2">
                                    <span className="text-sm font-black text-slate-800">Tổng thanh toán</span>
                                    <div className="text-right">
                                        <p className="text-2xl font-black text-indigo-600 leading-none mb-1">300.000đ</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Đã bao gồm VAT</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handlePayment}
                                disabled={isProcessing}
                                className="w-full mt-8 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isProcessing ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Đang xử lý...
                                    </>
                                ) : (
                                    'Xác nhận thanh toán'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default function PaymentPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#f8fafc]" aria-busy="true" />}>
            <PaymentContent />
        </Suspense>
    );
}
