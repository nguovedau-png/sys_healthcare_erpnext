"use client";

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import contentService, { Category } from '@/services/content.service';

export default function EditNews({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const id = resolvedParams.id;
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [error, setError] = useState('');

    const [categories, setCategories] = useState<Category[]>([]);
    const [catLoading, setCatLoading] = useState(true);

    const [formData, setFormData] = useState({
        title: '',
        categoryId: '',
        content: '',
        isActive: true,
        thumbnail: '',
        desc: '',
        author: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [post, cats] = await Promise.all([
                    contentService.getPost(id),
                    contentService.getCategories()
                ]);

                setCategories(cats);
                setFormData({
                    title: post.title,
                    categoryId: String(post.categoryId),
                    content: post.content,
                    isActive: post.isActive,
                    thumbnail: post.thumbnail,
                    desc: post.desc,
                    author: post.author,
                });
            } catch (err: any) {
                setError(err.message || 'Error loading data');
            } finally {
                setLoading(false);
                setCatLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdateLoading(true);
        try {
            await contentService.updatePost(id, {
                ...formData,
                categoryId: parseInt(formData.categoryId as string)
            });
            alert('Tin tức đã được cập nhật thành công!');
            router.push('/content/posts');
        } catch (err: any) {
            alert('Lỗi khi cập nhật tin tức: ' + (err.message || err));
        } finally {
            setUpdateLoading(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Đang tải dữ liệu...</div>;
    if (error) return <div className="p-8 text-center text-red-500">Lỗi: {error}</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/content/posts" className="bg-white p-2 rounded-lg border border-gray-200 text-gray-400 hover:text-primary transition-all">
                    <i className="fi flaticon-arrow-left text-xl"></i>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Chỉnh sửa tin tức</h1>
                    <p className="text-gray-500 mt-1">ID: #{id}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Mô tả ngắn</label>
                                <textarea
                                    rows={3}
                                    value={formData.desc || ''}
                                    onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                                    className="w-full border border-gray-200 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Nội dung bài viết *</label>
                                <textarea
                                    required
                                    rows={15}
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full border border-gray-200 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all leading-relaxed"
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Ảnh đại diện (URL)</label>
                                <input
                                    type="text"
                                    value={formData.thumbnail || ''}
                                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                                    className="w-full border border-gray-200 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
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

                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-6">
                        <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                            Trạng thái & Phân loại
                        </h3>
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Trạng thái</label>
                                <select
                                    value={formData.isActive ? 'true' : 'false'}
                                    onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
                                    className="w-full border border-gray-200 rounded-xl p-3 outline-none bg-gray-50/50 font-medium cursor-pointer"
                                >
                                    <option value="true">Đã xuất bản</option>
                                    <option value="false">Tạm ẩn (Nháp)</option>
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
                                    value={formData.author || ''}
                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                    className="w-full border border-gray-200 rounded-xl p-3 outline-none bg-gray-50/50"
                                />
                            </div>

                            <div className="pt-6 border-t border-gray-100 space-y-3">
                                <button
                                    type="submit"
                                    disabled={updateLoading}
                                    className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/25 disabled:opacity-50"
                                >
                                    {updateLoading ? 'Đang cập nhật...' : 'Cập nhật tin tức'}
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
                </div>
            </form>
        </div>
    );
}
