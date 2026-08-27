'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import shopService, { Pharmacy, ShopProduct } from '@/services/shop.service';
import ProductCard from '@/components/shop/ProductCard';
import Link from 'next/link';
import { AiOutlineShop, AiOutlineEnvironment, AiOutlineStar, AiOutlineInfoCircle } from 'react-icons/ai';
import { MdVerified } from 'react-icons/md';

export default function PharmacyDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [pharmacy, setPharmacy] = useState<Pharmacy | null>(null);
    const [products, setProducts] = useState<ShopProduct[]>([]);
    const [loading, setLoading] = useState(true);

    const handleChatClick = () => {
        router.push(`/chat?userId=pharmacy_${id}`);
    };

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                const [pharmacyData, productsData] = await Promise.all([
                    shopService.getPharmacyDetail(id),
                    shopService.getProducts({ pharmacyId: id }),
                ]);

                if (pharmacyData) {
                    setPharmacy(pharmacyData);
                }
                setProducts(productsData);
            } catch (err) {
                console.error('Error fetching pharmacy or products:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50/50 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!pharmacy) {
        return (
            <div className="min-h-screen bg-slate-50/50 flex flex-col items-center justify-center py-20">
                <h2 className="text-2xl font-black text-slate-900 mb-4">Không tìm thấy nhà thuốc!</h2>
                <Link href="/shop" className="text-primary font-bold hover:underline">Quay lại Shop</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50/50 pb-24 font-sans">
            {/* Pharmacy Header / Cover */}
            <div className="relative h-[300px] lg:h-[400px] bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 opacity-40">
                    <img 
                        src={pharmacy.coverImage || 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&q=80&w=1600'} 
                        alt="" 
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
            </div>

            <div className="container mx-auto px-4 max-w-7xl -mt-32 relative z-10">
                {/* Pharmacy Info Card */}
                <div className="bg-white rounded-[3rem] p-8 lg:p-12 shadow-2xl shadow-slate-200/40 border border-slate-100 mb-12">
                    <div className="flex flex-col lg:flex-row gap-10 items-start lg:items-center">
                        <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-[2.5rem] bg-white p-6 shadow-xl border border-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                            <img src={pharmacy.logo} alt={pharmacy.name} className="max-w-full max-h-full object-contain" />
                        </div>
                        
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                                <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">{pharmacy.name}</h1>
                                {pharmacy.verified && <MdVerified className="text-3xl text-blue-500" />}
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="flex items-center gap-3 text-slate-500 font-bold">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                        <AiOutlineEnvironment className="text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 uppercase tracking-widest">Địa chỉ</p>
                                        <p className="text-slate-700">{pharmacy.address}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-slate-500 font-bold">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-amber-500">
                                        <AiOutlineStar className="text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 uppercase tracking-widest">Đánh giá</p>
                                        <p className="text-slate-700">{pharmacy.rating} / 5.0 (2.5k+ đánh giá)</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-slate-500 font-bold">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-primary">
                                        <AiOutlineShop className="text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 uppercase tracking-widest">Sản phẩm</p>
                                        <p className="text-slate-700">{products.length} mặt hàng đang bán</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 w-full lg:w-auto">
                            <button className="flex-1 lg:flex-none px-8 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-primary transition-all shadow-xl shadow-slate-900/20 uppercase tracking-widest text-sm">
                                Theo dõi
                            </button>
                            <button 
                                onClick={handleChatClick}
                                className="flex-1 lg:flex-none px-8 py-4 bg-white border-2 border-slate-100 text-slate-900 font-black rounded-2xl hover:border-primary hover:text-primary transition-all uppercase tracking-widest text-sm"
                            >
                                Chat ngay
                            </button>
                        </div>
                    </div>

                    <div className="mt-12 pt-12 border-t border-slate-50 flex flex-col lg:flex-row gap-8 items-start">
                        <div className="flex-1">
                            <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                                <AiOutlineInfoCircle className="text-primary" /> Giới thiệu nhà thuốc
                            </h3>
                            <p className="text-slate-500 font-medium leading-relaxed">
                                {pharmacy.description || `${pharmacy.name} là hệ thống nhà thuốc uy tín với tiêu chuẩn GPP. Chúng tôi cam kết mang đến những sản phẩm dược phẩm chính hãng, chất lượng cao nhất cho cộng đồng.`}
                            </p>
                        </div>
                        <div className="w-full lg:w-1/3 bg-slate-50 rounded-3xl p-6 border border-slate-100">
                            <h4 className="text-sm font-black text-slate-900 mb-4 uppercase tracking-widest">Thông tin bổ sung</h4>
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm font-bold">
                                    <span className="text-slate-400">Giờ làm việc</span>
                                    <span className="text-slate-700">06:00 - 23:30</span>
                                </div>
                                <div className="flex justify-between text-sm font-bold">
                                    <span className="text-slate-400">Phản hồi</span>
                                    <span className="text-teal-600">Trong 5 phút</span>
                                </div>
                                <div className="flex justify-between text-sm font-bold">
                                    <span className="text-slate-400">Tham gia</span>
                                    <span className="text-slate-700">2 năm trước</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="mb-12">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Sản Phẩm <span className="text-primary">Đang Bán</span></h2>
                            <p className="text-slate-500 font-medium mt-2">Khám phá các mặt hàng tại {pharmacy.name}</p>
                        </div>
                        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest px-4">Sắp xếp</span>
                            <select className="bg-slate-50 border-none rounded-xl text-sm font-bold text-slate-700 focus:ring-0 cursor-pointer py-2 px-4 outline-none">
                                <option>Phổ biến nhất</option>
                                <option>Mới nhất</option>
                                <option>Giá: Thấp đến Cao</option>
                                <option>Giá: Cao đến Thấp</option>
                            </select>
                        </div>
                    </div>

                    {products.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                            {products.map((product) => (
                                <ProductCard 
                                    key={product.id} 
                                    {...product as any}
                                    pharmacyName={pharmacy.name}
                                    pharmacyVerified={pharmacy.verified}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-[3rem] p-20 text-center border border-slate-100">
                            <h3 className="text-2xl font-black text-slate-900 mb-2">Chưa có sản phẩm nào</h3>
                            <p className="text-slate-400 font-medium">Nhà thuốc này hiện chưa cập nhật sản phẩm lên Marketplace.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
