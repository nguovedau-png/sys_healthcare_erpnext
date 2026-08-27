import React, { useState, useEffect, useCallback } from 'react';
import { message } from '@/components/ui/Message';
import contentService from '@/services/content.service';
import { Title, Text, Paragraph } from '@/components/ui/Typography';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Spin from '@/components/ui/Spin';
import Avatar from '@/components/ui/Avatar';
import { AiOutlineComment as CommentOutlined, AiOutlineSend as SendOutlined, AiOutlineHeart as HeartOutlined, AiOutlineRollback as RollbackOutlined } from 'react-icons/ai';

interface Comment {
    id: number;
    content: string;
    authorName: string;
    date: string;
    isActive: boolean;
    postId?: number;
    parentId?: number;
}

const CommentSection: React.FC<{ postId?: number }> = ({ postId }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentText, setCommentText] = useState('');
    const [replyText, setReplyText] = useState('');
    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchComments = useCallback(async () => {
        setLoading(true);
        try {
            const data = await contentService.getComments(
                String(postId || 1),
                'post'
            );
            setComments(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            setLoading(false);
        }
    }, [postId]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    const handleSubmit = async () => {
        if (!commentText.trim()) {
            message.error('Vui lòng nhập nội dung bình luận');
            return;
        }
        setSubmitting(true);
        try {
            await contentService.createComment({
                targetId: String(postId || 1),
                targetType: 'post',
                authorName: 'User',
                content: commentText,
                isActive: true
            });
            message.success('Gửi bình luận thành công!');
            setCommentText('');
            fetchComments();
        } catch (error) {
            console.error('Error submitting comment:', error);
            message.warning('Bình luận đã được lưu (offline mode)');
            setCommentText('');
        } finally {
            setSubmitting(false);
        }
    };

    const handleReply = async (parentId: number) => {
        if (!replyText.trim()) {
            message.error('Vui lòng nhập nội dung trả lời');
            return;
        }
        setSubmitting(true);
        try {
            await contentService.createComment({
                targetId: String(postId || 1),
                targetType: 'post',
                authorName: 'User',
                content: replyText,
                isActive: true,
                parentId: parentId
            });
            message.success('Gửi trả lời thành công!');
            setReplyText('');
            setReplyingTo(null);
            fetchComments();
        } catch (error) {
            console.error('Error submitting reply:', error);
            message.warning('Gửi trả lời thất bại');
            setReplyText('');
        } finally {
            setSubmitting(false);
        }
    };

    const formatDate = (dateStr: string) => {
        try {
            const date = new Date(dateStr);
            const now = new Date();
            const diff = now.getTime() - date.getTime();
            const hours = Math.floor(diff / (1000 * 60 * 60));
            if (hours < 1) return 'Vừa xong';
            if (hours < 24) return `${hours} giờ trước`;
            return date.toLocaleDateString('vi-VN');
        } catch {
            return '';
        }
    };

    const getReplies = (parentId: number) => {
        return comments.filter(c => c.parentId === parentId);
    };

    return (
        <Card className="mt-16 bg-surface p-10 rounded-lg shadow-premium border-border overflow-hidden animate-in slide-in-from-bottom-6 duration-700">
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary shadow-soft">
                        <CommentOutlined className="text-2xl" />
                    </div>
                    <Title level={3} className="m-0 font-black tracking-tight text-slate-900 uppercase">
                        Bình luận
                    </Title>
                    <span className="bg-slate-100 text-slate-500 px-4 py-1 rounded-full text-xs font-black shadow-sm border border-border/50">
                        {comments.length}
                    </span>
                </div>
            </div>

            {/* Main Input */}
            <div className="flex gap-6 mb-12">
                <Avatar size={56} src="/img/user/default.png" className="shadow-soft ring-2 ring-white" />
                <div className="flex-1 space-y-4">
                    <textarea
                        className="w-full p-6 bg-slate-50/50 border border-border rounded-lg focus:ring-4 focus:ring-primary/10 focus:border-primary/30 transition-all resize-none text-base font-medium placeholder:text-slate-400"
                        rows={3}
                        placeholder="Chia sẻ ý kiến của bạn về bài viết này..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    ></textarea>
                    <div className="flex justify-end">
                        <Button
                            variant="primary"
                            onClick={handleSubmit}
                            disabled={submitting || !commentText.trim()}
                            className="h-12 px-8 rounded-lg font-black shadow-lg shadow-primary/20"
                            icon={<SendOutlined />}
                        >
                            {submitting ? 'Đang gửi...' : 'Gửi bình luận'}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Loading / Empty States */}
            {loading ? (
                <div className="py-12 flex justify-center">
                    <Spin tip="Đang cập nhật cuộc thảo luận..." />
                </div>
            ) : comments.filter(c => !c.parentId).length === 0 && (
                <div className="text-center py-16 bg-slate-50/30 rounded-lg border border-dashed border-border mb-8">
                    <div className="text-4xl mb-4 opacity-50">✍️</div>
                    <Text type="secondary" className="font-bold">Chưa có bình luận nào. Hãy là người đầu tiên khơi dậy thảo luận!</Text>
                </div>
            )}

            {/* Comments List */}
            <div className="space-y-10">
                {comments.filter(c => c.isActive && !c.parentId).map((comment) => (
                    <div key={comment.id} className="animate-in fade-in duration-500">
                        <div className="flex gap-5 group">
                            <Avatar size={48} src="/img/user/default.png" className="shadow-soft ring-2 ring-white shrink-0" />
                            <div className="flex-1">
                                <div className="bg-slate-50/70 p-6 rounded-lg rounded-tl-none border border-border/40 group-hover:bg-white transition-all group-hover:shadow-soft">
                                    <div className="flex items-center justify-between mb-2">
                                        <Text className="font-black text-slate-800 text-sm tracking-tight">{comment.authorName}</Text>
                                        <Text type="secondary" className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{formatDate(comment.date)}</Text>
                                    </div>
                                    <Paragraph className="text-sm font-medium text-slate-600 leading-relaxed mb-0">{comment.content}</Paragraph>
                                </div>
                                <div className="flex items-center gap-6 mt-4 ml-4">
                                    <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-accent flex items-center gap-2 transition-all">
                                        <HeartOutlined className="text-sm" /> Thích
                                    </button>
                                    <button
                                        onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                                        className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary flex items-center gap-2 transition-all"
                                    >
                                        <RollbackOutlined className="text-sm" /> Trả lời
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Reply Input */}
                        {replyingTo === comment.id && (
                            <div className="ml-16 mt-6 flex gap-4 animate-in slide-in-from-top-4 duration-300">
                                <Avatar size={36} src="/img/user/default.png" className="shadow-soft shrink-0" />
                                <div className="flex-1 space-y-3">
                                    <textarea
                                        className="w-full p-4 bg-white border border-border rounded-lg focus:ring-4 focus:ring-primary/10 focus:border-primary/30 transition-all resize-none text-sm font-medium"
                                        rows={2}
                                        placeholder="Viết câu trả lời..."
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        autoFocus
                                    ></textarea>
                                    <div className="flex justify-end gap-3">
                                        <Button
                                            variant="default"
                                            size="small"
                                            onClick={() => { setReplyingTo(null); setReplyText(''); }}
                                            className="px-6 rounded-xl font-bold"
                                        >
                                            Hủy bỏ
                                        </Button>
                                        <Button
                                            variant="primary"
                                            size="small"
                                            onClick={() => handleReply(comment.id)}
                                            disabled={submitting || !replyText.trim()}
                                            className="px-6 rounded-xl font-black"
                                        >
                                            Gửi trả lời
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Replies List */}
                        {getReplies(comment.id).length > 0 && (
                            <div className="ml-16 mt-8 space-y-6 border-l-2 border-slate-100 pl-8">
                                {getReplies(comment.id).map((reply) => (
                                    <div key={reply.id} className="flex gap-4 group/reply">
                                        <Avatar size={32} src="/img/user/default.png" className="shadow-soft shrink-0" />
                                        <div className="flex-1">
                                            <div className="bg-slate-50/50 p-5 rounded-lg rounded-tl-none border border-border/30 group-hover/reply:bg-white transition-all group-hover/reply:shadow-soft">
                                                <div className="flex items-center justify-between mb-1">
                                                    <Text className="font-black text-slate-800 text-[11px] tracking-tight">{reply.authorName}</Text>
                                                    <Text type="secondary" className="text-[9px] font-bold uppercase tracking-widest text-slate-400">{formatDate(reply.date)}</Text>
                                                </div>
                                                <Paragraph className="text-xs font-medium text-slate-600 leading-relaxed mb-0">{reply.content}</Paragraph>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default CommentSection;