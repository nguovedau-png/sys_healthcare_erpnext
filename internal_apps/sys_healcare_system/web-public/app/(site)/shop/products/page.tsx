"use client"
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import shopService, { ShopProduct, ShopCategory } from '@/services/shop.service';
import ProductCard from '@/components/shop/ProductCard';
import SearchBar from '@/components/shop/SearchBar';
import { AiOutlineFilter, AiOutlineReload, AiOutlineMedicineBox, AiOutlineAppstore } from 'react-icons/ai';
import { MdOutlineMedicalServices, MdOutlineHealthAndSafety, MdOutlineSpa, MdOutlinePregnantWoman } from 'react-icons/md';
import { GiMedicinePills } from 'react-icons/gi';

const IconMap: Record<string, React.ElementType> = {
    'flaticon-functional-food': GiMedicinePills,
    'flaticon-medical-equipment': MdOutlineHealthAndSafety,
    'flaticon-beauty-product': MdOutlineSpa,
    'flaticon-mom-and-baby': MdOutlinePregnantWoman,
    'flaticon-healthcare': MdOutlineMedicalServices,
};

export default function ProductsPage() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get('category');
    
    const [products, setProducts] = useState<ShopProduct[]>([]);
    const [categories, setCategories] = useState<ShopCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [retryCount, setRetryCount] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
    const [sortBy, setSortBy] = useState('popular');

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [productsData, categoriesData] = await Promise.all([
                shopService.getProducts(selectedCategory ? { categorySlug: selectedCategory } : undefined),
                shopService.getCategories()
            ]);
            
            // If we get empty products but not categories, it might be a temporary API glitch or really empty
            if (productsData.length === 0 && categoriesData.length > 0 && retryCount < 3) {
                throw new Error('No products found, retrying...');
            }

            setProducts(productsData);
            setCategories(categoriesData);
            setLoading(false);
        } catch (err: any) {
            console.error(`Fetch attempt ${retryCount + 1} failed:`, err);
            if (retryCount < 3) {
                // Exponential backoff or simple delay
                setTimeout(() => {
                    setRetryCount(prev => prev + 1);
                }, 1500 * (retryCount + 1));
            } else {
                setError(err.message || 'Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.');
                setLoading(false);
            }
        }
    }, [selectedCategory, retryCount]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Reset retry count when category changes
    useEffect(() => {
        setRetryCount(0);
    }, [selectedCategory]);

    const handleRetry = () => {
        setRetryCount(0);
        fetchProducts();
    };

    return (
        <div className="bg-slate-50/50 min-h-screen pb-32 font-sans">
            <div className="bg-white border-b border-slate-100 pt-16 pb-8 sticky top-0 z-40 shadow-sm">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/20">
                                <AiOutlineAppstore className="text-3xl" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Sản Phẩm <span className="text-primary">Dược Phẩm</span></h1>
                                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] mt-1">Hệ thống phân phối Marketplace</p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3">
                            <SearchBar />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mt-8 overflow-x-auto hide-scrollbar pb-2">
                        <button 
                            onClick={() => setSelectedCategory(null)}
                            className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap ${
                                selectedCategory === null 
                                ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20' 
                                : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600 border border-transparent'
                            }`}
                        >
                            Tất cả sản phẩm
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.slug)}
                                className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap ${
                                    selectedCategory === cat.slug 
                                    ? 'bg-primary text-white shadow-xl shadow-primary/20' 
                                    : 'bg-white text-slate-400 hover:text-primary border border-slate-100 hover:border-primary shadow-sm'
                                }`}
                            >
                                {cat.title}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-7xl mt-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Filters Sidebar */}
                    <div className="hidden lg:block w-72 flex-shrink-0">
                        <div className="sticky top-64 space-y-8">
                            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-premium">
                                <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-3">
                                    <AiOutlineFilter className="text-primary" /> Lọc theo
                                </h3>
                                
                                <div className="space-y-8">
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Sắp xếp theo</p>
                                        <div className="space-y-3">
                                            {[
                                                { id: 'popular', label: 'Phổ biến nhất' },
                                                { id: 'newest', label: 'Mới nhất' },
                                                { id: 'price-asc', label: 'Giá thấp đến cao' },
                                                { id: 'price-desc', label: 'Giá cao đến thấp' }
                                            ].map((opt) => (
                                                <label key={opt.id} className="flex items-center gap-3 cursor-pointer group">
                                                    <input 
                                                        type="radio" 
                                                        name="sort" 
                                                        checked={sortBy === opt.id}
                                                        onChange={() => setSortBy(opt.id)}
                                                        className="hidden" 
                                                    />
                                                    <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${
                                                        sortBy === opt.id ? 'border-primary bg-primary' : 'border-slate-200 group-hover:border-primary'
                                                    }`}>
                                                        {sortBy === opt.id && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                                                    </div>
                                                    <span className={`text-sm font-bold ${sortBy === opt.id ? 'text-slate-900' : 'text-slate-500'}`}>{opt.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className="pt-8 border-t border-slate-50">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Khoảng giá</p>
                                        <div className="space-y-4">
                                            <div className="flex gap-2">
                                                <input type="text" placeholder="Từ" className="w-full bg-slate-50 border-none rounded-xl p-3 text-xs font-bold focus:ring-1 focus:ring-primary/20" />
                                                <input type="text" placeholder="Đến" className="w-full bg-slate-50 border-none rounded-xl p-3 text-xs font-bold focus:ring-1 focus:ring-primary/20" />
                                            </div>
                                            <button className="w-full py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-colors">Áp dụng</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden group cursor-pointer">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                                <AiOutlineMedicineBox className="text-4xl text-primary mb-6 relative z-10" />
                                <h4 className="text-xl font-black mb-2 relative z-10">Tư vấn miễn phí</h4>
                                <p className="text-slate-400 text-xs font-medium leading-relaxed relative z-10">Kết nối với dược sĩ chuyên môn để nhận lời khuyên dùng thuốc an toàn.</p>
                                <button className="mt-8 px-6 py-3 bg-white text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all relative z-10">Hỏi dược sĩ</button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {loading ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className="bg-white rounded-[2rem] p-6 h-[400px] animate-pulse border border-slate-50">
                                        <div className="w-full aspect-square bg-slate-100 rounded-2xl mb-6"></div>
                                        <div className="h-4 bg-slate-100 rounded-full w-2/3 mb-3"></div>
                                        <div className="h-4 bg-slate-100 rounded-full w-full mb-6"></div>
                                        <div className="h-8 bg-slate-100 rounded-full w-1/2"></div>
                                    </div>
                                ))}
                            </div>
                        ) : error ? (
                            <div className="bg-white rounded-[3rem] p-20 text-center border border-slate-100 shadow-premium">
                                <div className="w-24 h-24 bg-rose-50 rounded-3xl flex items-center justify-center text-rose-500 text-4xl mb-8 mx-auto">
                                    ⚠️
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-4">{error}</h3>
                                <p className="text-slate-400 font-medium max-w-md mx-auto mb-10">Đã xảy ra lỗi trong quá trình kết nối với máy chủ. Vui lòng thử lại.</p>
                                <button 
                                    onClick={handleRetry}
                                    className="flex items-center gap-3 px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary transition-all mx-auto shadow-xl shadow-slate-900/20"
                                >
                                    <AiOutlineReload className={retryCount > 0 ? 'animate-spin' : ''} /> Thử lại ngay
                                </button>
                            </div>
                        ) : products.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {products.map((product) => (
                                    <ProductCard key={product.id} {...product as any} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-[3rem] p-20 text-center border border-slate-100">
                                <div className="text-6xl mb-8">🔍</div>
                                <h3 className="text-2xl font-black text-slate-900 mb-2">Không tìm thấy sản phẩm</h3>
                                <p className="text-slate-400 font-medium">Chúng tôi không tìm thấy kết quả nào phù hợp với yêu cầu của bạn.</p>
                                <button 
                                    onClick={() => setSelectedCategory(null)}
                                    className="mt-10 text-primary font-black uppercase tracking-widest text-xs hover:underline"
                                >
                                    Xem tất cả sản phẩm
                                </button>
                            </div>
                        )}
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
