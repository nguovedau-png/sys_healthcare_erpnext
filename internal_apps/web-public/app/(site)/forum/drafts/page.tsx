'use client';

import React from 'react';
import Link from 'next/link';

const drafts = [
    {
        id: 1,
        title: 'Hỏi về quy trình khám bảo hiểm y tế tại BV X',
        category: 'Sức khỏe chung',
        updatedAt: '10 phút trước',
        preview: 'Mình chuẩn bị đi khám tổng quát nhưng không rõ thủ tục BHYT như thế nào...'
    },
    {
        id: 2,
        title: '(Chưa có tiêu đề)',
        category: 'Chưa chọn',
        updatedAt: '2 ngày trước',
        preview: 'Nội dung bài viết đang soạn dở...'
    }
];

export default function DraftsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <i className="fi flaticon-edit text-gray-600"></i>
                Bài viết nháp
            </h1>

            <div className="space-y-4">
                {drafts.length > 0 ? (
                    drafts.map((draft) => (
                        <div key={draft.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 relative group hover:border-blue-200 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className={`text-lg font-bold ${draft.title === '(Chưa có tiêu đề)' ? 'text-gray-400 italic' : 'text-gray-900'}`}>
                                        {draft.title}
                                    </h3>
                                    <span className="text-xs font-medium bg-gray-100 text-gray-500 px-2 py-0.5 rounded mt-1 inline-block">
                                        {draft.category}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <Link href={`/forum/edit/${draft.id}`} className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-bold hover:bg-blue-100 transition-colors">
                                        Tiếp tục viết
                                    </Link>
                                    <button className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-bold hover:bg-red-100 transition-colors">
                                        Xóa
                                    </button>
                                </div>
                            </div>
                            <p className="text-gray-500 text-sm mb-2">{draft.preview}</p>
                            <p className="text-xs text-gray-400">Cập nhật lần cuối: {draft.updatedAt}</p>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 bg-white rounded-lg border border-gray-100">
                        <p className="text-gray-500">Bạn không có bài viết nháp nào.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
