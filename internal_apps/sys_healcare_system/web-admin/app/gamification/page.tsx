"use client";

import React, { useState, useEffect } from 'react';
import gamificationService, { LeaderboardEntry, Badge, PointRule, GamificationStats } from '@/services/gamification.service';

export default function GamificationPage() {
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [badges, setBadges] = useState<Badge[]>([]);
    const [rules, setRules] = useState<PointRule[]>([]);
    const [stats, setStats] = useState<GamificationStats>({ totalPoints: 0, totalPlayers: 0, totalBadges: 0, totalRules: 0 });
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [lData, bData, rData, sData] = await Promise.all([
                gamificationService.getLeaderboard(),
                gamificationService.getBadges(),
                gamificationService.getPointRules(),
                gamificationService.getStats()
            ]);
            setLeaderboard(lData);
            setBadges(bData);
            setRules(rData);
            setStats(sData);
        } catch (error) {
            console.error('Failed to fetch gamification data', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const formatPoints = (points: number): string => {
        if (points >= 1000000) return (points / 1000000).toFixed(1) + 'M';
        if (points >= 1000) return (points / 1000).toFixed(1) + 'K';
        return points.toString();
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Gamification</h1>
                    <p className="text-gray-500 text-sm mt-1">Quản lý điểm thưởng, huy hiệu và nhiệm vụ</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={fetchData} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                        <i className="fi flaticon-refresh"></i>
                    </button>
                    <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50">
                        Tạo nhiệm vụ
                    </button>
                    <button className="px-4 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark">
                        Tạo huy hiệu
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Tổng điểm phát', value: formatPoints(stats.totalPoints), icon: 'flaticon-star', color: 'bg-yellow-500' },
                    { label: 'Người chơi', value: stats.totalPlayers.toLocaleString(), icon: 'flaticon-users', color: 'bg-blue-500' },
                    { label: 'Huy hiệu', value: stats.totalBadges.toString(), icon: 'flaticon-badge', color: 'bg-purple-500' },
                    { label: 'Quy tắc điểm', value: stats.totalRules.toString(), icon: 'flaticon-task', color: 'bg-green-500' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className={`w-10 h-10 ${stat.color} rounded-full flex items-center justify-center`}>
                                <i className={`fi ${stat.icon} text-white`}></i>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Leaderboard */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Bảng xếp hạng</h3>
                    {loading ? <div className="p-12 text-center text-gray-400 italic">Đang tải...</div> : (
                        <div className="space-y-3">
                            {leaderboard.map((user, index) => (
                                <div key={user.userId} className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-600' : 'bg-gray-300'
                                        }`}>
                                        {index + 1}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-gray-900">{user.userName}</p>
                                        <p className="text-sm text-gray-600">{user.level} • {user.badges} huy hiệu</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-primary">{user.points.toLocaleString()}</p>
                                        <p className="text-xs text-gray-500">điểm</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Badges */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Huy hiệu phổ biến</h3>
                    {loading ? <div className="p-12 text-center text-gray-400 italic">Đang tải...</div> : (
                        <div className="space-y-3">
                            {badges.map((badge) => (
                                <div key={badge.id} className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl">
                                    <div className="text-4xl">{badge.icon}</div>
                                    <div className="flex-1">
                                        <p className="font-bold text-gray-900 mb-1">{badge.name}</p>
                                        <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-bold">
                                            {badge.awarded} người đạt được
                                        </span>
                                    </div>
                                    <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-xs font-bold hover:bg-gray-200">
                                        Chỉnh sửa
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Points System */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Hệ thống điểm</h3>
                {loading ? <div className="p-12 text-center text-gray-400 italic">Đang tải...</div> : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {rules.map((item) => (
                            <div key={item.id} className="flex justify-between items-center p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition cursor-pointer" onClick={() => alert('Sửa quy tắc: ' + item.action)}>
                                <span className="text-sm text-gray-700">{item.action}</span>
                                <span className="font-bold text-primary">+{item.points}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
