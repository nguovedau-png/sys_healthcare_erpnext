"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import liveService, { LiveProvider } from '@/services/live.service';

export default function CreateLiveSessionPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        provider: LiveProvider.WEBRTC,
        providerConfig: {}
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await liveService.createLiveSession(formData);
            router.push('/live');
        } catch (error) {
            alert('Lỗi khi tạo buổi live');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/live" className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition text-gray-600">
                    <i className="fi flaticon-left-arrow"></i>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Tạo buổi Live mới</h1>
                    <p className="text-gray-500 text-sm mt-1">Thiết lập thông tin và chọn nền tảng phát sóng.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Tiêu đề buổi live <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition"
                        placeholder="Nhập tiêu đề..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Mô tả</label>
                    <textarea
                        name="description"
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition resize-none"
                        placeholder="Mô tả nội dung buổi live..."
                    ></textarea>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Nền tảng phát sóng <span className="text-red-500">*</span></label>
                    <div className="grid grid-cols-2 gap-4">
                        {Object.values(LiveProvider).map((provider) => (
                            <label key={provider} className={`cursor-pointer border rounded-xl p-4 flex items-center justify-between transition ${formData.provider === provider ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-gray-200 hover:bg-gray-50'}`}>
                                <div className="flex items-center gap-3">
                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.provider === provider ? 'border-primary' : 'border-gray-300'}`}>
                                        {formData.provider === provider && <div className="w-2 h-2 rounded-full bg-primary"></div>}
                                    </div>
                                    <span className="font-medium text-gray-700">{provider}</span>
                                </div>
                                <input
                                    type="radio"
                                    name="provider"
                                    value={provider}
                                    checked={formData.provider === provider}
                                    onChange={handleChange}
                                    className="hidden"
                                />
                            </label>
                        ))}
                    </div>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                    <Link href="/live" className="px-6 py-2.5 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition">
                        Hủy bỏ
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`px-6 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg transition flex items-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-dark'}`}
                    >
                        {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                        {loading ? 'Đang tạo...' : 'Tạo buổi Live'}
                    </button>
                </div>
            </form>
        </div>
    );
}
