"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Banner from '@/components/common/Banner';
import gamificationService, { Challenge, LeaderboardEntry } from '@/services/gamification.service';
import Spin from '@/components/ui/Spin';

export default function ChallengesPage() {
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [challengesData, leaderboardData] = await Promise.all([
                    gamificationService.getChallenges(),
                    gamificationService.getLeaderboard()
                ]);
                setChallenges(challengesData);
                setLeaderboard(leaderboardData);
            } catch (error) {
                console.error('Failed to fetch gamification data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);
    return (
        <div className="min-h-screen bg-[#111116] pb-24 font-sans selection:bg-orange-500 selection:text-white">

            {/* Gamification Hero Area */}
            <div className="relative pt-20 pb-20 overflow-hidden bg-[#111116] border-b border-orange-500/20">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] opacity-[0.08] mix-blend-screen object-cover"></div>
                
                {/* Fire Glow Effect */}
                <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] bg-orange-600/30 rounded-full blur-[120px] pointer-events-none transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-yellow-500/20 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-orange-400 to-red-600 rounded-lg flex items-center justify-center text-4xl shadow-[0_0_40px_rgba(249,115,22,0.6)] mb-8 transform rotate-12 hover:rotate-0 transition-transform">
                        🔥
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-wider italic">
                        Thử thách <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-400 to-red-500">Giới hạn</span>
                    </h1>
                    
                    <p className="text-orange-100/70 text-xl max-w-2xl mx-auto leading-relaxed mb-12">
                        Biến mục tiêu sức khỏe thành hành động thực tế. Tham gia giải đấu, tích lũy điểm thưởng và tranh tài cùng cộng đồng hàng triệu người.
                    </p>

                    <div className="flex justify-center gap-6 text-white mb-8">
                        <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-lg p-4 flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center"><i className="fi flaticon-coins text-yellow-400 text-xl"></i></div>
                            <div className="text-left">
                                <div className="text-xs text-white/50 uppercase font-bold tracking-widest">Xu Tích Lũy</div>
                                <div className="text-2xl font-black">12,450</div>
                            </div>
                        </div>
                        <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-lg p-4 flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center"><i className="fi flaticon-medal text-orange-400 text-xl"></i></div>
                            <div className="text-left">
                                <div className="text-xs text-white/50 uppercase font-bold tracking-widest">Thành tựu</div>
                                <div className="text-2xl font-black">04 Badge</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-20 top-8">
                <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1fr] gap-8">
                    
                    {/* Active Challenges List */}
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black text-white uppercase italic tracking-wide">Nhiệm vụ Hiện tại</h2>
                            <button className="text-orange-400 font-bold hover:text-orange-300 transition-colors uppercase text-sm tracking-widest">
                                Trạng thái Bộ lọc <i className="fi flaticon-controls ml-1"></i>
                            </button>
                        </div>

                        <div className="space-y-6">
                            {isLoading ? (
                                <div className="flex justify-center py-20">
                                    <Spin size="large" tip="Đang tải thử thách..." />
                                </div>
                            ) : (
                                <>
                                    {challenges.map(challenge => (
                                        <div key={challenge.id} className="bg-[#1c1c24] border border-white/5 rounded-lg p-6 lg:p-8 flex flex-col md:flex-row gap-8 hover:border-orange-500/50 hover:shadow-[0_10px_40px_rgba(249,115,22,0.1)] transition-all relative overflow-hidden group">
                                            
                                            {/* Type Ribbon */}
                                            <div className={`absolute top-4 right-4 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/5 text-white/50 border border-white/10`}>
                                                {challenge.type}
                                            </div>

                                            {/* Progress Box */}
                                            <div className="w-32 h-32 shrink-0 bg-[#2a2a35] rounded-lg flex items-center justify-center mx-auto md:mx-0 group-hover:bg-white/10 transition-colors border border-white/5">
                                                {challenge.image ? (
                                                    <img src={challenge.image} className="w-full h-full object-cover rounded-lg opacity-50 group-hover:opacity-80 transition-opacity" />
                                                ) : (
                                                    <i className="fi flaticon-target text-5xl text-white/20 group-hover:text-white/50 transition-colors"></i>
                                                )}
                                            </div>

                                            {/* Data */}
                                            <div className="flex-1 flex flex-col">
                                                <h3 className="text-2xl font-black text-white tracking-wide mb-3 uppercase italic">{challenge.title}</h3>
                                                <p className="text-white/50 leading-relaxed text-sm mb-6 max-w-xl">{challenge.description}</p>
                                                
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-auto">
                                                    <div>
                                                        <span className="block text-[10px] uppercase font-black text-white/30 mb-1 tracking-widest">Mục tiêu</span>
                                                        <span className="text-sm font-bold text-white">{challenge.targetValue} {challenge.targetUnit}</span>
                                                    </div>
                                                    <div>
                                                        <span className="block text-[10px] uppercase font-black text-white/30 mb-1 tracking-widest">Đã tham gia</span>
                                                        <span className="text-sm font-bold text-white">{challenge.totalJoined.toLocaleString()} người</span>
                                                    </div>
                                                    <div>
                                                        <span className="block text-[10px] uppercase font-black text-white/30 mb-1 tracking-widest">Thời hạn</span>
                                                        <span className="text-sm font-bold text-orange-400">{challenge.durationDays} ngày</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action Group */}
                                            <div className="w-full md:w-auto flex flex-col justify-center gap-3 shrink-0">
                                                <button className="w-full relative group overflow-hidden bg-gradient-to-r from-orange-500 to-red-600 text-white font-black uppercase tracking-widest text-xs py-4 px-8 rounded-xl shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] transform hover:scale-105 transition-all">
                                                    <span className="absolute inset-0 bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                                                    Tham Gia Ngay
                                                </button>
                                                <div className="text-[10px] text-center text-yellow-400 font-black uppercase tracking-widest flex justify-center items-center gap-1 mt-2">
                                                    <i className="fi flaticon-gift"></i> {challenge.rewardText}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {challenges.length === 0 && (
                                        <div className="text-center py-20 bg-[#1c1c24] rounded-lg border border-white/5">
                                            <p className="text-white/30 font-bold uppercase tracking-widest">Không có thử thách nào đang diễn ra</p>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    {/* Gamification Sidebar - Leaderboard */}
                    <div className="space-y-8">
                        <div className="bg-gradient-to-b from-[#1c1c24] to-[#111116] border border-white/10 rounded-lg p-6 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"></div>
                            
                            <h3 className="text-xl font-black text-white uppercase tracking-wider mb-8 text-center italic flex items-center justify-center gap-2">
                                <i className="fi flaticon-trophy text-yellow-400"></i> Bảng Xếp Hạng
                            </h3>
                            
                            <div className="space-y-4">
                                {isLoading ? (
                                    <div className="flex justify-center py-10">
                                        <Spin tip="Đang tải..." />
                                    </div>
                                ) : (
                                    <>
                                        {leaderboard.map((user, idx) => (
                                            <div key={idx} className={`flex items-center gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors`}>
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black ${
                                                    idx === 0 ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(250,204,21,0.5)]' :
                                                    idx === 1 ? 'bg-slate-300 text-black' :
                                                    idx === 2 ? 'bg-amber-600 text-white' :
                                                    'bg-white/10 text-white/50'
                                                }`}>
                                                    {idx + 1}
                                                </div>
                                                <img src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'} className="w-12 h-12 rounded-full border-2 border-[#2a2a35] object-cover" alt={user.userName} />
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-sm font-bold text-white truncate flex items-center gap-2">
                                                        {user.userName}
                                                    </div>
                                                    <div className="text-[10px] text-white/50 font-black uppercase tracking-widest mt-0.5">{user.points} Điểm • {user.level}</div>
                                                </div>
                                            </div>
                                        ))}
                                        {leaderboard.length === 0 && (
                                            <div className="text-center py-10 text-white/20 text-xs font-bold uppercase tracking-widest">Chưa có xếp hạng</div>
                                        )}
                                    </>
                                )}
                            </div>

                            <button className="w-full mt-6 py-3 border border-white/10 text-white/50 hover:text-white hover:bg-white/5 font-bold uppercase tracking-widest text-[10px] rounded-xl transition-colors">
                                Xem toàn bộ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}
