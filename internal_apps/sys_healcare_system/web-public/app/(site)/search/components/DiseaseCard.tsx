import React from 'react';
import Link from 'next/link';

interface DiseaseItem {
    id: number;
    name: string;
    otherName?: string;
    description?: string;
    symptoms?: string;
    causes?: string;
    treatment?: string;
    prevention?: string;
    severity?: string;
    category?: string;
    affectedAge?: string;
    isContagious?: boolean;
    duration?: string;
    thumbnail?: string;
}

const DiseaseCard: React.FC<{ item: DiseaseItem }> = ({ item }) => {
    return (
        <div className="bg-white/80 backdrop-blur-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 mb-4 group p-4">
            <div className="flex gap-4 mb-4">
                <div className="w-24 h-24 flex-shrink-0">
                    <Link href={`/disease/${item.id}`} className="block h-full relative rounded-lg overflow-hidden border border-gray-100">
                        <img
                            src={item.thumbnail || '/img/default-disease.jpg'}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            alt={item.name}
                        />
                    </Link>
                </div>

                <div className="flex-1 min-w-0">
                    <div className="mb-2">
                        {item.category && (
                            <span className="inline-block text-xs font-semibold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full mb-1">
                                {item.category}
                            </span>
                        )}
                        <Link href={`/disease/${item.id}`} className="block">
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors truncate">
                                {item.name}
                            </h3>
                        </Link>
                        {item.otherName && (
                            <p className="text-sm text-gray-500 italic mb-1 truncate">{item.otherName}</p>
                        )}
                        <p className="text-sm text-gray-500 line-clamp-2">
                            {item.description}
                        </p>
                    </div>
                </div>
            </div>

            <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                    {item.isContagious && (
                        <span className="flex items-center text-orange-500 bg-orange-50 px-2 py-1 rounded-md">
                            <i className="fi flaticon-alert mr-1"></i> Lây lan
                        </span>
                    )}
                    {item.severity && (
                        <span className="flex items-center bg-gray-50 px-2 py-1 rounded-md">
                            <span className="mr-1.5">{item.severity === 'Nguy hiểm' ? '🔴' : '🟡'}</span>
                            {item.severity}
                        </span>
                    )}
                </div>

                <Link
                    href={`/disease/${item.id}`}
                    className="text-sm font-bold text-primary hover:underline flex items-center bg-primary/5 px-3 py-1.5 rounded-lg transition-colors"
                >
                    Xem chi tiết <i className="fi flaticon-right-arrow text-[10px] ml-1.5"></i>
                </Link>
            </div>
        </div>
    );
};

export default DiseaseCard;