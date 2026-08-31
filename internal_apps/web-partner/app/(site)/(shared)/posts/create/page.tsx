"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function CreatePostPage() {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');

    return (
        <div style={{ maxWidth: '56rem', margin: '0 auto', paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link href="/posts" style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem', backgroundColor: '#fff', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', transition: 'all 0.2s' }}>
                        <i className="fi flaticon-left-arrow-1" style={{ fontSize: '0.875rem' }}></i>
                    </Link>
                    <div>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827' }}>Viết bài mới</h1>
                        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Chia sẻ kiến thức y khoa với cộng đồng</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button style={{ padding: '0.5rem 1.25rem', backgroundColor: '#fff', border: '1px solid #e5e7eb', color: '#374151', fontWeight: 700, borderRadius: '0.75rem', transition: 'all 0.2s' }}>Lưu nháp</button>
                    <button style={{ padding: '0.5rem 1.25rem', backgroundColor: 'var(--ant-primary)', color: '#fff', fontWeight: 700, borderRadius: '0.75rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', transition: 'all 0.2s', transform: 'translateY(0)' }}>Xuất bản</button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, minmax(0, 1fr))', gap: '1.5rem' }}>
                <div style={{ gridColumn: 'span 1 / span 1' }}>
                    <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', border: '1px solid #f3f4f6' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem' }}>Tiêu đề bài viết</label>
                                <input
                                    type="text"
                                    placeholder="Nhập tiêu đề..."
                                    style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #e5e7eb', borderRadius: '0.75rem', outline: 'none', fontWeight: 700, fontSize: '1.125rem' }}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem' }}>Nội dung</label>
                                <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.75rem', overflow: 'hidden' }}>
                                    <div style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb', padding: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                                        <button style={{ width: '2rem', height: '2rem', borderRadius: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fi flaticon-bold"></i></button>
                                        <button style={{ width: '2rem', height: '2rem', borderRadius: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fi flaticon-italic"></i></button>
                                        <button style={{ width: '2rem', height: '2rem', borderRadius: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fi flaticon-underline"></i></button>
                                        <div style={{ width: '1px', height: '1.5rem', backgroundColor: '#d1d5db', margin: '0 0.25rem', alignSelf: 'center' }}></div>
                                        <button style={{ width: '2rem', height: '2rem', borderRadius: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fi flaticon-list-1"></i></button>
                                        <button style={{ width: '2rem', height: '2rem', borderRadius: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fi flaticon-list"></i></button>
                                        <div style={{ width: '1px', height: '1.5rem', backgroundColor: '#d1d5db', margin: '0 0.25rem', alignSelf: 'center' }}></div>
                                        <button style={{ width: '2rem', height: '2rem', borderRadius: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fi flaticon-picture"></i></button>
                                        <button style={{ width: '2rem', height: '2rem', borderRadius: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fi flaticon-link"></i></button>
                                    </div>
                                    <textarea
                                        style={{ width: '100%', padding: '1rem', height: '400px', outline: 'none', resize: 'none' }}
                                        placeholder="Nội dung bài viết..."
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', border: '1px solid #f3f4f6' }}>
                        <h3 style={{ fontWeight: 700, color: '#1f2937', marginBottom: '1rem' }}>Thông tin chung</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.5rem' }}>Chuyên mục</label>
                                <select
                                    style={{ width: '100%', padding: '0.5rem 1rem', border: '1px solid #e5e7eb', borderRadius: '0.75rem', outline: 'none', backgroundColor: '#fff' }}
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="">Chọn chuyên mục</option>
                                    <option value="song-khoe">Sống khỏe</option>
                                    <option value="y-hoc">Y học thường thức</option>
                                    <option value="benh-hoc">Bệnh học</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.5rem' }}>Ảnh đại diện</label>
                                <div style={{ border: '2px dashed #d1d5db', borderRadius: '0.75rem', padding: '2rem', textAlign: 'center', cursor: 'pointer' }}>
                                    <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.5rem' }}>
                                        <i className="fi flaticon-add"></i>
                                    </div>
                                    <p style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: 500 }}>Tải ảnh lên</p>
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.5rem' }}>Tóm tắt (Meta Desc)</label>
                                <textarea rows={4} style={{ width: '100%', padding: '0.5rem 1rem', border: '1px solid #e5e7eb', borderRadius: '0.75rem', outline: 'none', resize: 'none' }}></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}