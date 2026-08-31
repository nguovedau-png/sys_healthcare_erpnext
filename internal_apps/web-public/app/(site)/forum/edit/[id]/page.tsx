'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function EditThreadPage() {
    const params = useParams();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const id = params?.id;
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <i className="fi flaticon-edit text-blue-600"></i>
                Chỉnh sửa bài viết
            </h1>

            <form className="space-y-6">
                {/* Category Selector */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Chọn chuyên mục</label>
                    <select
                        defaultValue="Sức khỏe chung"
                        className="w-full md:w-1/2 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                    >
                        <option>Sức khỏe chung</option>
                        <option>Dinh dưỡng</option>
                        <option>Tâm lý</option>
                        <option>Bệnh lý</option>
                    </select>
                </div>

                {/* Title */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Tiêu đề</label>
                    <input
                        type="text"
                        defaultValue="Hỏi về quy trình khám bảo hiểm y tế tại BV X"
                        placeholder="Ví dụ: Làm sao để giảm đau lưng khi ngồi văn phòng?"
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all font-medium text-lg placeholder-gray-400"
                    />
                    <p className="text-xs text-gray-400 mt-1 text-right">45/300 ký tự</p>
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
                            defaultValue="Mình chuẩn bị đi khám tổng quát nhưng không rõ thủ tục BHYT như thế nào..."
                        ></textarea>
                    </div>
                </div>

                {/* Tags */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Thẻ (Tags)</label>
                    <input
                        type="text"
                        defaultValue="BHYT, Khám bệnh, Thủ tục"
                        placeholder="Thêm thẻ (cách nhau bởi dấu phẩy)..."
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                    />
                </div>

                {/* Actions */}
                <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
                    <Link href="/forum/drafts" className="px-6 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors">
                        Hủy
                    </Link>
                    <button type="submit" className="px-8 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                        Cập nhật
                    </button>
                </div>
            </form>
        </div>
    )
}
