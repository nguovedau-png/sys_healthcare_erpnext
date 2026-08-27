"use client";

import React, { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import seminarService, { SeminarAttendee, Seminar } from '@/services/seminar.service';
import { message } from 'antd';

export default function SeminarCheckinPage() {
    const [selectedSeminarId, setSelectedSeminarId] = useState<string>('');
    const [seminars, setSeminars] = useState<Seminar[]>([]);
    const [attendees, setAttendees] = useState<SeminarAttendee[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 15 });
    const [searchText, setSearchText] = useState('');
    const [stats, setStats] = useState({ total: 0, checkedIn: 0 });

    const fetchData = async () => {
        try {
            setLoading(true);
            const seminarData = await seminarService.getSeminars();
            setSeminars(seminarData);
            if (seminarData.length > 0 && !selectedSeminarId) {
                setSelectedSeminarId(seminarData[0].id.toString());
            }
        } catch (error) {
            console.error('Failed to fetch seminar check-in data', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAttendees = async () => {
        if (!selectedSeminarId) return;
        try {
            setLoading(true);
            const params: any = {
                seminarId: selectedSeminarId,
                page: pagination.current,
                limit: pagination.pageSize,
            };
            if (searchText) params.search = searchText;

            const response = await seminarService.getAttendees(params);
            setAttendees(response.data);
            setTotal(response.meta.total);
            fetchStats();
        } catch (error) {
            console.error('Failed to fetch attendees:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        if (!selectedSeminarId) return;
        try {
            const data = await seminarService.getAttendeeStats(parseInt(selectedSeminarId));
            setStats(data);
        } catch (error) {
            console.error('Failed to fetch attendee stats:', error);
        }
    };

    const handleSearch = (query: string) => {
        setSearchText(query);
        setPagination({ ...pagination, current: 1 });
    };

    useEffect(() => {
        if (searchText !== undefined && selectedSeminarId) {
            fetchAttendees();
        }
    }, [searchText]);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setPagination({ ...pagination, current: 1 });
        fetchAttendees();
    }, [selectedSeminarId]);

    useEffect(() => {
        fetchAttendees();
    }, [pagination.current, pagination.pageSize]);

    const handleCheckin = async (id: number) => {
        try {
            await seminarService.updateAttendee(id, {
                checkedIn: true,
                checkinTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });
            fetchAttendees();
        } catch (error) {
            console.error('Failed to check in', error);
        }
    };

    // Stats
    const totalReg = stats.total;
    const checkedInCount = stats.checkedIn;
    const notCheckedInCount = totalReg - checkedInCount;
    const rate = totalReg > 0 ? ((checkedInCount / totalReg) * 100).toFixed(1) : '0';

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý Check-in</h1>
                    <p className="text-gray-500 text-sm mt-1">Quét QR Code và quản lý điểm danh</p>
                </div>
                <div className="w-64">
                    <select
                        value={selectedSeminarId}
                        onChange={(e) => setSelectedSeminarId(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl bg-white text-sm font-bold"
                    >
                        <option value="">-- Chọn hội thảo --</option>
                        {seminars.map(s => (
                            <option key={s.id} value={s.id}>{s.title}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <p className="text-gray-500 text-sm mb-1">Tổng đăng ký</p>
                    <p className="text-3xl font-bold text-gray-900">{totalReg}</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <p className="text-gray-500 text-sm mb-1">Đã check-in</p>
                    <p className="text-3xl font-bold text-green-600">{checkedInCount}</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <p className="text-gray-500 text-sm mb-1">Chưa check-in</p>
                    <p className="text-3xl font-bold text-orange-600">{notCheckedInCount}</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <p className="text-gray-500 text-sm mb-1">Tỷ lệ</p>
                    <p className="text-3xl font-bold text-blue-600">{rate}%</p>
                </div>
            </div>

            {/* QR Scanner */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
                <h2 className="text-xl font-bold text-gray-900 mb-6">QR Code Scanner (Demo)</h2>
                <button
                    onClick={async () => {
                        const email = prompt('Nhập Email người tham dự để TEST check-in:');
                        if (email) {
                            await seminarService.createAttendee({
                                seminarId: parseInt(selectedSeminarId),
                                name: 'Học viên Test',
                                email: email,
                                phone: '0901234567',
                                checkedIn: false
                            });
                            fetchAttendees();
                        }
                    }}
                    className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark"
                >
                    + Thêm người đăng ký TEST
                </button>
            </div>

            {/* Attendee List */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <DataTable
                    columns={[
                        { key: 'name', label: 'Họ tên', render: (val: string) => <span className="font-medium text-gray-900">{val}</span> },
                        { key: 'email', label: 'Email' },
                        { key: 'phone', label: 'SĐT' },
                        {
                            key: 'checkedIn',
                            label: 'Check-in',
                            render: (val: boolean) => (
                                <span className={`px-2 py-1 rounded text-xs font-bold ${val ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                    {val ? 'Đã check-in' : 'Chưa check-in'}
                                </span>
                            )
                        },
                        { key: 'checkinTime', label: 'Thời gian', render: (val: string) => <span>{val || '-'}</span> },
                    ]}
                    data={attendees}
                    loading={loading}
                    searchable
                    searchPlaceholder="Tìm tên, email, sđt..."
                    onSearch={handleSearch}
                    pagination={{
                        currentPage: pagination.current,
                        totalPages: Math.ceil(total / pagination.pageSize),
                        pageSize: pagination.pageSize,
                        onPageChange: (page, pageSize) => {
                            setPagination({ current: page, pageSize: pageSize || 15 });
                        }
                    }}
                    actions={(row) => (
                        <div className="flex gap-2">
                            {!row.checkedIn && (
                                <button
                                    onClick={() => handleCheckin(row.id)}
                                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold"
                                >
                                    Check-in thủ công
                                </button>
                            )}
                            <button
                                onClick={async () => {
                                    if (confirm('Xóa đăng ký này?')) {
                                        await seminarService.deleteAttendee(row.id);
                                        fetchAttendees();
                                    }
                                }}
                                className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-bold"
                            >
                                Xóa
                            </button>
                        </div>
                    )}
                />
            </div>
        </div>
    );
}
