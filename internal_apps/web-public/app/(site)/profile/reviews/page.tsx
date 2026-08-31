"use client";

import React from 'react';
import Banner from '@/components/common/Banner';

const REVIEWS = [
    { id: 1, doctor: 'BS. Nguyễn Văn A', specialty: 'Tim mạch', rating: 5, comment: 'Bác sĩ rất tận tâm, giải thích kỹ càng. Phòng khám sạch sẽ, nhân viên thân thiện.', author: 'Trần Thị B', date: '10/12/2024', helpful: 24 },
    { id: 2, doctor: 'BV Đa khoa Quốc tế', specialty: 'Bệnh viện', rating: 4, comment: 'Cơ sở vật chất hiện đại, tuy nhiên thời gian chờ hơi lâu.', author: 'Lê Văn C', date: '08/12/2024', helpful: 15 },
    { id: 3, doctor: 'ThS.BS Phạm Thị D', specialty: 'Nhi khoa', rating: 5, comment: 'Bác sĩ khám rất kỹ cho bé, con mình rất thích. Sẽ quay lại!', author: 'Nguyễn E', date: '05/12/2024', helpful: 31 },
];

export default function ReviewsPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Banner page="others" />
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Đánh giá từ Bệnh nhân</h1>
                    <p className="text-gray-500">Chia sẻ trải nghiệm thực tế từ cộng đồng</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                        <div className="text-4xl font-bold text-primary mb-2">4.8</div>
                        <div className="flex justify-center mb-2">
                            {[1, 2, 3, 4, 5].map(i => <i key={i} className="fi flaticon-star text-yellow-500 text-sm"></i>)}
                        </div>
                        <div className="text-sm text-gray-500">Trung bình</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                        <div className="text-4xl font-bold text-gray-900 mb-2">12,450</div>
                        <div className="text-sm text-gray-500">Tổng đánh giá</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                        <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
                        <div className="text-sm text-gray-500">Hài lòng</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                        <div className="text-4xl font-bold text-blue-600 mb-2">850</div>
                        <div className="text-sm text-gray-500">Bác sĩ được đánh giá</div>
                    </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                    {REVIEWS.map(review => (
                        <div key={review.id} className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">{review.doctor}</h3>
                                    <p className="text-sm text-gray-500">{review.specialty}</p>
                                </div>
                                <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-lg">
                                    {Array(review.rating).fill(0).map((_, i) => <i key={i} className="fi flaticon-star text-yellow-500 text-sm"></i>)}
                                </div>
                            </div>
                            <p className="text-gray-700 leading-relaxed mb-4">{review.comment}</p>
                            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                <div className="flex items-center gap-3 text-sm text-gray-500">
                                    <span className="font-bold text-gray-900">{review.author}</span>
                                    <span>•</span>
                                    <span>{review.date}</span>
                                </div>
                                <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors">
                                    <i className="fi flaticon-like"></i>
                                    <span>Hữu ích ({review.helpful})</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Write Review CTA */}
                <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-12 text-center text-white">
                    <h3 className="text-2xl font-bold mb-4">Bạn đã từng khám tại đây?</h3>
                    <p className="text-blue-100 mb-8">Chia sẻ trải nghiệm để giúp cộng đồng lựa chọn tốt hơn</p>
                    <button className="bg-white text-blue-600 font-bold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors">
                        Viết đánh giá
                    </button>
                </div>
            </div>
        </div>
    );
}
