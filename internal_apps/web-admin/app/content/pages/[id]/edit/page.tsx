"use client";
import React, { useState, useEffect, use } from 'react';
import FormBuilder from '@/components/admin/FormBuilder';
import { useRouter } from 'next/navigation';
import contentService, { StaticPage } from '@/services/content.service';

export default function EditPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const id = resolvedParams.id;
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [initialValues, setInitialValues] = useState<any>(null);

    useEffect(() => {
        const fetchPage = async () => {
            try {
                const spage = await contentService.getStaticPages().then(pages => pages.find(p => String(p.id) === id));
                if (spage) {
                    setInitialValues({
                        ...spage,
                        isActive: spage.isActive ? 'true' : 'false'
                    });
                }
            } catch (error) {
                console.error('Failed to fetch static page', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPage();
    }, [id]);

    const fields = [
        { name: 'title', label: 'Tiêu đề', type: 'text' as const, required: true },
        { name: 'slug', label: 'Slug (URL)', type: 'text' as const, required: true },
        { name: 'content', label: 'Nội dung', type: 'textarea' as const, required: true, rows: 10 },
        {
            name: 'isActive', label: 'Trạng thái', type: 'select' as const, required: true, options: [
                { value: 'true', label: 'Đã xuất bản' },
                { value: 'false', label: 'Nháp' },
            ]
        },
    ];

    const handleSubmit = async (data: any) => {
        setSubmitting(true);
        try {
            await contentService.updateStaticPage(id, {
                ...data,
                isActive: data.isActive === 'true'
            });
            alert('Cập nhật trang thành công!');
            router.push('/content/pages');
        } catch (error) {
            alert('Cập nhật thất bại');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Đang tải dữ liệu...</div>;
    if (!initialValues) return <div className="p-8 text-center text-red-500">Không tìm thấy trang</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Chỉnh sửa Trang</h1>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <FormBuilder
                    fields={fields}
                    onSubmit={handleSubmit}
                    submitLabel={submitting ? "Đang xử lý..." : "Cập nhật"}
                    initialValues={initialValues}
                    columns={1}
                />
            </div>
        </div>
    );
}
