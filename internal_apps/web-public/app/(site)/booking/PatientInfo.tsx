'use client';

import React, { useState } from 'react';
import { PatientInfo } from '@/types/booking.types';
import { AiOutlineUser, AiOutlinePhone, AiOutlineMail, AiOutlineCalendar, AiOutlineMessage } from 'react-icons/ai';

interface PatientInfoFormProps {
    patientInfo?: PatientInfo;
    onSubmit: (info: PatientInfo) => void;
}

const PatientInfoForm: React.FC<PatientInfoFormProps> = ({ patientInfo, onSubmit }) => {
    const [formData, setFormData] = useState<PatientInfo>(
        patientInfo || {
            fullName: '',
            phone: '',
            email: '',
            dateOfBirth: '',
            gender: 'male',
            notes: ''
        }
    );

    const [errors, setErrors] = useState<Partial<Record<keyof PatientInfo, string>>>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof PatientInfo]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof PatientInfo, string>> = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'Vui lòng nhập họ tên';
        if (!formData.phone.trim()) {
            newErrors.phone = 'Vui lòng nhập số điện thoại';
        } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Số điện thoại không hợp lệ';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Vui lòng nhập email';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Vui lòng chọn ngày sinh';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) onSubmit(formData);
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="mb-8">
                <h2 className="text-xl font-bold text-slate-800 mb-1">Thông tin bệnh nhân</h2>
                <p className="text-slate-500 text-sm">Vui lòng cung cấp thông tin chính xác để bác sĩ có thể hỗ trợ tốt nhất</p>
            </div>

            <form id="patient-info-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">
                            Họ và tên bệnh nhân <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                <AiOutlineUser className="text-lg" />
                            </div>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className={`w-full pl-11 pr-4 py-3.5 rounded-xl border transition-all duration-300 outline-none ${
                                    errors.fullName ? 'border-rose-200 bg-rose-50/30' : 'border-slate-100 bg-slate-50/50 focus:border-indigo-600 focus:bg-white focus:shadow-lg focus:shadow-indigo-50'
                                }`}
                                placeholder="VD: Nguyễn Văn A"
                            />
                        </div>
                        {errors.fullName && <p className="text-rose-500 text-[10px] font-bold mt-1.5 px-1 uppercase tracking-tight">{errors.fullName}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">
                            Số điện thoại <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                <AiOutlinePhone className="text-lg" />
                            </div>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className={`w-full pl-11 pr-4 py-3.5 rounded-xl border transition-all duration-300 outline-none ${
                                    errors.phone ? 'border-rose-200 bg-rose-50/30' : 'border-slate-100 bg-slate-50/50 focus:border-indigo-600 focus:bg-white focus:shadow-lg focus:shadow-indigo-50'
                                }`}
                                placeholder="09xx xxx xxx"
                            />
                        </div>
                        {errors.phone && <p className="text-rose-500 text-[10px] font-bold mt-1.5 px-1 uppercase tracking-tight">{errors.phone}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">
                            Địa chỉ Email <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                <AiOutlineMail className="text-lg" />
                            </div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full pl-11 pr-4 py-3.5 rounded-xl border transition-all duration-300 outline-none ${
                                    errors.email ? 'border-rose-200 bg-rose-50/30' : 'border-slate-100 bg-slate-50/50 focus:border-indigo-600 focus:bg-white focus:shadow-lg focus:shadow-indigo-50'
                                }`}
                                placeholder="nguyenvan@email.com"
                            />
                        </div>
                        {errors.email && <p className="text-rose-500 text-[10px] font-bold mt-1.5 px-1 uppercase tracking-tight">{errors.email}</p>}
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">
                            Ngày sinh <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors pointer-events-none">
                                <AiOutlineCalendar className="text-lg" />
                            </div>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                className={`w-full pl-11 pr-4 py-3.5 rounded-xl border transition-all duration-300 outline-none ${
                                    errors.dateOfBirth ? 'border-rose-200 bg-rose-50/30' : 'border-slate-100 bg-slate-50/50 focus:border-indigo-600 focus:bg-white focus:shadow-lg focus:shadow-indigo-50'
                                }`}
                            />
                        </div>
                        {errors.dateOfBirth && <p className="text-rose-500 text-[10px] font-bold mt-1.5 px-1 uppercase tracking-tight">{errors.dateOfBirth}</p>}
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">
                            Giới tính <span className="text-rose-500">*</span>
                        </label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full px-4 py-[15px] rounded-xl border border-slate-100 bg-slate-50/50 focus:border-indigo-600 focus:bg-white focus:shadow-lg focus:shadow-indigo-50 transition-all outline-none text-slate-700 font-medium"
                        >
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                            <option value="other">Khác</option>
                        </select>
                    </div>

                    {/* Notes */}
                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">
                            Lý do khám / Ghi chú thêm
                        </label>
                        <div className="relative group">
                            <div className="absolute left-4 top-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                <AiOutlineMessage className="text-lg" />
                            </div>
                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                rows={4}
                                className="w-full pl-11 pr-4 py-4 rounded-xl border border-slate-100 bg-slate-50/50 focus:border-indigo-600 focus:bg-white focus:shadow-lg focus:shadow-indigo-50 transition-all outline-none text-slate-700 font-medium resize-none"
                                placeholder="VD: Đau đầu kéo dài, muốn kiểm tra sức khỏe tổng quát..."
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* Next Button in Form */}
                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        className="px-10 py-3.5 bg-indigo-600 text-white rounded-xl font-bold transition-all hover:bg-indigo-700 shadow-lg shadow-indigo-100"
                    >
                        Tiếp tục: Xác nhận
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PatientInfoForm;
