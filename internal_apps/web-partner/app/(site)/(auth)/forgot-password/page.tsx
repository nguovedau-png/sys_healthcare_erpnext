'use client';

import React, { useState } from 'react';
import type { CSSProperties } from 'react';
import Link from 'next/link';

const styles: Record<string, CSSProperties> = {
    container: {
        display: 'flex',
        flexDirection: 'column' as const,
        height: '100%',
        justifyContent: 'center',
        width: '100%',
    },
    headerSection: {
        textAlign: 'center',
        marginBottom: '2rem',
    },
    logoLink: {
        display: 'inline-block',
        marginBottom: '1.5rem',
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoIcon: {
        width: '2.5rem',
        height: '2.5rem',
        backgroundColor: '#0f766e',
        borderRadius: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoText: {
        fontSize: '1.5rem',
        fontWeight: 700,
        letterSpacing: '-0.025em',
        color: '#111827',
    },
    iconContainer: {
        display: 'inline-flex',
        height: '4rem',
        width: '4rem',
        backgroundColor: '#0f766e',
        borderRadius: '1rem',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 10px 15px -3px rgba(15, 118, 110, 0.2)',
        marginBottom: '1.5rem',
        transform: 'rotate(-3deg)',
    },
    svgIcon: {
        width: '2rem',
        height: '2rem',
        color: '#ffffff',
    },
    heading: {
        fontSize: '1.875rem',
        fontWeight: 800,
        letterSpacing: '-0.025em',
        color: '#111827',
    },
    subtext: {
        marginTop: '0.5rem',
        fontSize: '0.875rem',
        fontWeight: 500,
        letterSpacing: '0.025em',
        lineHeight: 1.625,
        color: '#6b7280',
    },
    form: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '1.25rem',
    },
    label: {
        display: 'block',
        fontSize: '0.75rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginBottom: '0.5rem',
        marginLeft: '0.25rem',
        color: '#374151',
    },
    input: {
        width: '100%',
        padding: '0.875rem 1rem',
        backgroundColor: '#f9fafb',
        border: '1px solid transparent',
        borderRadius: '0.75rem',
        fontWeight: 500,
        fontSize: '0.875rem',
        outline: 'none',
        transition: 'all 0.2s',
    },
    buttonPrimary: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: '1rem 1rem',
        fontSize: '0.875rem',
        fontWeight: 700,
        borderRadius: '0.75rem',
        color: '#ffffff',
        backgroundColor: '#0f766e',
        boxShadow: '0 10px 15px -3px rgba(15, 118, 110, 0.2)',
        transform: 'translateY(0)',
        transition: 'all 0.2s',
    },
    linkText: {
        marginTop: '2rem',
        textAlign: 'center',
        fontSize: '0.875rem',
        fontWeight: 500,
        color: '#6b7280',
    },
    successContainer: {
        marginTop: '1rem',
        textAlign: 'center',
        border: '1px solid #f3f4f6',
        backgroundColor: '#ffffff',
        padding: '1.5rem',
        borderRadius: '1rem',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    },
    successAlert: {
        backgroundColor: '#f0fdfa',
        color: '#134e4a',
        padding: '1rem',
        borderRadius: '0.75rem',
        border: '1px solid #99f6e4',
        marginBottom: '1.5rem',
    },
    successText: {
        fontSize: '0.875rem',
        fontWeight: 700,
        textAlign: 'center',
    },
    successEmail: {
        marginTop: '0.25rem',
        color: '#042f2e',
    },
    instructionText: {
        fontSize: '0.875rem',
        fontWeight: 500,
        color: '#6b7280',
        textAlign: 'center',
        marginBottom: '2rem',
    },
    buttonSecondary: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.875rem 1rem',
        border: '1px solid transparent',
        fontSize: '0.875rem',
        fontWeight: 700,
        borderRadius: '0.75rem',
        color: '#ffffff',
        backgroundColor: '#111827',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
    buttonTertiary: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.875rem 1rem',
        fontSize: '0.875rem',
        fontWeight: 700,
        borderRadius: '0.75rem',
        color: '#6b7280',
        backgroundColor: 'transparent',
        transition: 'all 0.2s',
    },
};

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [inputFocus, setInputFocus] = useState(false);
    const [inputHover, setInputHover] = useState(false);
    const [buttonHover, setButtonHover] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Forgot password submitted:', email);
        setIsSubmitted(true);
    };

    return (
        <div style={styles.container}>
            <div style={styles.headerSection}>
                <Link href="/" style={styles.logoLink}>
                    <div style={styles.logoContainer}>
                        <div style={styles.logoIcon}>
                            <span style={{ color: '#ffffff', fontWeight: 900, fontSize: '1.25rem' }}>M</span>
                        </div>
                        <span style={styles.logoText}>MediPortal</span>
                    </div>
                </Link>
                <div style={styles.iconContainer}>
                    <svg style={styles.svgIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                    </svg>
                </div>
                <h2 style={styles.heading}>Ký gửi Mật khẩu</h2>
                <p style={styles.subtext}>
                    Vui lòng nhập Email đã đăng ký với tư cách đối tác. Hệ thống sẽ cấp lại quyền truy cập ngay.
                </p>
            </div>

            {!isSubmitted ? (
                <form style={styles.form} onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" style={styles.label}>Email Đối Tác</label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => setInputFocus(true)}
                            onBlur={() => setInputFocus(false)}
                            onMouseEnter={() => setInputHover(true)}
                            onMouseLeave={() => setInputHover(false)}
                            style={{
                                ...styles.input,
                                backgroundColor: inputFocus ? '#ffffff' : inputHover ? '#f3f4f6' : styles.input.backgroundColor,
                                border: inputFocus ? '2px solid #0f766e' : '1px solid #e5e7eb',
                                outline: inputFocus ? 'none' : styles.input.outline,
                            }}
                            placeholder="doctor@hospital.vn"
                        />
                    </div>

                    <div style={{ paddingTop: '0.5rem' }}>
                        <button
                            type="submit"
                            onMouseEnter={() => setButtonHover(true)}
                            onMouseLeave={() => setButtonHover(false)}
                            style={{
                                ...styles.buttonPrimary,
                                opacity: buttonHover ? 0.9 : 1,
                                transform: buttonHover ? 'translateY(-2px)' : 'translateY(0)',
                            }}
                        >
                            Khôi Phục Quyền Truy Cập
                        </button>
                    </div>

                    <p style={styles.linkText}>
                        Nhớ mật khẩu?{' '}
                        <Link href="/login" style={{ fontWeight: 700, color: '#0f766e', textDecoration: 'underline' }}>
                            Quay lại đăng nhập
                        </Link>
                    </p>
                </form>
            ) : (
                <div style={styles.successContainer}>
                    <div style={styles.successAlert}>
                        <p style={styles.successText}>Yêu cầu đã được xác nhận. Liên kết gửi đến<br/>
                        <span style={styles.successEmail}>{email}</span></p>
                    </div>
                    <p style={styles.instructionText}>
                        Vui lòng kiểm tra hộp thư nội bộ. Nếu không nhận được, hãy kiểm tra thư mục spam.
                    </p>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <Link href="/login" style={styles.buttonSecondary}>
                            Trở về Bảng Điều Khiển Đăng Nhập
                        </Link>
                        <button
                            onClick={() => setIsSubmitted(false)}
                            style={styles.buttonTertiary}
                        >
                            Dùng một Email khác
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}