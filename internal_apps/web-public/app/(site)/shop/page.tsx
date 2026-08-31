'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import HeroBanner from '@/components/shop/HeroBanner';
import SearchBar from '@/components/shop/SearchBar';
import CategoryList from '@/components/shop/CategoryList';
import ProductCard from '@/components/shop/ProductCard';
import shopService, { ShopCategory, ShopProduct } from '@/services/shop.service';
import { MdOutlineHealthAndSafety, MdOutlineSpa, MdOutlinePregnantWoman, MdOutlineMedicalServices, MdVerified } from 'react-icons/md';
import { GiMedicinePills } from 'react-icons/gi';
import { AiOutlineArrowRight, AiOutlineShop } from 'react-icons/ai';

const IconMap: Record<string, React.ElementType> = {
    'flaticon-functional-food': GiMedicinePills,
    'flaticon-medical-equipment': MdOutlineHealthAndSafety,
    'flaticon-beauty-product': MdOutlineSpa,
    'flaticon-mom-and-baby': MdOutlinePregnantWoman,
    'flaticon-healthcare': MdOutlineMedicalServices,
};

const slides = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?auto=format&fit=crop&q=80&w=1600',
        title: 'Chăm sóc sức khỏe toàn diện',
        description: 'Kết nối hàng trăm nhà thuốc uy tín, mang đến sản phẩm chất lượng cao nhất cho gia đình bạn.',
        link: '/shop/products'
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1550573105-09674661906c?auto=format&fit=crop&q=80&w=1600',
        title: 'Dược phẩm chính hãng 100%',
        description: 'Bổ sung dinh dưỡng thiết yếu, nâng cao sức đề kháng với nguồn gốc xuất xứ rõ ràng.',
        link: '/shop/categories/thuc-pham-chuc-nang'
    },
];

const TOP_PHARMACIES = [
    { id: '1', name: 'Pharmacity', image: 'https://www.pharmacity.vn/static/img/logo.png', location: 'Toàn quốc', verified: true },
    { id: '2', name: 'Long Châu', image: 'https://nhathuoclongchau.com.vn/estore-images/logo.png', location: 'Toàn quốc', verified: true },
    { id: '3', name: 'An Khang', image: 'https://www.nhathuocankhang.com/Content/css/images/logo.png', location: 'TP. HCM', verified: true },
    { id: '4', name: 'Phano Pharmacy', image: 'https://phanopharmacy.com/images/logo.png', location: 'Đà Nẵng', verified: true },
];

const TOP_BRANDS = [
    { name: 'Sanofi', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Sanofi_Logo_2022.svg/1200px-Sanofi_Logo_2022.svg.png' },
    { name: 'Nestle', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Nestl%C3%A9_text_logo.svg/1200px-Nestl%C3%A9_text_logo.svg.png' },
    { name: 'Abbott', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Abbott_Laboratories_logo.svg/1200px-Abbott_Laboratories_logo.svg.png' },
    { name: 'Bayer', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Bayer_logo.svg/1200px-Bayer_logo.svg.png' },
];

export default function ShopPage() {
    const [categories, setCategories] = useState<ShopCategory[]>([]);
    const [hotProducts, setHotProducts] = useState<ShopProduct[]>([]);
    const [bestSellingProducts, setBestSellingProducts] = useState<ShopProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [cats, hot, bestSelling] = await Promise.all([
                    shopService.getCategories(),
                    shopService.getHotProducts(),
                    shopService.getBestSellingProducts(),
                ]);
                setCategories(cats);
                setHotProducts(hot);
                setBestSellingProducts(bestSelling);
            } catch (err) {
                console.error('Shop data fetch error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const categoryListData = categories.map(cat => ({
        id: cat.slug,
        title: cat.title,
        image: cat.image || '',
        products: (cat.products || []).map(p => ({
            id: String(p.id),
            title: p.title,
            image: p.image || '',
            price: p.price,
            originalPrice: p.originalPrice ?? undefined,
            discount: p.discount ?? undefined,
            isNew: p.isNew,
            pharmacyName: p.pharmacyName || "Pharmacity",
            pharmacyVerified: p.pharmacyVerified !== false,
            pharmacyId: p.pharmacyId || "1"
        })),
    }));

    return (
        <div className="bg-slate-50/50 min-h-screen pb-20 font-sans">
            <div className="container mx-auto px-4 py-10">
                
                {/* Hero Banner Area */}
                <div className="mb-12 w-full">
                    <HeroBanner slides={slides} />
                </div>

                {/* Marketplace Navigation Bar */}
                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-100 p-8 mb-16 -mt-20 relative z-40 mx-4 md:mx-10">
                    <div className="flex flex-col lg:flex-row items-center gap-8">
                        <div className="w-full lg:w-1/3">
                            <h3 className="text-xl font-black text-slate-800 mb-2">Bạn tìm kiếm gì hôm nay?</h3>
                            <p className="text-slate-500 text-sm font-medium">Khám phá hàng ngàn sản phẩm y tế</p>
                        </div>
                        <div className="w-full lg:w-2/3">
                            <SearchBar />
                        </div>
                    </div>
                </div>

                {/* Category Pills Navigation */}
                <div className="mb-20">
                    <div className="snap-x hide-scrollbar flex overflow-x-auto gap-5 pb-4 pt-2">
                        {(loading ? [
                            { icon: 'flaticon-functional-food', title: 'Thực phẩm chức năng', link: '#' },
                            { icon: 'flaticon-medical-equipment', title: 'Chăm sóc sức khỏe', link: '#' },
                            { icon: 'flaticon-beauty-product', title: 'Làm đẹp', link: '#' },
                            { icon: 'flaticon-mom-and-baby', title: 'Mẹ và bé', link: '#' },
                            { icon: 'flaticon-healthcare', title: 'Thiết bị y tế', link: '#' },
                        ] : categories.map(cat => ({
                            icon: cat.icon || 'flaticon-healthcare',
                            title: cat.title,
                            link: `/shop/categories/${cat.slug}`,
                        }))).map((category, index) => {
                            const IconCmp = IconMap[category.icon] || MdOutlineMedicalServices;
                            return (
                                <Link
                                    key={index}
                                    href={category.link}
                                    className="snap-start flex-shrink-0 flex flex-col items-center gap-4 w-[160px] p-6 bg-white rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all border border-slate-100 hover:border-primary group"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-6 shadow-inner">
                                        <IconCmp className="text-3xl" />
                                    </div>
                                    <span className="font-bold text-sm text-slate-700 group-hover:text-primary transition-colors text-center">
                                        {category.title}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Top Pharmacies - NEW Marketplace Section */}
                <section className="mb-20">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Nhà Thuốc Hàng Đầu</h2>
                            <p className="text-slate-500 text-sm font-medium mt-1">Hệ thống phân phối dược phẩm uy tín</p>
                        </div>
                        <Link href="/shop/pharmacies" className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
                            Tìm nhà thuốc <AiOutlineArrowRight />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {TOP_PHARMACIES.map((pharmacy, idx) => (
                            <Link href={`/shop/pharmacies/${pharmacy.id}`} key={idx} className="group bg-white p-6 rounded-[2rem] shadow-sm hover:shadow-xl transition-all border border-slate-100 flex items-center gap-5 cursor-pointer">
                                <div className="w-20 h-20 rounded-2xl bg-slate-50 p-3 flex items-center justify-center overflow-hidden border border-slate-100 group-hover:scale-105 transition-transform">
                                    <img src={pharmacy.image} alt={pharmacy.name} className="max-w-full max-h-full object-contain" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-1.5">
                                        <h4 className="font-black text-slate-800 text-lg group-hover:text-primary transition-colors">{pharmacy.name}</h4>
                                        {pharmacy.verified && <MdVerified className="text-blue-500" />}
                                    </div>
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-1">{pharmacy.location}</p>
                                    <div className="mt-2 text-xs font-black text-teal-600 flex items-center gap-1">
                                        <AiOutlineShop /> Ghé cửa hàng
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Hot Products Section */}
                <section className="mb-20">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Sản Phẩm <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">Nổi Bật</span></h2>
                            <p className="text-slate-500 text-sm font-medium mt-1">Các mặt hàng được săn đón nhất trong tuần</p>
                        </div>
                        <Link href="/shop/products/hot" className="px-6 py-2.5 rounded-full bg-slate-100 text-slate-600 text-sm font-bold hover:bg-primary hover:text-white transition-all">
                            Xem tất cả
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                        {(hotProducts.length > 0 ? hotProducts : []).slice(0, 5).map((product) => (
                            <ProductCard key={product.id} {...product as any} />
                        ))}
                    </div>
                </section>

                {/* Category Sections */}
                {categoryListData.length > 0 && (
                    <section className="mb-20">
                        <CategoryList categories={categoryListData} />
                    </section>
                )}

                {/* Top Brands */}
                <section className="bg-slate-900 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/20 to-transparent pointer-events-none"></div>
                    <div className="relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">Đối Tác Thương Hiệu</h2>
                            <p className="text-slate-400 text-lg font-medium">Cam kết sản phẩm chính hãng từ các tập đoàn dược phẩm hàng đầu</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center px-4">
                            {TOP_BRANDS.map((brand, index) => (
                                <div key={index} className="group flex items-center justify-center p-8 bg-white/5 backdrop-blur-sm rounded-[2rem] border border-white/10 hover:bg-white transition-all duration-500">
                                    <img
                                        src={brand.image}
                                        alt={brand.name}
                                        className="max-h-12 w-auto object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </div>

            {/* Floating Action Bar */}
            <div className="fixed bottom-10 right-10 z-50 flex flex-col gap-4">
                <Link href="/shop/quick-order" className="group flex items-center gap-3 bg-slate-900 text-white pl-6 pr-4 py-4 rounded-[2rem] shadow-2xl shadow-slate-900/40 hover:bg-primary transition-all hover:-translate-y-2 font-black tracking-tight">
                    <span>MUA NHANH</span>
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-all">
                        <AiOutlineArrowRight className="text-xl" />
                    </div>
                </Link>
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
