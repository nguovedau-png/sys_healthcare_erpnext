"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';

export default function EventDetailPage() {
    const router = useRouter();
    const params = useParams<{ id: string }>();
    const event = {
        id: params.id,
        title: "Hội thảo Khoa học: Cập nhật điều trị Đái tháo đường 2024",
        time: "08:30 - 11:30 | 25/12/2024",
        location: "Khách sạn Sheraton Saigon / Online Zoom",
        banner: "/img/event-banner.jpg",
        description: "Hội thảo cung cấp các kiến thức mới nhất về phác đồ điều trị Đái tháo đường đái tháo đường type 2, cập nhật từ khuyến cáo ADA 2024.",
        speakers: [
            { name: "GS.TS Nguyễn Văn A", title: "Chủ tịch Hội Nội tiết VN", img: "/img/doctor-1.jpg" },
            { name: "TS.BS Trần Thị B", title: "Trưởng khoa Nội tiết BV ĐHYD", img: "/img/doctor-2.jpg" }
        ],
        agenda: [
            { time: "08:00 - 08:30", content: "Đón khách & Check-in" },
            { time: "08:30 - 09:15", content: "Cập nhật ADA 2024 về quản lý đường huyết - GS.TS Nguyễn Văn A" },
            { time: "09:15 - 10:00", content: "Vai trò của thuốc ức chế SGLT2 - TS.BS Trần Thị B" },
            { time: "10:00 - 10:30", content: "Thảo luận & Hỏi đáp" }
        ]
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
            {/* Banner */}
            <div className="rounded-3xl overflow-hidden aspect-[21/9] bg-gray-200 relative">
                {/* <img src={event.banner} alt={event.title} className="w-full h-full object-cover" /> */}
                <div className="w-full h-full bg-gradient-to-r from-blue-900 to-blue-600 flex items-center justify-center text-white text-4xl font-bold">
                    EVENT BANNER
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h1>
                        <div className="flex flex-wrap gap-4 text-gray-500 text-sm">
                            <span className="flex items-center gap-1"><i className="fi flaticon-calendar"></i> {event.time}</span>
                            <span className="flex items-center gap-1"><i className="fi flaticon-location"></i> {event.location}</span>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-primary pl-3">Giới thiệu</h2>
                        <p className="text-gray-600 leading-relaxed">{event.description}</p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-primary pl-3">Chương trình</h2>
                        <div className="space-y-4">
                            {event.agenda.map((item, idx) => (
                                <div key={idx} className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <span className="font-bold text-primary whitespace-nowrap">{item.time}</span>
                                    <span className="text-gray-700 font-medium">{item.content}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-primary pl-3">Diễn giả</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {event.speakers.map((spk, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl">
                                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">{spk.name[0]}</div>
                                    <div>
                                        <p className="font-bold text-gray-900">{spk.name}</p>
                                        <p className="text-xs text-gray-500">{spk.title}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-4">
                        <div className="text-center mb-6">
                            <p className="text-gray-500 text-sm mb-1">Phí tham dự</p>
                            <p className="text-3xl font-bold text-primary">Miễn phí</p>
                        </div>
                        <Link href={`/events/${params.id}/register`}>
                            <button className="w-full py-3 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary-dark transition transform hover:-translate-y-1 mb-3">
                                Đăng ký ngay
                            </button>
                        </Link>
                        <Link href={`/events/${params.id}/live`}>
                            <button className="w-full py-3 bg-red-100 text-red-600 font-bold rounded-xl hover:bg-red-200 transition flex items-center justify-center gap-2">
                                <i className="fi flaticon-play-button"></i> Vào xem Live
                            </button>
                        </Link>
                        <p className="text-xs text-gray-400 text-center mt-4">Đã có 1,200 người đăng ký</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
