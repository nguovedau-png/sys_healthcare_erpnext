'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { contentService } from '@/services/content.service';
import { message } from '@/components/ui/Message';

const CATEGORIES = [
    'Sức khỏe chung',
    'Dinh dưỡng',
    'Tâm lý',
    'Bệnh lý',
    'Nhi khoa',
    'Tim mạch',
    'Da liễu',
    'Thể dục & Thể thao',
];

export default function CreateThreadPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        category: 'Sức khỏe chung',
        title: '',
        content: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.title.trim() || !form.content.trim()) {
            message.error('Vui lòng nhập đầy đủ tiêu đề và nội dung');
            return;
        }
        setLoading(true);
        try {
            await contentService.createForumTopic({
                title: form.title,
                content: form.content,
                category: form.category,
                authorId: 'user1',
                authorName: 'User',
                status: 'pending',
            });
            message.success('Tạo bài thảo luận thành công!');
            router.push('/forum');
        } catch (error) {
            console.error('Error creating topic:', error);
            message.error('Không thể tạo bài thảo luận');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <i className="fi flaticon-edit text-green-600"></i>
                Tạo bài thảo luận mới
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Category Selector */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Chọn chuyên mục</label>
                    <select
                        className="w-full md:w-1/2 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                    >
                        {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {/* Title */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Tiêu đề</label>
                    <input
                        type="text"
                        placeholder="Ví dụ: Làm sao để giảm đau lưng khi ngồi văn phòng?"
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all font-medium text-lg placeholder-gray-400"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        maxLength={300}
                    />
                    <p className="text-xs text-gray-400 mt-1 text-right">{form.title.length}/300 ký tự</p>
                </div>

                {/* Content */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Nội dung</label>
                    <div className="border border-gray-200 rounded-xl overflow-hidden min-h-[300px] flex flex-col">
                        {/* Fake Toolbar */}
                        <div className="bg-gray-50 border-b border-gray-200 p-2 flex gap-2">
                            <button type="button" className="p-2 hover:bg-gray-200 rounded text-gray-600 font-bold">B</button>
                            <button type="button" className="p-2 hover:bg-gray-200 rounded text-gray-600 italic">I</button>
                            <button type="button" className="p-2 hover:bg-gray-200 rounded text-gray-600 underline">U</button>
                            <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>
                            <button type="button" className="p-2 hover:bg-gray-200 rounded text-gray-600"><i className="fi flaticon-photo mb-1"></i></button>
                            <button type="button" className="p-2 hover:bg-gray-200 rounded text-gray-600"><i className="fi flaticon-link"></i></button>
                        </div>
                        <textarea
                            className="flex-1 w-full p-4 outline-none resize-none"
                            placeholder="Chia sẻ câu chuyện hoặc câu hỏi của bạn..."
                            value={form.content}
                            onChange={(e) => setForm({ ...form, content: e.target.value })}
                        ></textarea>
                    </div>
                </div>

                {/* Actions */}
                <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
                    <button
                        type="button"
                        className="px-6 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                        onClick={() => router.push('/forum')}
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Đang đăng...' : 'Đăng bài'}
                    </button>
                </div>
            </form>
        </div>
    );
}