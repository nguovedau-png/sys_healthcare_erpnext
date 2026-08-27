import React from 'react';
import Link from 'next/link';

interface MedicineItem {
    id: number;
    name: string;
    otherName?: string;
    genericName?: string;
    manufacturer?: string;
    composition?: string;
    dosage?: string;
    indications?: string[];
    contraindications?: string;
    sideEffects?: string;
    interactions?: string;
    price?: number;
    image?: string;
    category?: string;
    form?: string;
    unit?: string;
    isPrescription?: boolean;
    activeIngredients?: string;
}

const MedicineCard: React.FC<{ item: MedicineItem }> = ({ item }) => {
    return (
        <div className="bg-white/80 backdrop-blur-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 mb-4 group p-4">
            <div className="flex gap-4 mb-4">
                <div className="w-24 h-24 flex-shrink-0">
                    <Link href={`/medicine/${item.id}`} className="block h-full relative rounded-lg overflow-hidden border border-gray-100 bg-white">
                        <img
                            src={item.image || '/img/default-medicine.jpg'}
                            className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                            alt={item.name}
                        />
                    </Link>
                </div>

                <div className="flex-1 min-w-0">
                    <div className="mb-2">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                            {item.isPrescription && (
                                <span className="text-[10px] font-bold text-red-600 border border-red-600 px-1.5 py-0.5 rounded leading-none">
                                    RX
                                </span>
                            )}
                            {item.category && (
                                <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full leading-none">
                                    {item.category}
                                </span>
                            )}
                        </div>

                        <Link href={`/medicine/${item.id}`} className="block">
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors truncate">
                                {item.name}
                            </h3>
                        </Link>

                        <div className="space-y-0.5 mt-1">
                            {item.genericName && (
                                <p className="text-xs text-gray-500 truncate">
                                    <span className="font-semibold text-gray-700">Hoạt chất:</span> {item.genericName}
                                </p>
                            )}
                            {item.manufacturer && (
                                <p className="text-xs text-gray-500 truncate">
                                    <span className="font-semibold text-gray-700">NSX:</span> {item.manufacturer}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
                {item.price ? (
                    <div className="text-lg font-bold text-blue-600">
                        {item.price.toLocaleString('vi-VN')}đ <span className="text-xs font-normal text-gray-400">/ {item.unit || 'Hộp'}</span>
                    </div>
                ) : (
                    <div className="text-sm text-gray-400 italic font-medium">Liên hệ báo giá</div>
                )}

                <button className="px-4 py-2 bg-primary text-white hover:bg-primary-dark rounded-lg text-sm font-bold shadow-md shadow-primary/20 transition-all duration-200">
                    Thêm vào giỏ
                </button>
            </div>
        </div>
    );    
};

export default MedicineCard;