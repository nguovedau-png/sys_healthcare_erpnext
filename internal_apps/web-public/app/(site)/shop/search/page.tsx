'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/shop/ProductCard';
import SearchBar from '@/components/shop/SearchBar';

function SearchPageContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    const [isClient, setIsClient] = useState(false);

    useEffect(() => { setIsClient(true); }, []);

    // Placeholder data
    const products = [
        {
            id: 'sp1',
            title: 'Viên Uống Hỗ Trợ Xương Khớp Tâm Bình',
            image: '/shop/products/vitamin-d3.jpg',
            price: 450000,
            originalPrice: 500000,
            discount: 10,
            isNew: true,
        },
        {
            id: 'sp2',
            title: 'Hộp Sữa Bột Anlene Dành Cho Người Già',
            image: '/shop/products/anlene.jpg',
            price: 680000,
            originalPrice: 750000,
            discount: 9,
        },
    ];

    if (!isClient) return null;

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F4F7FB] to-white py-12 font-sans">
            <div className="container mx-auto px-4 max-w-7xl">
                
                <div className="mb-10 max-w-3xl mx-auto text-center animate-fade-in">
                    <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 mb-6 flex flex-col md:flex-row items-center justify-center gap-3">
                        Kết Quả Tìm Kiếm 
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-500">"{query}"</span>
                    </h1>
                    
                    <div className="bg-white p-4 rounded-full shadow-lg border border-gray-100/50">
                        <SearchBar />
                    </div>
                </div>

                <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 min-h-[400px]">
                    {products.length > 0 ? (
                        <>
                            <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
                                <p className="text-gray-500 font-medium">Tìm thấy <span className="font-bold text-gray-900">{products.length}</span> sản phẩm phù hợp</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-gray-500">Sắp xếp:</span>
                                    <select className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-primary focus:border-primary block px-3 py-2 outline-none font-medium cursor-pointer">
                                        <option>Mới nhất</option>
                                        <option>Giá thấp đến cao</option>
                                        <option>Giá cao đến thấp</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                {products.map((product) => (
                                    <ProductCard key={product.id} {...product} />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
                            <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
                                <svg className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy sản phẩm nào!</h2>
                            <p className="text-gray-500 max-w-md text-center">Chúng tôi không tìm thấy kết quả nào phù hợp với từ khóa <span className="font-bold text-gray-700">"{query}"</span>. Vui lòng thử lại với từ khóa khác hoặc dạo mã chung.</p>
                        </div>
                    )}
                </div>
            </div>

            <style jsx global>{`
                .animate-fade-in {
                    animation: fadeIn 0.5s ease-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        }>
            <SearchPageContent />
        </Suspense>
    );
}
