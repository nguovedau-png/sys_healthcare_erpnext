"use client";

import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Avatar, Button, Space, Tag, Divider, Input, List, Modal, Radio, Form, message, Breadcrumb, Spin } from 'antd';
import { 
    HeartOutlined, 
    HeartFilled, 
    MessageOutlined, 
    ShareAltOutlined, 
    BookOutlined,
    BookFilled,
    ArrowLeftOutlined,
    CheckCircleOutlined,
    QuestionCircleOutlined,
    UserOutlined,
    TrophyOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import contentService from '@/services/content.service';

const { Title, Text, Paragraph } = Typography;

// --- MOCK COMMENTS ---
const INITIAL_COMMENTS = [
    {
        id: 1,
        author: 'BS. Lê Trọng Hưng',
        avatar: 'https://i.pravatar.cc/150?img=11',
        content: 'Bài viết rất hữu ích. Liệu pháp miễn dịch này đã được áp dụng rộng rãi tại các bệnh viện ở Việt Nam chưa thưa Giáo sư?',
        time: '30 phút trước',
        likes: 5,
        replies: [
            {
                id: 101,
                author: 'GS.TS Nguyễn Văn Hiển',
                avatar: 'https://i.pravatar.cc/150?img=12',
                content: 'Hiện tại đang trong giai đoạn thử nghiệm lâm sàng giai đoạn 3 tại một số bệnh viện lớn như K, Bạch Mai, Chợ Rẫy nhé bác sĩ.',
                time: '15 phút trước',
            }
        ]
    },
    {
        id: 2,
        author: 'DS. Nguyễn Thanh Tùng',
        avatar: 'https://i.pravatar.cc/150?img=15',
        content: 'Một hướng đi mới đầy triển vọng cho bệnh nhân ung thư phổi.',
        time: '1 giờ trước',
        likes: 2,
        replies: []
    }
];

const QUIZ_QUESTIONS = [
    {
        id: 1,
        question: 'Cơ chế chính của liệu pháp miễn dịch mới được đề cập trong bài viết là gì?',
        options: [
            'Tiêu diệt trực tiếp tế bào ung thư bằng hóa chất',
            'Kích hoạt hệ thống miễn dịch của cơ thể tự nhận diện và tiêu diệt tế bào ung thư',
            'Sử dụng tia xạ cường độ cao để phá hủy khối u',
            'Thay thế hoàn toàn các tế bào phổi bị hỏng'
        ],
        correctAnswer: 1
    },
    {
        id: 2,
        question: 'Liệu pháp này đang ở giai đoạn nào tại Việt Nam?',
        options: [
            'Đã được cấp phép lưu hành rộng rãi',
            'Đang nghiên cứu tiền lâm sàng (trên động vật)',
            'Đang thử nghiệm lâm sàng giai đoạn 3 tại một số bệnh viện lớn',
            'Chưa có thông tin về việc đưa về Việt Nam'
        ],
        correctAnswer: 2
    }
];

export default function NewsDetailPage() {
    const router = useRouter();
    const params = useParams<{ id: string }>();
    const [isQuizModalVisible, setIsQuizModalVisible] = useState(false);
    const [quizStep, setQuizStep] = useState(0);
    const [answers, setAnswers] = useState<any>({});
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState(INITIAL_COMMENTS);
    const [postData, setPostData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            try {
                const post = await contentService.getPost(params?.id as string);
                if (post) setPostData(post);
            } catch (e) { console.error('Failed to fetch post:', e); }
            finally { setLoading(false); }
        };
        if (params?.id) fetchPost();
    }, [params?.id]);

    const handleQuizStart = () => {
        setQuizStep(1);
    };

    const handleQuizSubmit = () => {
        if (Object.keys(answers).length < QUIZ_QUESTIONS.length) {
            message.warning('Vui lòng trả lời hết các câu hỏi!');
            return;
        }
        setQuizStep(2);
    };

    const submitComment = () => {
        if (!commentText.trim()) return;
        const newComment = {
            id: Date.now(),
            author: 'Dược sĩ/Bác sĩ (Bạn)',
            avatar: 'https://i.pravatar.cc/150?img=10',
            content: commentText,
            time: 'Vừa xong',
            likes: 0,
            replies: []
        };
        setComments([newComment, ...comments]);
        setCommentText('');
        message.success('Bình luận của bạn đã được đăng!');
    };

    return (
        <div style={{ background: '#f0f2f5', minHeight: '100vh', padding: '24px 16px' }}>
            <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                <div style={{ marginBottom: 16 }}>
                    <Breadcrumb items={[
                        { title: <Link href="/hub">Hub Portal</Link> },
                        { title: 'Chi tiết tin tức' }
                    ]} />
                </div>

                <Row gutter={24}>
                    <Col xs={24} lg={16}>
                        <Card style={{ borderRadius: 12, border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }} bodyStyle={{ padding: 32 }}>
                            <Button 
                                type="text" 
                                icon={<ArrowLeftOutlined />} 
                                onClick={() => router.back()} 
                                style={{ marginBottom: 16, padding: 0 }}
                            >
                                Quay lại
                            </Button>

                            <div style={{ marginBottom: 24 }}>
                                <Space style={{ marginBottom: 12 }}>
                                    <Tag color="blue" bordered={false}>UNG THƯ HỌC</Tag>
                                    <Text type="secondary">Đăng ngày 26/04/2026 • 15:30</Text>
                                </Space>
                                <Title level={2}>Đột phá trong điều trị Ung thư Phổi bằng liệu pháp miễn dịch mới</Title>
                                <Space>
                                    <Avatar src="https://i.pravatar.cc/150?img=12" />
                                    <div>
                                        <Text strong>GS.TS Nguyễn Văn Hiển</Text>
                                        <br />
                                        <Text type="secondary" style={{ fontSize: 12 }}>Chuyên gia Ung bướu đầu ngành</Text>
                                    </div>
                                </Space>
                            </div>

                            <div style={{ fontSize: 16, lineHeight: 1.8 }}>
                                <Paragraph>
                                    Trong thập kỷ qua, việc điều trị ung thư phổi đã chứng kiến những bước tiến vượt bậc nhờ vào sự ra đời của các liệu pháp miễn dịch. Mới đây, các nhà khoa học đã công bố kết quả nghiên cứu về một loại kháng thể đơn dòng thế hệ mới, hứa hẹn mang lại tỷ lệ sống sót cao hơn cho bệnh nhân ở giai đoạn muộn.
                                </Paragraph>
                                <img 
                                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800&h=450" 
                                    alt="Medical research" 
                                    style={{ width: '100%', borderRadius: 12, margin: '24px 0' }}
                                />
                                <Title level={4}>Cơ chế tác động mới</Title>
                                <Paragraph>
                                    Khác với hóa trị truyền thống trực tiếp tấn công cả tế bào lành và tế bào bệnh, liệu pháp này tập trung vào việc "mở khóa" các trạm kiểm soát miễn dịch mà tế bào ung thư thường sử dụng để lẩn trốn. Khi các rào cản này bị phá bỏ, hệ thống miễn dịch tự nhiên của cơ thể có thể nhận diện và tiêu diệt khối u một cách hiệu quả và ít tác dụng phụ hơn.
                                </Paragraph>
                                <Paragraph>
                                    Nghiên cứu được thực hiện trên 1.500 bệnh nhân cho thấy tỷ lệ đáp ứng hoàn toàn tăng lên 35% so với phác đồ cũ. Đây là một con số vô cùng ấn tượng trong lĩnh vực điều trị ung thư phổi không tế bào nhỏ (NSCLC).
                                </Paragraph>
                            </div>

                            <Divider />

                            {/* Interaction Bar */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Space size="large">
                                    <Button 
                                        type="text" 
                                        icon={isLiked ? <HeartFilled style={{ color: '#ff4d4f' }} /> : <HeartOutlined />} 
                                        onClick={() => setIsLiked(!isLiked)}
                                    >
                                        Thích
                                    </Button>
                                    <Button type="text" icon={<ShareAltOutlined />}>Chia sẻ</Button>
                                    <Button 
                                        type="text" 
                                        icon={isSaved ? <BookFilled style={{ color: '#1890ff' }} /> : <BookOutlined />}
                                        onClick={() => setIsSaved(!isSaved)}
                                    >
                                        Lưu bài viết
                                    </Button>
                                </Space>
                                <Button 
                                    type="primary" 
                                    icon={<QuestionCircleOutlined />} 
                                    onClick={() => setIsQuizModalVisible(true)}
                                    style={{ background: '#52c41a', border: 'none' }}
                                >
                                    LÀM TRẮC NGHIỆM TÍCH ĐIỂM
                                </Button>
                            </div>

                            <Divider />

                            {/* Comments Section */}
                            <div style={{ marginTop: 32 }}>
                                <Title level={4}><MessageOutlined /> Bình luận ({comments.length})</Title>
                                <div style={{ display: 'flex', gap: 12, marginBottom: 32, marginTop: 16 }}>
                                    <Avatar src="https://i.pravatar.cc/150?img=10" />
                                    <div style={{ flex: 1 }}>
                                        <Input.TextArea 
                                            rows={3} 
                                            placeholder="Chia sẻ ý kiến của bạn về bài viết này..." 
                                            value={commentText}
                                            onChange={(e) => setCommentText(e.target.value)}
                                            style={{ borderRadius: 8, marginBottom: 12 }}
                                        />
                                        <Button type="primary" onClick={submitComment}>Gửi bình luận</Button>
                                    </div>
                                </div>

                                <List
                                    itemLayout="vertical"
                                    dataSource={comments}
                                    renderItem={(comment) => (
                                        <List.Item key={comment.id} style={{ border: 'none', padding: '16px 0' }}>
                                            <Space align="start" style={{ width: '100%' }}>
                                                <Avatar src={comment.avatar} />
                                                <div style={{ flex: 1, background: '#f5f5f5', padding: '12px 16px', borderRadius: 12 }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                                        <Text strong>{comment.author}</Text>
                                                        <Text type="secondary" style={{ fontSize: 12 }}>{comment.time}</Text>
                                                    </div>
                                                    <Paragraph style={{ margin: 0 }}>{comment.content}</Paragraph>
                                                    <div style={{ marginTop: 8 }}>
                                                        <Space size="large">
                                                            <Text type="secondary" style={{ fontSize: 12, cursor: 'pointer' }}><HeartOutlined /> {comment.likes || 0} Thích</Text>
                                                            <Text type="secondary" style={{ fontSize: 12, cursor: 'pointer' }}>Phản hồi</Text>
                                                            <Text type="secondary" style={{ fontSize: 12, cursor: 'pointer' }}>Báo cáo</Text>
                                                        </Space>
                                                    </div>
                                                </div>
                                            </Space>
                                            
                                            {/* Replies */}
                                            {comment.replies && comment.replies.length > 0 && (
                                                <div style={{ paddingLeft: 48, marginTop: 12 }}>
                                                    {comment.replies.map(reply => (
                                                        <Space key={reply.id} align="start" style={{ width: '100%', marginBottom: 8 }}>
                                                            <Avatar size="small" src={reply.avatar} />
                                                            <div style={{ flex: 1, background: '#e6f7ff', padding: '8px 12px', borderRadius: 12 }}>
                                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                                                                    <Text strong style={{ fontSize: 13 }}>{reply.author}</Text>
                                                                    <Text type="secondary" style={{ fontSize: 11 }}>{reply.time}</Text>
                                                                </div>
                                                                <Paragraph style={{ margin: 0, fontSize: 13 }}>{reply.content}</Paragraph>
                                                            </div>
                                                        </Space>
                                                    ))}
                                                </div>
                                            )}
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </Card>
                    </Col>

                    {/* Sidebar: Related News */}
                    <Col xs={24} lg={8}>
                        <Card title="Bài viết liên quan" style={{ borderRadius: 12, border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                            <List
                                itemLayout="horizontal"
                                dataSource={[
                                    { title: 'Tương lai của y học cá thể hóa', author: 'BS. Hưng', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=200&h=150' },
                                    { title: 'Phân loại các trạm kiểm soát miễn dịch', author: 'GS. Hiển', image: 'https://images.unsplash.com/photo-1581594658553-4358a6680375?auto=format&fit=crop&q=80&w=200&h=150' },
                                    { title: 'Quản lý tác dụng phụ của liệu pháp đích', author: 'TS. Tâm', image: 'https://images.unsplash.com/photo-1584308666744-24d5e478542c?auto=format&fit=crop&q=80&w=200&h=150' }
                                ]}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<img src={item.image} style={{ width: 80, height: 60, borderRadius: 4, objectFit: 'cover' }} />}
                                            title={<Link href="#">{item.title}</Link>}
                                            description={`Tác giả: ${item.author}`}
                                        />
                                    </List.Item>
                                )}
                            />
                        </Card>

                        <Card 
                            bodyStyle={{ padding: 16, background: '#1890ff', color: '#fff', borderRadius: 12, marginTop: 24, textAlign: 'center' }}
                            style={{ border: 'none' }}
                        >
                            <TrophyOutlined style={{ fontSize: 48, marginBottom: 16, color: '#fadb14' }} />
                            <Title level={4} style={{ color: '#fff', margin: 0 }}>Tích điểm Hub!</Title>
                            <Paragraph style={{ color: 'rgba(255,255,255,0.8)', marginTop: 8 }}>
                                Hoàn thành bài trắc nghiệm nhanh để nhận ngay 100 điểm thưởng.
                            </Paragraph>
                            <Button ghost block size="large" onClick={() => setIsQuizModalVisible(true)}>Bắt đầu ngay</Button>
                        </Card>
                    </Col>
                </Row>
            </div>

            {/* Quiz Modal */}
            <Modal
                title={<span><QuestionCircleOutlined /> Trắc nghiệm nhận điểm Hub</span>}
                open={isQuizModalVisible}
                onCancel={() => { setIsQuizModalVisible(false); setQuizStep(0); }}
                footer={null}
                width={600}
                centered
            >
                {quizStep === 0 && (
                    <div style={{ textAlign: 'center', padding: '24px 0' }}>
                        <div style={{ fontSize: 64, marginBottom: 16 }}>📝</div>
                        <Title level={3}>Sẵn sàng làm bài?</Title>
                        <Paragraph>Bài trắc nghiệm gồm {QUIZ_QUESTIONS.length} câu hỏi dựa trên nội dung bài báo bạn vừa đọc.</Paragraph>
                        <Text type="secondary">Phần thưởng: 100 Điểm Hub</Text>
                        <br /><br />
                        <Button type="primary" size="large" block onClick={handleQuizStart} style={{ height: 48, borderRadius: 8 }}>BẮT ĐẦU</Button>
                    </div>
                )}

                {quizStep === 1 && (
                    <div>
                        {QUIZ_QUESTIONS.map((q, idx) => (
                            <div key={q.id} style={{ marginBottom: 24 }}>
                                <Text strong style={{ fontSize: 16 }}>{idx + 1}. {q.question}</Text>
                                <Radio.Group 
                                    style={{ width: '100%', marginTop: 12 }} 
                                    onChange={(e) => setAnswers({...answers, [q.id]: e.target.value})}
                                    value={answers[q.id]}
                                >
                                    <Space direction="vertical" style={{ width: '100%' }}>
                                        {q.options.map((opt, oIdx) => (
                                            <Radio key={oIdx} value={oIdx} style={{ padding: '8px 12px', background: '#f5f5f5', borderRadius: 8, width: '100%' }}>
                                                {opt}
                                            </Radio>
                                        ))}
                                    </Space>
                                </Radio.Group>
                            </div>
                        ))}
                        <Button type="primary" size="large" block onClick={handleQuizSubmit} style={{ height: 48, borderRadius: 8 }}>GỬI KẾT QUẢ</Button>
                    </div>
                )}

                {quizStep === 2 && (
                    <div style={{ textAlign: 'center', padding: '24px 0' }}>
                        <CheckCircleOutlined style={{ fontSize: 64, color: '#52c41a', marginBottom: 16 }} />
                        <Title level={2}>Chúc mừng!</Title>
                        <Paragraph>Bạn đã trả lời đúng {QUIZ_QUESTIONS.length}/{QUIZ_QUESTIONS.length} câu hỏi.</Paragraph>
                        <div style={{ background: '#f6ffed', border: '1px solid #b7eb8f', padding: '16px', borderRadius: 12, marginBottom: 24 }}>
                            <Text strong style={{ color: '#389e0d', fontSize: 24 }}>+100 ĐIỂM HUB</Text>
                        </div>
                        <Button type="primary" size="large" block onClick={() => setIsQuizModalVisible(false)} style={{ height: 48, borderRadius: 8 }}>HOÀN TẤT</Button>
                    </div>
                )}
            </Modal>
        </div>
    );
}
