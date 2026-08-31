'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/store/CartContext';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';

interface Address {
    id: string;
    fullName: string;
    phone: string;
    address: string;
    province: string;
    district: string;
    ward: string;
    isDefault: boolean;
}

const initialPaymentMethods = [
    {
        id: 'cod',
        name: 'Thanh toán khi nhận hàng',
        description: 'Thanh toán bằng tiền mặt khi giao hàng',
        icon: '💵'
    },
    {
        id: 'bank-transfer',
        name: 'Chuyển khoản ngân hàng',
        description: 'Chuyển khoản qua tài khoản ứng dụng ngân hàng',
        icon: '🏦'
    },
    {
        id: 'momo',
        name: 'Ví MoMo',
        description: 'Thanh toán quét mã QR qua ví điện tử MoMo',
        icon: '📱'
    },
];

export default function CheckoutPage() {
    const { items, getTotalPrice, clearCart } = useCart();
    const { user, isAuthenticated } = useAuth();
    const [selectedPayment, setSelectedPayment] = useState(initialPaymentMethods[0].id);
    const [cartItems, setCartItems] = useState(items);
    const [isProcessing, setIsProcessing] = useState(false);
    const router = useRouter();

    // Sync with cart context
    useEffect(() => {
        if (!isAuthenticated && !isProcessing) {
            // Optional: redirect to login
        }
        setCartItems(items);
    }, [items, isAuthenticated, isProcessing]);

    const [addresses, setAddresses] = useState<Address[]>([
        {
            id: 'addr1',
            fullName: 'Nguyễn Văn A',
            phone: '0901234567',
            address: '123 Đường Láng',
            province: 'Hà Nội',
            district: 'Đống Đa',
            ward: 'Láng Thượng',
            isDefault: true
        }
    ]);

    const [selectedAddressId, setSelectedAddressId] = useState<string>('addr1');
    const [isAddingAddress, setIsAddingAddress] = useState(false);

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        address: '',
        province: '',
        district: '',
        ward: '',
        note: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddAddress = () => {
        if (!formData.fullName || !formData.phone || !formData.address) {
            alert('Vui lòng điền đầy đủ thông tin bắt buộc');
            return;
        }

        const newAddress: Address = {
            id: `addr${Date.now()}`,
            fullName: formData.fullName,
            phone: formData.phone,
            address: formData.address,
            province: formData.province,
            district: formData.district,
            ward: formData.ward,
            isDefault: addresses.length === 0
        };

        setAddresses([...addresses, newAddress]);
        setSelectedAddressId(newAddress.id);
        setIsAddingAddress(false);
        setFormData(prev => ({
            ...prev,
            fullName: '',
            phone: '',
            address: '',
            province: '',
            district: '',
            ward: ''
        }));
    };

    const subtotal = getTotalPrice();
    const shippingFee = subtotal > 500000 || subtotal === 0 ? 0 : 30000;
    const total = subtotal + shippingFee;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN').format(price);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            alert('Giỏ hàng trống!');
            return;
        }

        const selectedAddr = addresses.find(a => a.id === selectedAddressId);
        if (!selectedAddr) {
            alert('Vui lòng chọn địa chỉ giao hàng');
            return;
        }

        setIsProcessing(true);

        try {
            const orderData = {
                userId: user?.userId || 'user_123',
                shippingAddress: selectedAddr,
                paymentMethod: selectedPayment,
                items: cartItems.map(item => ({ id: item.id, quantity: item.quantity, price: item.price })),
                amount: total,
                note: formData.note,
                currency: 'VND'
            };

            const response = await fetch('http://localhost:3000/v1/payments/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                const result = await response.json();
                clearCart();
                alert(`Đặt hàng thành công! Mã giao dịch: ${result.transactionId}`);
                router.push('/profile?tab=orders');
            } else {
                throw new Error('Payment failed');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="bg-gradient-to-b from-[#F4F7FB] to-white min-h-screen pb-20 pt-10 font-sans">
            <div className="container mx-auto px-4">
                
                <div className="mb-10">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 border-b border-gray-200 pb-4">
                        Tiến Hành <span className="text-primary">Thanh Toán</span>
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-wrap -mx-4">
                    <div className="w-full lg:w-2/3 px-4">
                        
                        {/* Shipping Information Container */}
                        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 mb-8">
                            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-50">
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Thông tin giao hàng
                                </h2>
                                {!isAddingAddress && (
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-primary/10 text-primary rounded-xl text-sm font-bold hover:bg-primary hover:text-white transition-all"
                                        onClick={() => setIsAddingAddress(true)}
                                    >
                                        + Thêm địa chỉ mới
                                    </button>
                                )}
                            </div>

                            {!isAddingAddress ? (
                                <div className="space-y-4">
                                    {addresses.map(addr => (
                                        <label key={addr.id} className={`flex gap-4 p-5 rounded-lg cursor-pointer transition-all border-2 ${selectedAddressId === addr.id ? 'border-primary bg-primary/5 shadow-sm' : 'border-gray-100 hover:border-gray-300'}`}>
                                            <div className="pt-1">
                                                <input
                                                    type="radio"
                                                    name="shippingAddress"
                                                    value={addr.id}
                                                    checked={selectedAddressId === addr.id}
                                                    onChange={() => setSelectedAddressId(addr.id)}
                                                    className="w-5 h-5 text-primary border-gray-300 focus:ring-primary focus:ring-2 mt-0.5"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <p className="font-bold text-gray-900 text-lg">{addr.fullName}</p>
                                                    <span className="text-gray-300">|</span>
                                                    <p className="font-semibold text-gray-700">{addr.phone}</p>
                                                    {addr.isDefault && <span className="ml-auto px-3 py-1 bg-gradient-to-r from-orange-100 to-red-100 text-xs font-bold text-red-600 rounded-full border border-red-200">Mặc định</span>}
                                                </div>
                                                <p className="text-gray-500 leading-relaxed">
                                                    {addr.address}, {addr.ward}, {addr.district}, {addr.province}
                                                </p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            ) : (
                                <div className="animate-fade-in bg-gray-50/50 p-6 rounded-lg border border-gray-100">
                                    <h3 className="font-bold text-gray-900 mb-5 text-lg">Thêm địa chỉ mới</h3>
                                    <div className="flex flex-wrap -mx-2">
                                        
                                        <div className="w-full md:w-1/2 px-2 mb-5">
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="fullName" className="text-sm font-semibold text-gray-700">Họ và tên *</label>
                                                <input
                                                    type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                                    placeholder="Nhập họ và tên"
                                                />
                                            </div>
                                        </div>

                                        <div className="w-full md:w-1/2 px-2 mb-5">
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="phone" className="text-sm font-semibold text-gray-700">Số điện thoại *</label>
                                                <input
                                                    type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                                    placeholder="Ví dụ: 0912345678"
                                                />
                                            </div>
                                        </div>

                                        <div className="w-full px-2 mb-5">
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="address" className="text-sm font-semibold text-gray-700">Địa chỉ cụ thể *</label>
                                                <input
                                                    type="text" id="address" name="address" value={formData.address} onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                                    placeholder="Số nhà, Tên đường"
                                                />
                                            </div>
                                        </div>

                                        <div className="w-full md:w-1/3 px-2 mb-5">
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="province" className="text-sm font-semibold text-gray-700">Tỉnh/Thành phố *</label>
                                                <select
                                                    id="province" name="province" value={formData.province} onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none cursor-pointer"
                                                >
                                                    <option value="">Chọn Tỉnh/Thành</option>
                                                    <option value="Hà Nội">Hà Nội</option>
                                                    <option value="Hồ Chí Minh">TP. Hồ Chí Minh</option>
                                                    <option value="Đà Nẵng">Đà Nẵng</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="w-full md:w-1/3 px-2 mb-5">
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="district" className="text-sm font-semibold text-gray-700">Quận/Huyện *</label>
                                                <select
                                                    id="district" name="district" value={formData.district} onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none cursor-pointer"
                                                >
                                                    <option value="">Chọn Quận/Huyện</option>
                                                    <option value="Quận 1">Quận 1</option>
                                                    <option value="Ba Đình">Ba Đình</option>
                                                    <option value="Cầu Giấy">Cầu Giấy</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="w-full md:w-1/3 px-2 mb-6">
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="ward" className="text-sm font-semibold text-gray-700">Phường/Xã *</label>
                                                <select
                                                    id="ward" name="ward" value={formData.ward} onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none cursor-pointer"
                                                >
                                                    <option value="">Chọn Phường/Xã</option>
                                                    <option value="Phường 1">Phường 1</option>
                                                    <option value="Láng Thượng">Láng Thượng</option>
                                                    <option value="Dịch Vọng">Dịch Vọng</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="w-full px-2 flex justify-end gap-3 pt-4 border-t border-gray-200">
                                            <button type="button" className="px-6 py-2.5 bg-white border border-gray-200 font-bold text-gray-700 rounded-xl hover:bg-gray-50 transition-colors" onClick={() => setIsAddingAddress(false)}>Hủy</button>
                                            <button type="button" className="px-6 py-2.5 bg-primary font-bold text-white rounded-xl hover:bg-teal transition-all shadow-md shadow-primary/20" onClick={handleAddAddress}>Lưu địa chỉ</button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="note" className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Ghi chú đơn hàng (tuỳ chọn)
                                    </label>
                                    <textarea
                                        id="note" name="note" value={formData.note} onChange={handleInputChange} rows={3}
                                        className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                                        placeholder="Ví dụ: Giao hàng vào giờ hành chính..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Methods Container */}
                        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 mb-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 pb-4 border-b border-gray-50">
                                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                                Phương thức thanh toán
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {initialPaymentMethods.map((method) => (
                                    <label
                                        key={method.id}
                                        className={`flex items-start gap-4 p-5 rounded-lg cursor-pointer transition-all border-2 ${selectedPayment === method.id ? 'border-primary bg-primary/5 shadow-sm' : 'border-gray-100 hover:border-gray-300'}`}
                                    >
                                        <input
                                            type="radio" name="payment" value={method.id} checked={selectedPayment === method.id} onChange={(e) => setSelectedPayment(e.target.value)}
                                            className="mt-1 w-5 h-5 text-primary border-gray-300 focus:ring-primary focus:ring-2"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-1.5">
                                                <span className="text-2xl drop-shadow-sm">{method.icon}</span>
                                                <span className="font-bold text-gray-900">{method.name}</span>
                                            </div>
                                            <p className="text-sm text-gray-500">{method.description}</p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="w-full lg:w-1/3 px-4">
                        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100/50 sticky top-28">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Chi Tiết Đơn Hàng</h2>

                            <div className="max-h-[350px] overflow-y-auto pr-2 mb-6 space-y-5 custom-scrollbar">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4 group">
                                        <div className="relative w-20 h-20 flex-shrink-0 border border-gray-100 bg-gray-50 rounded-xl overflow-hidden shadow-sm">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-contain p-2"
                                            />
                                            <div className="absolute top-0 right-0 bg-gray-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-bl-lg">
                                                x{item.quantity}
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0 pr-1 flex flex-col justify-center">
                                            <h3 className="text-sm font-bold text-gray-900 line-clamp-2 mb-1 leading-snug group-hover:text-primary transition-colors">{item.title}</h3>
                                            <div className="font-bold text-primary mt-1">
                                                {formatPrice(item.price * item.quantity)}<sup className="text-xs">đ</sup>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-6 border-t border-gray-100 mb-8 space-y-4">
                                <div className="flex justify-between text-base font-medium text-gray-600">
                                    <span>Tạm tính</span>
                                    <span className="font-bold text-gray-900">{formatPrice(subtotal)}đ</span>
                                </div>

                                <div className="flex justify-between text-base font-medium text-gray-600">
                                    <span>Phí vận chuyển</span>
                                    <span className="font-bold text-gray-900">{shippingFee === 0 ? <span className="text-teal-600">Miễn phí</span> : formatPrice(shippingFee) + 'đ'}</span>
                                </div>

                                <div className="flex justify-between items-end pt-5 mt-3 border-t border-gray-100">
                                    <span className="font-bold text-gray-900 text-lg">Tổng cộng</span>
                                    <div className="text-right">
                                        <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-500">{formatPrice(total)}</span><span className="text-xl font-bold text-primary ml-1">đ</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isProcessing}
                                className={`w-full py-4 text-white text-lg font-bold rounded-xl transition-all shadow-lg shadow-teal-500/30 flex justify-center items-center ${isProcessing ? 'bg-gray-400 opacity-80 cursor-not-allowed' : 'bg-gradient-to-r from-primary to-teal-500 hover:shadow-xl hover:shadow-teal-500/40 hover:-translate-y-0.5'}`}
                            >
                                {isProcessing ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Đang xử lý thanh toán...
                                    </>
                                ) : (
                                   <>Xác Nhận Đặt Hàng <span className="ml-2">→</span></>
                                )}
                            </button>

                            <Link href="/shop/cart" className="block w-full text-center mt-4 py-3 text-primary font-bold rounded-xl hover:bg-primary/5 transition-colors">
                                ← Quay lại giỏ hàng
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
