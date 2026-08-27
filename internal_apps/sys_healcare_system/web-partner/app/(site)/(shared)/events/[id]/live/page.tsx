"use client";
import React, { useState } from 'react';

export default function SeminarLivePage() {
    const [activeTab, setActiveTab] = useState<'chat' | 'qa' | 'poll'>('chat');

    // Q&A State
    const [questions, setQuestions] = useState([
        { id: 1, user: 'Dr. Tuan', content: 'Xin hỏi thuốc này có dùng được cho phụ nữ mang thai không?', votes: 12 },
        { id: 2, user: 'Pharma Lan', content: 'Liều lượng tối đa một ngày là bao nhiêu?', votes: 8 },
        { id: 3, user: 'Minh Student', content: 'Có tác dụng phụ nào đáng lưu ý không ạ?', votes: 2 },
    ]);
    const [newQuestion, setNewQuestion] = useState('');

    const handleUpvote = (id: number) => {
        setQuestions(questions.map(q => q.id === id ? { ...q, votes: q.votes + 1 } : q).sort((a, b) => b.votes - a.votes));
    };

    const handleAsk = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newQuestion.trim()) return;
        const q = { id: Date.now(), user: 'Me', content: newQuestion, votes: 0 };
        setQuestions([...questions, q]);
        setNewQuestion('');
    };

    // Poll State
    const [pollSubmitted, setPollSubmitted] = useState(false);
    const [pollData] = useState({
        question: "Theo kinh nghiệm của bạn, nhóm thuốc nào hiệu quả nhất?",
        options: [
            { id: 'a', text: 'Nhóm SGLT2i', percent: 65 },
            { id: 'b', text: 'Nhóm GLP-1 RA', percent: 25 },
            { id: 'c', text: 'Insulin nền', percent: 10 }
        ]
    });

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-80px)]">

                {/* Main Video Area */}
                <div className="lg:col-span-3 flex flex-col">
                    <div className="flex-1 bg-black rounded-2xl overflow-hidden relative border border-gray-800 flex items-center justify-center group">
                        {/* Mock Video Player */}
                        <div className="text-center">
                            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition cursor-pointer">
                                <i className="fi flaticon-play-button text-4xl text-white ml-2"></i>
                            </div>
                            <h2 className="text-xl font-bold">Hội thảo: Cập nhật điều trị Đái tháo đường 2024</h2>
                            <p className="text-gray-400 mt-2">Đang phát trực tiếp</p>
                        </div>

                        {/* Overlay Controls */}
                        <div className="absolute top-4 left-4 flex gap-2">
                            <span className="bg-red-600 text-white px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div> LIVE
                            </span>
                        </div>
                    </div>
                </div>

                {/* Sidebar Interaction */}
                <div className="lg:col-span-1 bg-gray-800 rounded-2xl flex flex-col border border-gray-700 overflow-hidden">
                    {/* Tabs */}
                    <div className="flex border-b border-gray-700">
                        <button
                            onClick={() => setActiveTab('chat')}
                            className={`flex-1 py-3 text-sm font-bold transition ${activeTab === 'chat' ? 'text-primary border-b-2 border-primary bg-gray-700/50' : 'text-gray-400 hover:text-white'}`}
                        >
                            Chat
                        </button>
                        <button
                            onClick={() => setActiveTab('qa')}
                            className={`flex-1 py-3 text-sm font-bold transition ${activeTab === 'qa' ? 'text-primary border-b-2 border-primary bg-gray-700/50' : 'text-gray-400 hover:text-white'}`}
                        >
                            Q&A
                        </button>
                        <button
                            onClick={() => setActiveTab('poll')}
                            className={`flex-1 py-3 text-sm font-bold transition ${activeTab === 'poll' ? 'text-primary border-b-2 border-primary bg-gray-700/50' : 'text-gray-400 hover:text-white'}`}
                        >
                            Bình chọn
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 relative">
                        {/* CHAT TAB */}
                        {activeTab === 'chat' && (
                            <div className="space-y-4">
                                <div className="flex gap-2 text-sm"><span className="font-bold text-blue-400 shrink-0">Dr. Hai:</span> <span className="text-gray-300">Chào mọi người!</span></div>
                                <div className="flex gap-2 text-sm"><span className="font-bold text-green-400 shrink-0">Pharma Tien:</span> <span className="text-gray-300">Âm thanh rõ.</span></div>
                                <div className="flex gap-2 text-sm"><span className="font-bold text-purple-400 shrink-0">Admin:</span> <span className="text-gray-300">Mọi người đặt câu hỏi tab bên cạnh nhé.</span></div>
                            </div>
                        )}

                        {/* Q&A TAB */}
                        {activeTab === 'qa' && (
                            <div className="space-y-4 pb-20">
                                {questions.map(q => (
                                    <div key={q.id} className="bg-gray-700/50 p-3 rounded-xl border border-gray-600">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="font-bold text-sm text-blue-300">{q.user}</span>
                                            <button
                                                onClick={() => handleUpvote(q.id)}
                                                className="flex items-center gap-1 text-xs bg-gray-600 hover:bg-primary hover:text-white px-2 py-1 rounded-lg transition"
                                            >
                                                <i className="fi flaticon-like"></i> {q.votes}
                                            </button>
                                        </div>
                                        <p className="text-sm text-gray-200">{q.content}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* POLL TAB */}
                        {activeTab === 'poll' && (
                            <div className="space-y-6">
                                <div className="bg-primary/10 p-4 rounded-xl border border-primary/30">
                                    <h3 className="font-bold text-white mb-4">{pollData.question}</h3>
                                    {!pollSubmitted ? (
                                        <div className="space-y-3">
                                            {pollData.options.map(opt => (
                                                <button
                                                    key={opt.id}
                                                    onClick={() => setPollSubmitted(true)}
                                                    className="w-full text-left p-3 rounded-xl bg-gray-700 hover:bg-primary transition border border-gray-600 text-sm font-medium"
                                                >
                                                    {opt.text}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="space-y-4 animate-fade-in">
                                            {pollData.options.map(opt => (
                                                <div key={opt.id}>
                                                    <div className="flex justify-between text-xs mb-1">
                                                        <span>{opt.text}</span>
                                                        <span className="font-bold">{opt.percent}%</span>
                                                    </div>
                                                    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                                                        <div className="h-full bg-green-500" style={{ width: `${opt.percent}%` }}></div>
                                                    </div>
                                                </div>
                                            ))}
                                            <p className="text-center text-xs text-green-400 mt-4"><i className="fi flaticon-checked"></i> Bạn đã bình chọn</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Area (Only for Chat & Q&A) */}
                    {activeTab !== 'poll' && (
                        <div className="p-4 border-t border-gray-700 bg-gray-800">
                            {activeTab === 'qa' ? (
                                <form onSubmit={handleAsk} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newQuestion}
                                        onChange={e => setNewQuestion(e.target.value)}
                                        placeholder="Đặt câu hỏi cho diễn giả..."
                                        className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:border-primary outline-none"
                                    />
                                    <button type="submit" className="bg-primary hover:bg-primary-dark text-white p-2 rounded-xl transition font-bold text-xs uppercase px-3">
                                        Gửi
                                    </button>
                                </form>
                            ) : (
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Chat..."
                                        className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:border-primary outline-none"
                                    />
                                    <button className="bg-primary hover:bg-primary-dark text-white p-2 rounded-xl transition">
                                        <i className="fi flaticon-send"></i>
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
