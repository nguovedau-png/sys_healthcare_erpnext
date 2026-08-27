"use client";
import React, { useState } from 'react';
import { useParams } from 'next/navigation';

export default function SeminarDetailPage() {
    const params = useParams();
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [showQRCode, setShowQRCode] = useState(false);
    const [registrationData, setRegistrationData] = useState({
        name: '',
        email: '',
        phone: '',
        workplace: '',
    });

    const seminar = {
        id: params.id,
        title: 'Hội thảo Dược lâm sàng 2024',
        date: '2024-12-25',
        time: '08:00 - 17:00',
        location: 'Khách sạn Rex, TP.HCM',
        address: '141 Nguyễn Huệ, Quận 1, TP.HCM',
        banner: '/img/seminar-1.jpg',
        description: 'Hội thảo cập nhật kiến thức mới nhất về dược lâm sàng, tương tác thuốc và điều trị hợp lý.',
        capacity: 300,
        registrations: 245,
        speakers: [
            { name: 'GS.TS Nguyễn Văn A', title: 'Trưởng khoa Dược, BV Chợ Rẫy', photo: '/img/speaker-1.jpg' },
            { name: 'PGS.TS Trần Thị B', title: 'Phó Giám đốc BV 115', photo: '/img/speaker-2.jpg' },
        ],
        sessions: [
            { time: '08:00 - 08:30', topic: 'Đăng ký & Khai mạc', speaker: '' },
            { time: '08:30 - 10:00', topic: 'Tương tác thuốc trong điều trị đa bệnh', speaker: 'GS.TS Nguyễn Văn A' },
            { time: '10:00 - 10:15', topic: 'Nghỉ giải lao', speaker: '' },
            { time: '10:15 - 12:00', topic: 'Kháng sinh hợp lý', speaker: 'PGS.TS Trần Thị B' },
            { time: '12:00 - 13:00', topic: 'Nghỉ trưa', speaker: '' },
            { time: '13:00 - 15:00', topic: 'Thảo luận ca bệnh', speaker: 'Tất cả diễn giả' },
            { time: '15:00 - 17:00', topic: 'Hỏi đáp & Bế mạc', speaker: '' },
        ],
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate registration
        setShowRegistrationForm(false);
        setShowQRCode(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                {/* Banner */}
                <div className="rounded-2xl overflow-hidden mb-8">
                    <img
                        src={seminar.banner}
                        alt={seminar.title}
                        className="w-full h-96 object-cover"
                        onError={(e) => (e.target as HTMLImageElement).src = '/styles/img/banner/banner-1.jpg'}
                    />
                </div>

                {/* Title & Info */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">{seminar.title}</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="flex items-start gap-3">
                            <i className="fi flaticon-calendar text-primary text-2xl"></i>
                            <div>
                                <p className="font-bold text-gray-900">Thời gian</p>
                                <p className="text-gray-600">{seminar.date}</p>
                                <p className="text-gray-600">{seminar.time}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <i className="fi flaticon-location text-primary text-2xl"></i>
                            <div>
                                <p className="font-bold text-gray-900">Địa điểm</p>
                                <p className="text-gray-600">{seminar.location}</p>
                                <p className="text-gray-600 text-sm">{seminar.address}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Số lượng đăng ký</span>
                            <span className="font-bold text-gray-900">{seminar.registrations}/{seminar.capacity}</span>
                        </div>
                        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary"
                                style={{ width: `${(seminar.registrations / seminar.capacity) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowRegistrationForm(true)}
                        className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition text-lg"
                    >
                        Đăng ký tham dự
                    </button>
                </div>

                {/* Description */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Giới thiệu</h2>
                    <p className="text-gray-700 leading-relaxed">{seminar.description}</p>
                </div>

                {/* Speakers */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Diễn giả</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {seminar.speakers.map((speaker, idx) => (
                            <div key={idx} className="flex items-center gap-4">
                                <img
                                    src={speaker.photo}
                                    alt={speaker.name}
                                    className="w-20 h-20 rounded-full object-cover"
                                    onError={(e) => (e.target as HTMLImageElement).src = '/styles/img/banner/banner-1.jpg'}
                                />
                                <div>
                                    <p className="font-bold text-gray-900">{speaker.name}</p>
                                    <p className="text-sm text-gray-600">{speaker.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Schedule */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Chương trình</h2>
                    <div className="space-y-4">
                        {seminar.sessions.map((session, idx) => (
                            <div key={idx} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0">
                                <div className="w-32 flex-shrink-0">
                                    <p className="font-bold text-primary">{session.time}</p>
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-gray-900">{session.topic}</p>
                                    {session.speaker && <p className="text-sm text-gray-600">{session.speaker}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Registration Form Modal */}
                {showRegistrationForm && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Đăng ký tham dự</h3>
                            <form onSubmit={handleRegister} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Họ và tên *</label>
                                    <input
                                        type="text"
                                        required
                                        value={registrationData.name}
                                        onChange={(e) => setRegistrationData({ ...registrationData, name: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                                    <input
                                        type="email"
                                        required
                                        value={registrationData.email}
                                        onChange={(e) => setRegistrationData({ ...registrationData, email: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Số điện thoại *</label>
                                    <input
                                        type="tel"
                                        required
                                        value={registrationData.phone}
                                        onChange={(e) => setRegistrationData({ ...registrationData, phone: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Nơi làm việc</label>
                                    <input
                                        type="text"
                                        value={registrationData.workplace}
                                        onChange={(e) => setRegistrationData({ ...registrationData, workplace: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>
                                <div className="flex gap-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setShowRegistrationForm(false)}
                                        className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200"
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark"
                                    >
                                        Xác nhận đăng ký
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* QR Code Modal */}
                {showQRCode && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fi flaticon-checked text-green-600 text-3xl"></i>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Đăng ký thành công!</h3>
                            <p className="text-gray-600 mb-6">Vui lòng lưu QR Code để check-in tại sự kiện</p>

                            {/* QR Code */}
                            <div className="bg-gray-100 p-8 rounded-2xl mb-6">
                                <div className="w-64 h-64 bg-white mx-auto flex items-center justify-center border-4 border-gray-200">
                                    <p className="text-gray-400 text-sm">QR Code<br />#{params.id}-{Date.now()}</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark">
                                    Tải QR Code
                                </button>
                                <button
                                    onClick={() => setShowQRCode(false)}
                                    className="w-full py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200"
                                >
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
