'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import shopService, { ShopCategory, ShopProduct } from '@/services/shop.service';
import ProductCard from '@/components/shop/ProductCard';
import Link from 'next/link';
import { MdOutlineMedicalServices } from 'react-icons/md';
import { AiOutlineArrowRight, AiOutlineFilter, AiOutlineSortAscending } from 'react-icons/ai';

export default function CategoryProductsPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;

    const [category, setCategory] = useState<ShopCategory | null>(null);
    const [products, setProducts] = useState<ShopProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        const fetchData = async () => {
            try {
                // Fetch the list of categories to find the match
                const [categoriesData, productsData] = await Promise.all([
                    shopService.getCategories(),
                    shopService.getProducts({ categorySlug: slug }),
                ]);

                const foundCategory = categoriesData.find(c => c.slug === slug);
                if (foundCategory) {
                    setCategory(foundCategory);
                } else {
                    // Category not found handling
                    setCategory({
                        id: 0,
                        slug: slug,
                        title: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
                    });
                }
                
                setProducts(productsData);
            } catch (err) {
                console.error('Error fetching category or products:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50/50 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50/50 pb-24 font-sans">
            <div className="container mx-auto px-4 max-w-7xl pt-12">
                
                {/* Breadcrumb Navigation */}
                <nav className="mb-10 flex items-center text-sm font-bold">
                    <Link href="/shop" className="text-slate-400 hover:text-primary transition-colors">Shop</Link>
                    <span className="mx-3 text-slate-300">/</span>
                    <span className="text-slate-900">{category?.title || 'Danh mục'}</span>
                </nav>

                {/* Category Header */}
                <div className="mb-16 relative overflow-hidden bg-slate-900 rounded-[3rem] p-12 lg:p-16 shadow-2xl shadow-slate-200">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/20 to-transparent pointer-events-none"></div>
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
                        <div className="text-center md:text-left">
                            <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/10 backdrop-blur-md rounded-full text-teal-400 font-black text-[10px] uppercase tracking-widest mb-6 border border-white/5">
                                <MdOutlineMedicalServices className="text-lg" />
                                Chuyên mục sức khỏe
                            </div>
                            <h1 className="text-4xl lg:text-6xl font-black text-white tracking-tighter leading-tight mb-4">
                                {category?.title}
                            </h1>
                            <p className="text-slate-400 text-lg font-medium max-w-xl">
                                Khám phá các giải pháp chăm sóc sức khỏe tốt nhất từ những nhà sản xuất và nhà thuốc hàng đầu.
                            </p>
                        </div>
                        <div className="hidden lg:block w-48 h-48 bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/10 p-10 transform rotate-12">
                            <MdOutlineMedicalServices className="w-full h-full text-white/20" />
                        </div>
                    </div>
                </div>

                {/* Toolbar & Filters */}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-12">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Danh sách sản phẩm</h2>
                        <span className="px-3 py-1 bg-slate-200 text-slate-600 rounded-lg text-xs font-black">{products.length} MẶT HÀNG</span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
                            <div className="flex items-center gap-2 px-4 border-r border-slate-100">
                                <AiOutlineSortAscending className="text-slate-400" />
                                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Sắp xếp</span>
                            </div>
                            <select className="bg-white border-none rounded-xl text-sm font-bold text-slate-700 focus:ring-0 cursor-pointer py-2 px-4 outline-none">
                                <option>Phổ biến</option>
                                <option>Mới nhất</option>
                                <option>Giá thấp</option>
                                <option>Giá cao</option>
                            </select>
                        </div>
                        
                        <button className="flex items-center gap-2 px-6 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm font-black text-xs uppercase tracking-widest text-slate-900 hover:border-primary hover:text-primary transition-all">
                            <AiOutlineFilter className="text-lg" /> Bộ lọc
                        </button>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="min-h-[500px]">
                    {products.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                            {products.map((product) => (
                                <ProductCard 
                                    key={product.id} 
                                    {...product as any}
                                    pharmacyName={product.pharmacyName || "Pharmacity"}
                                    pharmacyVerified={product.pharmacyVerified !== false}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-[3rem] p-24 text-center border border-slate-100 shadow-sm flex flex-col items-center">
                            <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center mb-10 shadow-inner">
                                <MdOutlineMedicalServices className="text-5xl text-slate-200" />
                            </div>
                            <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Chưa có sản phẩm</h2>
                            <p className="text-slate-400 font-medium max-w-md mx-auto text-lg mb-12">
                                Rất tiếc, hiện tại chuyên mục này chưa có sản phẩm. Vui lòng quay lại sau.
                            </p>
                            <Link href="/shop" className="inline-flex items-center gap-3 bg-slate-900 text-white font-black px-10 py-5 rounded-[2rem] hover:bg-primary transition-all shadow-2xl shadow-slate-900/20 uppercase tracking-widest text-sm group">
                                Quay lại Shop
                                <AiOutlineArrowRight className="text-xl group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
