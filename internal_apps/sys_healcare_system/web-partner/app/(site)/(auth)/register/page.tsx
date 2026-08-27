'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Form, Input, Select, Checkbox, Button } from 'antd';

const { Option } = Select;

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        organizationName: '',
        contactName: '',
        email: '',
        phone: '',
        partnerType: 'doctor',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Register submitted:', formData);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', width: '100%' }}>
            <div style={{ textAlign: 'center' }}>
                <Link href="/" style={{ display: 'inline-block', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '8px' }}>
                        <div style={{ width: '40px', height: '40px', backgroundColor: '#0f766e', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ color: 'white', fontWeight: '900', fontSize: '20px' }}>M</span>
                        </div>
                        <span style={{ fontSize: '24px', fontWeight: '700', letterSpacing: '-0.025em', color: '#111827' }}>MediPortal</span>
                    </div>
                </Link>
                <h2 style={{ fontSize: '30px', fontWeight: '800', letterSpacing: '-0.025em', color: '#111827' }}>Đăng ký Đối tác</h2>
                <p style={{ marginTop: '4px', fontSize: '14px', color: '#6b7280', fontWeight: '500', letterSpacing: '0.025em' }}>Mở rộng mạng lưới chăm sóc y tế</p>
            </div>

            <form style={{ display: 'flex', flexDirection: 'column', gap: '14px' }} onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
                    <Input
                        name="organizationName"
                        type="text"
                        required
                        value={formData.organizationName}
                        onChange={handleInputChange}
                        style={{ padding: '12px 16px', backgroundColor: '#f9fafb', border: '1px solid transparent', borderRadius: '12px', fontSize: '14px', fontWeight: '500' }}
                        placeholder="Tên Cơ sở / Phòng khám"
                    />
                    <Select
                        name="partnerType"
                        value={formData.partnerType}
                        onChange={(value) => setFormData(prev => ({ ...prev, partnerType: value }))}
                        style={{ padding: '12px 16px', backgroundColor: '#f9fafb', border: '1px solid transparent', borderRadius: '12px', fontSize: '14px', fontWeight: '500' }}
                    >
                        <Option value="doctor">Bác sĩ chuyên khoa</Option>
                        <Option value="clinic">Phòng khám</Option>
                        <Option value="hospital">Bệnh viện</Option>
                        <Option value="pharmacy">Nhà thuốc</Option>
                    </Select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
                    <Input
                        name="contactName"
                        type="text"
                        required
                        value={formData.contactName}
                        onChange={handleInputChange}
                        style={{ padding: '12px 16px', backgroundColor: '#f9fafb', border: '1px solid transparent', borderRadius: '12px', fontSize: '14px', fontWeight: '500' }}
                        placeholder="Tên người đại diện"
                    />
                    <Input
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        style={{ padding: '12px 16px', backgroundColor: '#f9fafb', border: '1px solid transparent', borderRadius: '12px', fontSize: '14px', fontWeight: '500' }}
                        placeholder="Số điện thoại liên hệ"
                    />
                </div>

                <Input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{ padding: '12px 16px', backgroundColor: '#f9fafb', border: '1px solid transparent', borderRadius: '12px', fontSize: '14px', fontWeight: '500' }}
                    placeholder="Email doanh nghiệp"
                />

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
                    <Input
                        name="password"
                        type="password"
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        style={{ padding: '12px 16px', backgroundColor: '#f9fafb', border: '1px solid transparent', borderRadius: '12px', fontSize: '14px', fontWeight: '500' }}
                        placeholder="Tạo mật khẩu"
                    />
                    <Input
                        name="confirmPassword"
                        type="password"
                        required
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        style={{ padding: '12px 16px', backgroundColor: '#f9fafb', border: '1px solid transparent', borderRadius: '12px', fontSize: '14px', fontWeight: '500' }}
                        placeholder="Xác nhận mật khẩu"
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', paddingTop: '8px', paddingBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                        <Checkbox
                            id="terms"
                            name="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onChange={handleInputChange}
                            style={{ width: '16px', height: '16px', color: '#0f766e', backgroundColor: '#f9fafb', borderColor: '#d1d5db', borderRadius: '4px', accentColor: '#0f766e' }}
                        />
                    </div>
                    <label htmlFor="terms" style={{ marginLeft: '8px', fontSize: '12px', color: '#6b7280', fontWeight: '500', lineHeight: '1.4', cursor: 'pointer' }}>
                        Đại diện đối tác xác nhận đồng ý với <Link href="/terms" style={{ color: '#0f766e', textDecoration: 'underline', fontWeight: '700' }}>Chính sách nền tảng</Link> và <Link href="/privacy" style={{ color: '#0f766e', textDecoration: 'underline', fontWeight: '700' }}>Bảo mật dữ liệu</Link>
                    </label>
                </div>

                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '14px 16px', fontSize: '14px', fontWeight: '700', borderRadius: '12px', color: 'white', backgroundColor: '#0f766e', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', transform: 'translateY(-2px)', transition: 'all 0.2s' }}
                >
                    Gửi Hồ Sơ Đăng Ký
                </Button>
            </form>
            
            <p style={{ marginTop: '32px', textAlign: 'center', fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>
                Cơ sở đã được duyệt?{' '}
                <Link href="/login" style={{ fontWeight: '700', color: '#0f766e', textDecoration: 'underline', transition: 'color 0.2s' }}>
                    Đăng nhập hệ thống
                </Link>
            </p>
        </div>
    );
}