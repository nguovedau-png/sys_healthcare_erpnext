"use client";

import React, { useState } from 'react';
import Form from '@/components/ui/Form';
import { Input, TextArea } from '@/components/ui/Input';
import { message } from '@/components/ui/Message';
import Result from '@/components/ui/Result';
import {
    AiOutlineUser as UserOutlined,
    AiOutlineHome as HomeOutlined,
    AiOutlineMedicineBox as MedicineBoxOutlined,
    AiOutlineShop as ShopOutlined,
    AiOutlineCheckCircle as CheckCircleOutlined,
    AiOutlineMail as MailOutlined,
    AiOutlinePhone as PhoneOutlined,
    AiOutlineGlobal as GlobalOutlined,
    AiOutlineInfoCircle as InfoCircleOutlined,
    AiOutlineArrowRight as ArrowRightOutlined,
    AiOutlineArrowLeft as ArrowLeftOutlined,
    AiOutlineIdcard as IdcardOutlined,
    AiOutlineBank as BankOutlined
} from 'react-icons/ai';
import partnerService from '@/services/partner.service';

const partnerTypes = [
    {
        key: 'doctor',
        title: 'Bác sĩ',
        description: 'Dành cho các bác sĩ muốn mở phòng mạch riêng hoặc hợp tác tư vấn từ xa.',
        icon: <MedicineBoxOutlined className="text-3xl" />
    },
    {
        key: 'pharmacist',
        title: 'Dược sĩ',
        description: 'Dành cho dược sĩ có chứng chỉ hành nghề muốn vận hành nhà thuốc.',
        icon: <IdcardOutlined className="text-3xl" />
    },
    {
        key: 'clinic',
        title: 'Phòng khám',
        description: 'Đăng ký cho các cơ sở phòng khám đa khoa hoặc chuyên khoa.',
        icon: <HomeOutlined className="text-3xl" />
    },
    {
        key: 'hospital',
        title: 'Bệnh viện',
        description: 'Giải pháp quản lý và kết nối dành cho các bệnh viện quy mô lớn.',
        icon: <BankOutlined className="text-3xl" />
    },
    {
        key: 'pharmacy',
        title: 'Nhà thuốc',
        description: 'Mở rộng kênh tiếp cận khách hàng và quản lý kho dược hiện đại.',
        icon: <ShopOutlined className="text-3xl" />
    }
];

export default function PartnerRegistrationPage() {
    const [form] = Form.useForm();
    const [currentStep, setCurrentStep] = useState(0);
    const [partnerType, setPartnerType] = useState<string>('doctor');
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const onFinish = async (values: any) => {
        setSubmitting(true);
        try {
            switch (partnerType) {
                case 'doctor':
                    await partnerService.createDoctor({
                        name: values.name,
                        specialty: values.specialty,
                        hospital: values.hospital,
                        phone: values.phone,
                        email: values.email,
                        description: values.description,
                        isVerified: false,
                        status: 'pending'
                    } as any);
                    break;
                case 'clinic':
                    await partnerService.createClinic({
                        name: values.name,
                        address: values.address,
                        phone: values.phone,
                        email: values.email,
                        description: values.description,
                        specialties: values.specialty ? [values.specialty] : [],
                        isVerified: false,
                        status: 'pending'
                    } as any);
                    break;
                case 'hospital':
                    await partnerService.createHospital({
                        name: values.name,
                        address: values.address,
                        phone: values.phone,
                        website: values.website,
                        description: values.description,
                        departments: values.specialty ? [values.specialty] : [],
                        isVerified: false,
                        status: 'pending'
                    } as any);
                    break;
                case 'pharmacy':
                    await partnerService.createPharmacy({
                        name: values.name,
                        address: values.address,
                        phone: values.phone,
                        email: values.email,
                        description: values.description,
                        isVerified: false,
                        status: 'pending'
                    } as any);
                    break;
                case 'pharmacist':
                    await partnerService.createPharmacist({
                        fullName: values.name,
                        phoneNumber: values.phone,
                        address: values.address,
                        specialistly: values.specialty,
                        isVerified: false,
                        status: 'pending'
                    } as any);
                    break;
            }
            setSuccess(true);
            message.success('Gửi yêu cầu đăng ký thành công! Vui lòng chờ quản trị viên duyệt.');
        } catch (error) {
            console.error('Registration failed:', error);
            message.error('Gửi yêu cầu thất bại. Vui lòng thử lại sau.');
        } finally {
            setSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 pt-[70px] animate-in zoom-in-95 duration-500">
                <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-12 text-center relative overflow-hidden border border-slate-100">
                    <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 relative z-10">
                        <CheckCircleOutlined className="text-6xl text-emerald-500" />
                    </div>
                    
                    <h2 className="text-3xl font-black text-slate-900 mb-4 relative z-10 tracking-tight">Đăng ký thành công!</h2>
                    <p className="text-slate-500 font-medium mb-10 relative z-10 leading-relaxed">
                        Yêu cầu trở thành đối tác của bạn đã được tiếp nhận. Đội ngũ Healthcare sẽ liên hệ xác minh trong vòng <span className="text-indigo-600 font-bold">24-48 giờ làm việc</span>.
                    </p>
                    
                    <div className="space-y-4 relative z-10">
                        <button 
                            onClick={() => window.location.href = '/profile'}
                            className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2"
                        >
                            Đi tới trang quản lý
                            <ArrowRightOutlined />
                        </button>
                        <button 
                            onClick={() => window.location.href = '/'}
                            className="w-full py-4 bg-slate-50 text-slate-600 rounded-xl font-bold hover:bg-slate-100 transition-all"
                        >
                            Về trang chủ
                        </button>
                    </div>

                    {/* Abstract background shape */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] pt-[70px]">
            {/* Header Section */}
            <div className="bg-slate-900 py-20 px-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
                
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                        Trở thành <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Đối tác Chiến lược</span>
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                        Tham gia cùng mạng lưới y tế thông minh hàng đầu Việt Nam để số hóa quy trình vận hành và tiếp cận hàng triệu bệnh nhân.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 -mt-12 pb-24 relative z-20">
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 md:p-12 border border-slate-100 mb-12">
                    
                    {/* Custom Stepper */}
                    <div className="flex items-center justify-center mb-16 relative max-w-2xl mx-auto">
                        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-100 -translate-y-1/2 z-0"></div>
                        <div className="absolute top-1/2 left-0 h-[2px] bg-indigo-600 -translate-y-1/2 z-0 transition-all duration-500" style={{ width: `${currentStep * 100}%` }}></div>
                        
                        {[
                            { title: 'Chọn mô hình', icon: <UserOutlined /> },
                            { title: 'Thông tin hồ sơ', icon: <IdcardOutlined /> }
                        ].map((step, index) => {
                            const isActive = index === currentStep;
                            const isCompleted = index < currentStep;
                            return (
                                <div key={index} className="relative z-10 flex flex-col items-center flex-1">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all duration-500 border-4 ${
                                        isActive || isCompleted 
                                        ? 'bg-indigo-600 border-indigo-50 text-white shadow-lg shadow-indigo-200' 
                                        : 'bg-white border-slate-50 text-slate-300'
                                    }`}>
                                        {isCompleted ? <CheckCircleOutlined /> : step.icon}
                                    </div>
                                    <span className={`text-[11px] font-black uppercase tracking-widest mt-3 transition-colors ${
                                        isActive ? 'text-indigo-600' : isCompleted ? 'text-slate-800' : 'text-slate-400'
                                    }`}>
                                        {step.title}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    {currentStep === 0 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="text-center mb-12">
                                <h3 className="text-2xl font-black text-slate-900 mb-2">Bạn là ai?</h3>
                                <p className="text-slate-500 font-medium">Vui lòng chọn loại hình phù hợp nhất với chuyên môn của bạn</p>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
                                {partnerTypes.map((type) => {
                                    const isSelected = partnerType === type.key;
                                    return (
                                        <button 
                                            key={type.key}
                                            onClick={() => setPartnerType(type.key)}
                                            className={`h-full p-6 md:p-8 rounded-2xl text-left transition-all duration-300 group flex flex-col items-center text-center relative overflow-hidden ${
                                                isSelected 
                                                ? 'bg-indigo-600 shadow-xl shadow-indigo-200 border-none scale-105 z-10' 
                                                : 'bg-slate-50 border border-slate-100 hover:bg-indigo-50 hover:border-indigo-100'
                                            }`}
                                        >
                                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                                                isSelected ? 'bg-white/20 text-white shadow-inner' : 'bg-white text-indigo-600 shadow-sm group-hover:scale-110'
                                            }`}>
                                                {type.icon}
                                            </div>
                                            <h4 className={`text-[15px] font-black mb-2 transition-colors ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                                                {type.title}
                                            </h4>
                                            <p className={`text-xs leading-relaxed font-medium transition-colors ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>
                                                {type.description}
                                            </p>

                                            {isSelected && (
                                                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="mt-16 flex justify-center">
                                <button 
                                    onClick={() => setCurrentStep(1)}
                                    className="px-12 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all flex items-center justify-center gap-2 group"
                                >
                                    Tiếp tục hồ sơ
                                    <ArrowRightOutlined className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    )}

                    {currentStep === 1 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500 max-w-3xl mx-auto">
                            <div className="mb-10 flex items-center gap-4 border-b border-slate-100 pb-6">
                                <button 
                                    onClick={() => setCurrentStep(0)}
                                    className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-50 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                                >
                                    <ArrowLeftOutlined className="text-xl" />
                                </button>
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                                        Hồ sơ {partnerTypes.find(t => t.key === partnerType)?.title}
                                    </h3>
                                    <p className="text-slate-500 font-medium text-sm mt-1">Điền đầy đủ thông tin để chúng tôi có thể liên hệ với bạn nhanh nhất</p>
                                </div>
                            </div>

                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={onFinish}
                                initialValues={{ type: partnerType }}
                                requiredMark={false}
                                className="space-y-8"
                            >
                                {/* Section 1 */}
                                <div className="bg-slate-50/50 rounded-2xl p-6 md:p-8 border border-slate-100">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                                            <UserOutlined className="text-indigo-600" />
                                        </div>
                                        <h4 className="text-[13px] font-black text-slate-800 uppercase tracking-widest">Thông tin cơ bản</h4>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                        <div className="md:col-span-2">
                                            <Form.Item
                                                name="name"
                                                label={<span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Tên {partnerType === 'doctor' || partnerType === 'pharmacist' ? 'đầy đủ' : 'cơ sở'} <span className="text-rose-500">*</span></span>}
                                                rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
                                            >
                                                <Input placeholder="Nhập tên chính thức" className="h-12 rounded-xl border-slate-200 bg-white" />
                                            </Form.Item>
                                        </div>
                                        <div>
                                            <Form.Item
                                                name="phone"
                                                label={<span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Số điện thoại <span className="text-rose-500">*</span></span>}
                                                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                                            >
                                                <Input placeholder="09xx xxx xxx" className="h-12 rounded-xl border-slate-200 bg-white" />
                                            </Form.Item>
                                        </div>
                                        <div>
                                            <Form.Item
                                                name="email"
                                                label={<span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Địa chỉ Email <span className="text-rose-500">*</span></span>}
                                                rules={[
                                                    { required: true, message: 'Vui lòng nhập email' },
                                                    { type: 'email', message: 'Email không hợp lệ' }
                                                ]}
                                            >
                                                <Input placeholder="example@email.com" className="h-12 rounded-xl border-slate-200 bg-white" />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2 */}
                                <div className="bg-slate-50/50 rounded-2xl p-6 md:p-8 border border-slate-100">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                                            <IdcardOutlined className="text-emerald-600" />
                                        </div>
                                        <h4 className="text-[13px] font-black text-slate-800 uppercase tracking-widest">Thông tin chuyên môn</h4>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 gap-y-4">
                                        {partnerType !== 'doctor' && partnerType !== 'pharmacist' && (
                                            <Form.Item
                                                name="address"
                                                label={<span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Địa chỉ trụ sở <span className="text-rose-500">*</span></span>}
                                                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                                            >
                                                <Input placeholder="Số nhà, tên đường, phường/xã, quận/huyện..." className="h-12 rounded-xl border-slate-200 bg-white" />
                                            </Form.Item>
                                        )}

                                        <Form.Item
                                            name="specialty"
                                            label={<span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{partnerType === 'doctor' ? 'Chuyên khoa' : partnerType === 'clinic' ? 'Chuyên môn chính' : partnerType === 'hospital' ? 'Các chuyên khoa chính' : partnerType === 'pharmacist' ? 'Chuyên môn' : 'Lĩnh vực hoạt động'} <span className="text-rose-500">*</span></span>}
                                            rules={[{ required: true, message: 'Vui lòng nhập thông tin chuyên môn' }]}
                                        >
                                            <Input placeholder="Ví dụ: Tim mạch, Nội khoa, Tai mũi họng..." className="h-12 rounded-xl border-slate-200 bg-white" />
                                        </Form.Item>

                                        {partnerType === 'doctor' && (
                                            <Form.Item
                                                name="hospital"
                                                label={<span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Nơi công tác hiện tại</span>}
                                            >
                                                <Input placeholder="Tên bệnh viện hoặc phòng khám..." className="h-12 rounded-xl border-slate-200 bg-white" />
                                            </Form.Item>
                                        )}

                                        {partnerType === 'hospital' && (
                                            <Form.Item
                                                name="website"
                                                label={<span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Website chính thức</span>}
                                            >
                                                <Input placeholder="https://..." className="h-12 rounded-xl border-slate-200 bg-white" />
                                            </Form.Item>
                                        )}

                                        <Form.Item
                                            name="description"
                                            label={<span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Giới thiệu & Kinh nghiệm</span>}
                                        >
                                            <TextArea rows={5} placeholder="Mô tả thêm về kinh nghiệm hành nghề, quy mô cơ sở, hoặc các thông tin bổ sung khác giúp chúng tôi duyệt hồ sơ nhanh hơn..." className="rounded-xl border-slate-200 bg-white p-4" />
                                        </Form.Item>
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <button 
                                        type="submit" 
                                        disabled={submitting}
                                        className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {submitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                Đang xử lý...
                                            </>
                                        ) : (
                                            'Gửi hồ sơ đăng ký ngay'
                                        )}
                                    </button>
                                    <p className="text-center text-slate-400 font-medium text-xs flex items-center justify-center gap-1.5 mt-4">
                                        <InfoCircleOutlined /> Bằng cách đăng ký, bạn đồng ý với các Điều khoản & Chính sách của chúng tôi.
                                    </p>
                                </div>
                            </Form>
                        </div>
                    )}
                </div>
                
                {/* Information Cards Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { title: 'Duyệt hồ sơ bao lâu?', desc: 'Chúng tôi cam kết phản hồi kết quả trong vòng tối đa 48 giờ làm việc sau khi nhận đủ thông tin.' },
                        { title: 'Có tốn phí đăng ký không?', desc: 'Việc đăng ký hồ sơ hoàn toàn miễn phí. Chúng tôi chỉ thu phí dịch vụ dựa trên hiệu quả giao dịch thực tế.' },
                        { title: 'Hỗ trợ kỹ thuật?', desc: 'Luôn có đội ngũ hỗ trợ 24/7 giúp bạn làm quen với hệ thống và cấu hình hồ sơ đối tác.' }
                    ].map((info, i) => (
                        <div key={i} className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <h5 className="text-[13px] font-black text-slate-900 uppercase tracking-widest mb-3">{info.title}</h5>
                            <p className="text-slate-500 text-sm font-medium leading-relaxed">{info.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
            
            <style jsx global>{`
                /* Hide ant-form validation styling overrides if needed, Tailwind handles most now */
                .ant-form-item-explain-error {
                    font-size: 11px !important;
                    font-weight: 700 !important;
                    text-transform: uppercase !important;
                    letter-spacing: 0.05em !important;
                    margin-top: 6px !important;
                }
            `}</style>
        </div>
    );
}
