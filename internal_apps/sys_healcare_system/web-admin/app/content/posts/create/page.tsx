"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import contentService, { Category } from '@/services/content.service';

export default function CreateNews() {
    const router = useRouter();
    const [creating, setCreating] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [catLoading, setCatLoading] = useState(true);

    const [formData, setFormData] = useState({
        title: '',
        categoryId: '', // Will update once data loaded
        content: '',
        isActive: true,
        thumbnail: '',
        desc: '',
        author: 'Admin',
        type: 'article'
    });

    // Set initial category when data arrives
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const cats = await contentService.getCategories();
                setCategories(cats);
                if (cats.length > 0 && !formData.categoryId) {
                    setFormData(prev => ({ ...prev, categoryId: String(cats[0].id) }));
                }
            } catch (error) {
                console.error("Failed to fetch categories", error);
            } finally {
                setCatLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreating(true);
        try {
            await contentService.createPost({
                ...formData,
                categoryId: parseInt(formData.categoryId as string),
                type: 'article',
            });
            alert('Tin tức đã được tạo thành công!');
            router.push('/content/posts');
        } catch (err: any) {
            alert('Lỗi khi tạo tin tức: ' + (err.message || err));
        } finally {
            setCreating(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/content/posts" className="bg-white p-2 rounded-lg border border-gray-200 text-gray-400 hover:text-primary transition-all">
                    <i className="fi flaticon-arrow-left text-xl"></i>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Tạo tin tức mới</h1>
                    <p className="text-gray-500 mt-1">Thêm nội dung mới vào website</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Tiêu đề *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full border border-gray-200 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                                    placeholder="Nhập tiêu đề bài viết..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Mô tả ngắn</label>
                                <textarea
                                    rows={3}
                                    value={formData.desc}
                                    onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                                    className="w-full border border-gray-200 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    placeholder="Nhập mô tả ngắn gọn..."
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Nội dung bài viết *</label>
                                <textarea
                                    required
                                    rows={12}
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full border border-gray-200 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all leading-relaxed"
                                    placeholder="Nhập nội dung chi tiết..."
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Ảnh đại diện (URL)</label>
                                <input
                                    type="text"
                                    value={formData.thumbnail}
                                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                                    className="w-full border border-gray-200 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    placeholder="https://example.com/image.jpg"
                                />
                                {formData.thumbnail && (
                                    <div className="mt-4 w-40 h-24 rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
                                        <img src={formData.thumbnail} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-6">
                        <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                            Cài đặt xuất bản
                        </h3>
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Trạng thái</label>
                                <select
                                    value={formData.isActive ? 'true' : 'false'}
                                    onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
                                    className="w-full border border-gray-200 rounded-xl p-3 outline-none bg-gray-50/50 font-medium cursor-pointer"
                                >
                                    <option value="true">Xuất bản ngay</option>
                                    <option value="false">Lưu nháp</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Danh mục</label>
                                <select
                                    value={formData.categoryId}
                                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                    disabled={catLoading}
                                    className="w-full border border-gray-200 rounded-xl p-3 outline-none bg-gray-50/50 font-medium cursor-pointer disabled:opacity-50"
                                >
                                    {catLoading ? (
                                        <option>Đang tải...</option>
                                    ) : (
                                        categories.map((cat: any) => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))
                                    )}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Tác giả</label>
                                <input
                                    type="text"
                                    value={formData.author}
                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                    className="w-full border border-gray-200 rounded-xl p-3 outline-none bg-gray-50/50"
                                />
                            </div>

                            <div className="pt-6 border-t border-gray-100 space-y-3">
                                <button
                                    type="submit"
                                    disabled={creating}
                                    className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/25 disabled:opacity-50"
                                >
                                    {creating ? 'Đang lưu...' : 'Lưu & Xuất bản'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => router.back()}
                                    className="w-full border border-gray-200 text-gray-700 font-bold py-3.5 rounded-xl hover:bg-gray-50 transition-all"
                                >
                                    Hủy bỏ
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100/50">
                        <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                            <span>💡</span> Mẹo viết bài
                        </h4>
                        <ul className="text-xs text-blue-800/80 space-y-2 leading-relaxed font-medium">
                            <li>• Tiêu đề ngắn gọn, chứa từ khóa chính</li>
                            <li>• Hình ảnh đại diện đẹp, kích thước 16:9</li>
                            <li>• Phân loại danh mục chính xác</li>
                            <li>• Kiểm tra kỹ nội dung trước khi đăng</li>
                        </ul>
                    </div>
                </div>
            </form>
        </div>
    );
}
