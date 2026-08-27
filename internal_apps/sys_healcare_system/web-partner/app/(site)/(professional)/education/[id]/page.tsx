"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { Button, Space, Typography } from 'antd';
import { useRouter, useParams } from 'next/navigation';
import { educationService } from '@/services/education.service';

const { Title, Text, Paragraph } = Typography;

export default function CourseLearningPage() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const { id } = params;

    const [course, setCourse] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [currentLesson, setCurrentLesson] = useState<any>(null);

    useEffect(() => {
        const fetchCourse = async () => {
            if (!id) return;
            try {
                const data = await educationService.getCourse(id);
                const mappedCourse = {
                    ...data,
                    progress: 0,
                    chapters: [
                        {
                            title: 'Nội dung khóa học',
                            lessons: (data.lessons || []).map((l: any) => ({
                                id: l.id,
                                title: l.title,
                                duration: '15:00',
                                completed: false,
                                type: 'video',
                                videoUrl: l.videoUrl,
                                quizData: undefined
                            })).concat((data.quizzes || []).map((q: any) => ({
                                id: q.id,
                                title: q.title,
                                duration: '10:00',
                                completed: false,
                                type: 'quiz',
                                videoUrl: undefined,
                                quizData: (q.questions || []).map((quest: any) => ({
                                    id: quest.id,
                                    question: quest.content,
                                    options: Array.isArray(quest.options) ? quest.options : JSON.parse(quest.options || '[]'),
                                    correctAnswer: quest.correctOption
                                }))
                            })))
                        }
                    ]
                };
                setCourse(mappedCourse);
                if (mappedCourse.chapters[0].lessons.length > 0) {
                    setCurrentLesson(mappedCourse.chapters[0].lessons[0]);
                }
            } catch (error) {
                console.error('Failed to fetch course details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [id]);

    const allLessons = useMemo(() => course?.chapters?.flatMap((c: any) => c.lessons) || [], [course]);

    const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [quizScore, setQuizScore] = useState(0);

    const handleLessonSelect = (lesson: any) => {
        setCurrentLesson(lesson);
        if (lesson.type === 'quiz') {
            setQuizAnswers({});
            setQuizSubmitted(false);
            setQuizScore(0);
        }
    };

    const handleQuizOptionSelect = (questionId: string, optionIdx: number) => {
        if (quizSubmitted) return;
        setQuizAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
    };

    const submitQuiz = () => {
        if (!currentLesson.quizData) return;
        let correctCount = 0;
        currentLesson.quizData.forEach((q: any) => {
            if (quizAnswers[q.id] === q.correctAnswer) {
                correctCount++;
            }
        });
        setQuizScore(correctCount);
        setQuizSubmitted(true);
    };

    const isPass = currentLesson?.quizData && (quizScore / currentLesson.quizData.length) >= 0.7;

    if (loading) return <div style={{ padding: 48, textAlign: 'center', color: '#6b7280' }}>Đang tải nội dung khóa học...</div>;
    if (!course) return <div style={{ padding: 48, textAlign: 'center', color: '#ef4444' }}>Không tìm thấy khóa học.</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <Button type="text" onClick={() => router.back()}>
                Quay lại
            </Button>

            <div style={{ backgroundColor: 'white', borderRadius: 9, padding: 32, border: '1px solid #f3f4f6', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 24, marginBottom: 32, borderBottom: '1px solid #f3f4f6', paddingBottom: 32 }}>
                    <div>
                        <span style={{ backgroundColor: '#eff6ff', color: '#2563eb', padding: '4px 12px', borderRadius: 9, fontSize: 12, fontWeight: 700, marginBottom: 8, display: 'inline-block' }}>
                            {currentLesson?.type === 'video' ? 'Bài giảng Video' : 'Bài kiểm tra'}
                        </span>
                        <Title level={2} style={{ margin: 0, fontWeight: 900, marginTop: 8 }}>{course.name}</Title>
                        <Paragraph type="secondary">Đang học: {currentLesson?.title}</Paragraph>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 32 }}>
                    <div style={{ gridColumn: 'span 2' }}>
                        {currentLesson?.type === 'video' ? (
                            <div>
                                <div style={{ aspectRatio: '16/9', backgroundColor: '#111827', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', cursor: 'pointer', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                                    <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)' }}></div>
                                    <div style={{ width: 64, height: 64, backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 24, zIndex: 10 }}>
                                        ▶
                                    </div>
                                    {currentLesson.videoUrl && <video src={currentLesson.videoUrl} style={{ display: 'none' }} />}
                                </div>
                                <div style={{ marginTop: 24 }}>
                                    <Title level={4} style={{ marginBottom: 8, fontWeight: 700 }}>Nội dung bài học</Title>
                                    <Paragraph type="secondary">
                                        {course.description || "Mô tả chi tiết nội dung video bài giảng hoặc tài liệu đi kèm sẽ hiển thị ở đây."}
                                    </Paragraph>
                                </div>
                            </div>
                        ) : (
                            <div style={{ backgroundColor: 'white', borderRadius: 9, border: '1px solid #dbeafe', padding: 32, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                                    <Title level={4} style={{ margin: 0, fontWeight: 700 }}>📝 Bài kiểm tra trắc nghiệm</Title>
                                    <Text type="secondary">{Object.keys(quizAnswers).length} / {currentLesson?.quizData?.length || 0} câu hỏi</Text>
                                </div>

                                {quizSubmitted && (
                                    <div style={{ marginBottom: 32, padding: 24, borderRadius: 9, border: `1px solid ${isPass ? '#d1fae5' : '#fee2e2'}`, backgroundColor: isPass ? '#f0fdf4' : '#fef2f2' }}>
                                        <Title level={5} style={{ marginBottom: 8, color: isPass ? '#047857' : '#b91c1c' }}>
                                            {isPass ? '🎉 Chúc mừng! Bạn đã vượt qua bài kiểm tra.' : '⚠️ Bạn chưa đạt yêu cầu. Vui lòng thử lại.'}
                                        </Title>
                                        <Paragraph type="secondary">
                                            Điểm số của bạn: <span style={{ fontWeight: 700 }}>{quizScore}/{currentLesson?.quizData?.length}</span>
                                        </Paragraph>
                                    </div>
                                )}

                                <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                                    {currentLesson?.quizData?.map((q: any, idx: number) => {
                                        const userAnswer = quizAnswers[q.id];
                                        return (
                                            <div key={q.id} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                                <Text strong style={{ fontWeight: 700, color: '#1f2937' }}>Câu {idx + 1}: {q.question}</Text>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                                    {q.options.map((opt: string, optIdx: number) => {
                                                        let optionStyle: React.CSSProperties = { padding: 16, borderRadius: 9, border: '2px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', transition: 'all 0.2s' };
                                                        if (quizSubmitted) {
                                                            if (optIdx === q.correctAnswer) { optionStyle.backgroundColor = '#dcfce7'; optionStyle.borderColor = '#22c55e'; optionStyle.color = '#166534'; }
                                                            else if (userAnswer === optIdx && userAnswer !== q.correctAnswer) { optionStyle.backgroundColor = '#fee2e2'; optionStyle.borderColor = '#ef4444'; optionStyle.color = '#991b1b'; }
                                                            else { optionStyle.borderColor = '#f3f4f6'; optionStyle.opacity = 0.6; }
                                                        } else if (userAnswer === optIdx) {
                                                            optionStyle.backgroundColor = '#eff6ff'; optionStyle.borderColor = '#1677ff'; optionStyle.color = '#1d4ed8'; optionStyle.boxShadow = '0 1px 2px rgba(0,0,0,0.05)';
                                                        }
                                                        return (
                                                            <div key={optIdx} onClick={() => handleQuizOptionSelect(q.id, optIdx)} style={optionStyle}>
                                                                <div style={{ width: 20, height: 20, borderRadius: '50%', border: '2px solid', display: 'flex', alignItems: 'center', justifyContent: 'center', borderColor: quizSubmitted && optIdx === q.correctAnswer ? '#22c55e' : userAnswer === optIdx ? '#1677ff' : '#d1d5db', backgroundColor: quizSubmitted && optIdx === q.correctAnswer ? '#22c55e' : 'transparent', color: quizSubmitted && optIdx === q.correctAnswer ? 'white' : 'transparent' }}>
                                                                    {quizSubmitted && optIdx === q.correctAnswer && '✓'}
                                                                    {!quizSubmitted && userAnswer === optIdx && <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#1677ff' }}></div>}
                                                                </div>
                                                                <span style={{ fontWeight: 500 }}>{opt}</span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {!quizSubmitted ? (
                                    <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid #f3f4f6', display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button size="large" onClick={submitQuiz} disabled={Object.keys(quizAnswers).length < (currentLesson?.quizData?.length || 0)}>Nộp bài</Button>
                                    </div>
                                ) : (
                                    <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid #f3f4f6', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                                        {!isPass && <Button onClick={() => { setQuizAnswers({}); setQuizSubmitted(false); setQuizScore(0); }}>Làm lại</Button>}
                                        {isPass && <Button size="large" onClick={() => { const currentIndex = allLessons.findIndex((l: any) => l.id === currentLesson.id); if (currentIndex !== -1 && currentIndex < allLessons.length - 1) { handleLessonSelect(allLessons[currentIndex + 1]); } else { alert("Bạn đã hoàn thành tất cả các bài học!"); } }}>Bài tiếp theo</Button>}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div style={{ backgroundColor: '#f9fafb', borderRadius: 9, padding: 24, maxHeight: 700, overflowY: 'auto' }}>
                        <Text strong style={{ marginBottom: 16, display: 'block', fontWeight: 700 }}>Danh sách bài học</Text>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {course.chapters.map((chapter: any, idx: number) => (
                                <div key={idx}>
                                    <Text type="secondary" style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>{chapter.title}</Text>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        {chapter.lessons.map((lesson: any) => {
                                            const isActive = currentLesson?.id === lesson.id;
                                            return (
                                                <div key={lesson.id} onClick={() => handleLessonSelect(lesson)} style={{
                                                    padding: 12, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', transition: 'all 0.2s',
                                                    backgroundColor: isActive ? 'white' : lesson.completed ? '#eff6ff' : 'white',
                                                    border: isActive ? '2px solid #1677ff' : lesson.completed ? '1px solid transparent' : '1px solid #f3f4f6',
                                                    boxShadow: isActive ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
                                                }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                        <span style={{ color: lesson.type === 'quiz' ? '#6b7280' : lesson.completed ? '#1677ff' : '#9ca3af' }}>
                                                            {lesson.type === 'quiz' ? '📝' : lesson.completed ? '✓' : '▶'}
                                                        </span>
                                                        <span style={{ fontSize: 14, fontWeight: 500, color: isActive ? '#1677ff' : '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 200 }}>{lesson.title}</span>
                                                    </div>
                                                    <span style={{ fontSize: 10, opacity: 0.7 }}>{lesson.duration}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}