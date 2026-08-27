'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';

export default function LoginPage() {
    const { login, loginWithFrappe, loading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
        } catch (err: any) {
            setError(err.message || 'Đăng nhập thất bại');
        }
    };

    const quickLogin = (testEmail: string, testPassword: string) => {
        setEmail(testEmail);
        setPassword(testPassword);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', width: '100%' }}>

            {/* Mobile Logo */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Link href="/" style={{ display: 'inline-block', marginBottom: '2rem', '@media (min-width: 1024px)': { display: 'none' } }} className="lg:hidden">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '2.5rem', height: '2.5rem', backgroundColor: '#0f766e', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ color: 'white', fontWeight: 900, fontSize: '1.25rem' }}>M</span>
                        </div>
                        <span style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.025em', color: '#111827' }}>MediPortal</span>
                    </div>
                </Link>
                <h2 style={{ fontSize: '1.875rem', fontWeight: 800, letterSpacing: '-0.025em', color: '#111827' }}>Đăng nhập Đối tác</h2>
                <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#6b7280', fontWeight: 500, lineHeight: '1.625' }}>
                    Đăng nhập để quản lý phòng khám, lịch khám và bệnh án điện tử.
                </p>
            </div>

            {/* ─── Frappe OAuth Button ─────────────────────────────────── */}
            <button
                type="button"
                onClick={() => loginWithFrappe()}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', padding: '0.875rem 1rem', borderRadius: '0.75rem', border: '2px solid #0f766e', backgroundColor: 'rgba(15, 118, 110, 0.05)', marginBottom: '1rem', fontWeight: 700, color: '#0f766e', transition: 'all 0.2s', cursor: 'pointer' }}
            >
                {/* Frappe Icon */}
                <svg style={{ width: '1.25rem', height: '1.25rem', flexShrink: 0 }} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="8" fill="#0f766e" />
                    <path d="M8 10h16M8 16h10M8 22h13" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
                <span>Đăng nhập bằng tài khoản Frappe</span>
                <svg style={{ width: '1rem', height: '1rem', opacity: 0.6, marginLeft: 'auto' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* ─── Divider ────────────────────────────────────────────── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }}></div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>Hoặc đăng nhập thủ công</span>
                <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }}></div>
            </div>

            {/* Error Message */}
            {error && (
                <div style={{ backgroundColor: '#fef2f2', borderLeft: '4px solid #ef4444', padding: '1rem', marginBottom: '1rem', borderRadius: '0 0.75rem 0.75rem 0' }}>
                    <p style={{ color: '#b91c1c', fontSize: '0.875rem', fontWeight: 700 }}>{error}</p>
                </div>
            )}

            {/* ─── Credential Form ────────────────────────────────────── */}
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', marginLeft: '0.25rem' }}>
                        Email / Tài khoản
                    </label>
                    <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '100%', padding: '0.875rem 1rem', backgroundColor: '#f9fafb', border: '1px solid transparent', borderRadius: '0.75rem', color: '#374151', fontWeight: 500, fontSize: '0.875rem', outline: 'none', transition: 'all 0.2s' }}
                        placeholder="doctor@hospital.vn"
                    />
                </div>

                <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', marginLeft: '0.25rem', paddingRight: '0.25rem' }}>
                        <label htmlFor="password" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Mật khẩu
                        </label>
                        <Link href="/forgot-password" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0f766e', transition: 'color 0.2s' }}>
                            Quên mật khẩu?
                        </Link>
                    </div>
                    <div style={{ position: 'relative' }}>
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '0.875rem 1rem', backgroundColor: '#f9fafb', border: '1px solid transparent', borderRadius: '0.75rem', color: '#374151', fontWeight: 500, fontSize: '0.875rem', outline: 'none', transition: 'all 0.2s' }}
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ position: 'absolute', top: 0, bottom: 0, right: '1rem', display: 'flex', alignItems: 'center', color: '#9ca3af', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer', border: 'none', background: 'none' }}
                        >
                            {showPassword ? 'Ẩn' : 'Hiện'}
                        </button>
                    </div>
                </div>

                <div style={{ paddingTop: '0.25rem' }}>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '1rem 1rem', fontSize: '0.875rem', fontWeight: 700, borderRadius: '0.75rem', color: 'white', backgroundColor: '#111827', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.5 : 1, transition: 'all 0.2s', border: 'none' }}
                    >
                        {loading ? 'Đang truy cập...' : 'Đăng nhập hệ thống'}
                    </button>
                </div>
            </form>

            {/* ─── Quick Login (Dev only) ──────────────────────────────── */}
            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #f3f4f6' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center', marginBottom: '0.75rem' }}>Thử nghiệm nhanh</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                    <button onClick={() => quickLogin('doctor@hospital.com', 'securePassword123')} type="button"
                        style={{ padding: '0.625rem 0.75rem', backgroundColor: '#f0fdfa', color: '#0f766e', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', border: 'none', transition: 'background-color 0.2s' }}>
                        👨‍⚕️ Bác sĩ
                    </button>
                    <button onClick={() => quickLogin('hospital@test.com', 'password123')} type="button"
                        style={{ padding: '0.625rem 0.75rem', backgroundColor: '#eff6ff', color: '#1d4ed8', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', border: 'none', transition: 'background-color 0.2s' }}>
                        🏥 Bệnh viện
                    </button>
                    <button onClick={() => quickLogin('clinic@test.com', 'password123')} type="button"
                        style={{ padding: '0.625rem 0.75rem', backgroundColor: '#fff7ed', color: '#c2410c', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', border: 'none', transition: 'background-color 0.2s' }}>
                        🏪 Phòng khám
                    </button>
                    <button onClick={() => quickLogin('super_admin@test.com', 'password123')} type="button"
                        style={{ padding: '0.625rem 0.75rem', backgroundColor: '#fff1f2', color: '#e11d48', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', border: 'none', transition: 'background-color 0.2s' }}>
                        ⚡ Admin
                    </button>
                </div>
            </div>

            <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: '#6b7280', fontWeight: 500 }}>
                Cơ sở chưa đăng ký?{' '}
                <Link href="/register" style={{ fontWeight: 700, color: '#0f766e', transition: 'color 0.2s' }}>
                    Đăng ký đối tác
                </Link>
            </p>
        </div>
    );
}