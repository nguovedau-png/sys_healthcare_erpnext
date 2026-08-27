"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const styles = {
    container: {
        maxWidth: '64rem',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '2rem',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: '1.5rem',
        fontWeight: 700,
        color: '#111827',
    },
    dateText: {
        color: '#6b7280',
        fontSize: '0.875rem',
        marginTop: '0.25rem',
    },
    backLink: {
        color: '#1890ff',
        fontWeight: 700,
        textDecoration: 'underline',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 1fr)',
        gap: '1.5rem',
    },
    mainContent: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '1.5rem',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: '1rem',
        border: '1px solid #f3f4f6',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        padding: '1.5rem',
    },
    cardTitle: {
        fontWeight: 700,
        color: '#111827',
        marginBottom: '1rem',
    },
    itemList: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '1rem',
    },
    itemRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '1rem',
        borderBottom: '1px solid #f3f4f6',
    },
    itemName: {
        fontWeight: 500,
        color: '#111827',
    },
    itemQuantity: {
        fontSize: '0.875rem',
        color: '#6b7280',
    },
    itemPrice: {
        fontWeight: 700,
        color: '#111827',
    },
    summarySection: {
        marginTop: '1rem',
        paddingTop: '1rem',
        borderTop: '1px solid #f3f4f6',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '0.5rem',
    },
    summaryRow: {
        display: 'flex',
        justifyContent: 'space-between',
        color: '#4b5563',
    },
    summaryTotal: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '1.25rem',
        fontWeight: 700,
        color: '#111827',
    },
    totalHighlight: {
        color: '#1890ff',
    },
    timeline: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '1rem',
    },
    timelineItem: {
        display: 'flex',
        gap: '1rem',
    },
    timelineDotDone: {
        backgroundColor: '#22c55e',
        color: '#fff',
    },
    timelineDotCurrent: {
        backgroundColor: '#3b82f6',
        color: '#fff',
    },
    timelineDotPending: {
        backgroundColor: '#e5e7eb',
        color: '#9ca3af',
    },
    timelineLineDone: {
        backgroundColor: '#22c55e',
    },
    timelineLinePending: {
        backgroundColor: '#e5e7eb',
    },
    timelineContent: {
        flex: 1,
        paddingBottom: '1rem',
    },
    timelineEvent: {
        fontWeight: 500,
    },
    timelineEventDone: {
        color: '#111827',
    },
    timelineEventCurrent: {
        color: '#2563eb',
    },
    timelineTime: {
        fontSize: '0.75rem',
        color: '#6b7280',
        marginTop: '0.25rem',
    },
    sidebar: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '1.5rem',
    },
    addressInfo: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '0.5rem',
        fontSize: '0.875rem',
    },
    addressName: {
        fontWeight: 700,
        color: '#111827',
    },
    addressDetail: {
        color: '#4b5563',
    },
    cancelButton: {
        width: '100%',
        padding: '0.75rem',
        backgroundColor: '#ef4444',
        color: '#fff',
        fontWeight: 700,
        borderRadius: '0.75rem',
        border: 'none',
        cursor: 'pointer',
    },
    modalOverlay: {
        position: 'fixed' as const,
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: '1.5rem',
        padding: '2rem',
        maxWidth: '28rem',
        width: '100%',
    },
    modalTitle: {
        fontSize: '1.25rem',
        fontWeight: 700,
        color: '#111827',
        marginBottom: '1rem',
    },
    modalText: {
        color: '#4b5563',
        marginBottom: '1.5rem',
    },
    modalButtons: {
        display: 'flex',
        gap: '0.75rem',
    },
    closeButton: {
        flex: 1,
        padding: '0.5rem',
        backgroundColor: '#f3f4f6',
        color: '#374151',
        fontWeight: 700,
        borderRadius: '0.75rem',
        border: 'none',
        cursor: 'pointer',
    },
    confirmButton: {
        flex: 1,
        padding: '0.5rem',
        backgroundColor: '#ef4444',
        color: '#fff',
        fontWeight: 700,
        borderRadius: '0.75rem',
        border: 'none',
        cursor: 'pointer',
    },
};

export default function OrderDetailPage() {
    const params = useParams<{ id: string }>();
    const [order] = useState({
        id: params.id,
        date: '2024-12-18 14:30',
        status: 'Pending',
        items: [
            { name: 'Paracetamol 500mg (Hộp 100 viên)', quantity: 2, price: 45000 },
            { name: 'Vitamin C 1000mg', quantity: 1, price: 120000 },
        ],
        subtotal: 210000,
        shipping: 30000,
        total: 240000,
        address: {
            name: 'Nguyen Van A',
            phone: '0909123456',
            address: '123 Nguyen Trai, P.Ben Thanh, Q.1, TP.HCM'
        },
        payment: 'VNPay',
        timeline: [
            { time: '2024-12-18 14:30', event: 'Đơn hàng đã được tạo', status: 'done' },
            { time: '2024-12-18 15:00', event: 'Đã xác nhận đơn hàng', status: 'done' },
            { time: '', event: 'Đang chuẩn bị hàng', status: 'current' },
            { time: '', event: 'Đang giao hàng', status: 'pending' },
            { time: '', event: 'Đã giao hàng', status: 'pending' },
        ]
    });

    const [showCancelModal, setShowCancelModal] = useState(false);

    const handleCancel = () => {
        setShowCancelModal(false);
        alert('Đơn hàng đã được hủy');
    };

    const getTimelineDotStyle = (status: string) => ({
        width: '2rem',
        height: '2rem',
        borderRadius: '9999px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...(status === 'done' ? styles.timelineDotDone :
            status === 'current' ? styles.timelineDotCurrent :
                styles.timelineDotPending),
    });

    const getTimelineLineStyle = (status: string, idx: number) => ({
        width: '2px',
        height: '3rem',
        ...(idx < order.timeline.length - 1 && (status === 'done' ? styles.timelineLineDone : styles.timelineLinePending)),
    });

    const getTimelineEventStyle = (status: string) => ({
        ...styles.timelineEvent,
        ...(status === 'done' ? styles.timelineEventDone :
            status === 'current' ? styles.timelineEventCurrent :
                styles.timelineEventDone),
    });

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>Chi tiết Đơn hàng #{order.id}</h1>
                    <p style={styles.dateText}>Đặt ngày {order.date}</p>
                </div>
                <Link href="/orders" style={styles.backLink as any}>
                    ← Quay lại
                </Link>
            </div>

            <div style={styles.grid}>
                {/* Main Content */}
                <div style={styles.mainContent}>
                    {/* Items */}
                    <div style={styles.card}>
                        <h3 style={styles.cardTitle}>Sản phẩm</h3>
                        <div style={styles.itemList}>
                            {order.items.map((item, idx) => (
                                <div key={idx} style={styles.itemRow}>
                                    <div style={{ flex: 1 }}>
                                        <p style={styles.itemName}>{item.name}</p>
                                        <p style={styles.itemQuantity}>Số lượng: {item.quantity}</p>
                                    </div>
                                    <p style={styles.itemPrice}>{(item.price * item.quantity).toLocaleString()}đ</p>
                                </div>
                            ))}
                        </div>
                        <div style={styles.summarySection}>
                            <div style={styles.summaryRow}>
                                <span>Tạm tính</span>
                                <span style={{ fontWeight: 700 }}>{order.subtotal.toLocaleString()}đ</span>
                            </div>
                            <div style={styles.summaryRow}>
                                <span>Phí vận chuyển</span>
                                <span style={{ fontWeight: 700 }}>{order.shipping.toLocaleString()}đ</span>
                            </div>
                            <div style={styles.summaryTotal}>
                                <span>Tổng cộng</span>
                                <span style={styles.totalHighlight}>{order.total.toLocaleString()}đ</span>
                            </div>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div style={styles.card}>
                        <h3 style={styles.cardTitle}>Tiến trình đơn hàng</h3>
                        <div style={styles.timeline}>
                            {order.timeline.map((step, idx) => (
                                <div key={idx} style={styles.timelineItem}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <div style={getTimelineDotStyle(step.status)}>
                                            {step.status === 'done' ? '✓' : idx + 1}
                                        </div>
                                        {idx < order.timeline.length - 1 && (
                                            <div style={getTimelineLineStyle(step.status, idx)}></div>
                                        )}
                                    </div>
                                    <div style={styles.timelineContent}>
                                        <p style={getTimelineEventStyle(step.status)}>
                                            {step.event}
                                        </p>
                                        {step.time && <p style={styles.timelineTime}>{step.time}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div style={styles.sidebar}>
                    <div style={styles.card}>
                        <h3 style={styles.cardTitle}>Địa chỉ nhận hàng</h3>
                        <div style={styles.addressInfo}>
                            <p style={styles.addressName}>{order.address.name}</p>
                            <p style={styles.addressDetail}>{order.address.phone}</p>
                            <p style={styles.addressDetail}>{order.address.address}</p>
                        </div>
                    </div>

                    <div style={styles.card}>
                        <h3 style={styles.cardTitle}>Thanh toán</h3>
                        <p style={{ ...styles.addressDetail, fontSize: '0.875rem' }}>{order.payment}</p>
                    </div>

                    {order.status === 'Pending' && (
                        <button
                            onClick={() => setShowCancelModal(true)}
                            style={styles.cancelButton}
                        >
                            Hủy đơn hàng
                        </button>
                    )}
                </div>
            </div>

            {/* Cancel Modal */}
            {showCancelModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <h3 style={styles.modalTitle}>Xác nhận hủy đơn</h3>
                        <p style={styles.modalText}>Bạn có chắc chắn muốn hủy đơn hàng #{order.id}?</p>
                        <div style={styles.modalButtons}>
                            <button
                                onClick={() => setShowCancelModal(false)}
                                style={styles.closeButton}
                            >
                                Đóng
                            </button>
                            <button
                                onClick={handleCancel}
                                style={styles.confirmButton}
                            >
                                Xác nhận hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}