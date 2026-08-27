"use client";
import React, { useState } from 'react';
import { Button, Input, Form, message, Popconfirm, Space, Typography, Card, Tag, Rate, List, Avatar, Modal, Upload, Tooltip, Empty, TimePicker, Switch, Badge, Divider, Spin } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SaveOutlined, CloseOutlined, UploadOutlined, MessageOutlined, FileTextOutlined, EyeOutlined, CalendarOutlined, ClockCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import partnerService from '@/services/partner.service';
import contentService from '@/services/content.service';
import HtmlEditor from '@/components/common/HtmlEditor';

const { TextArea } = Input;
const { Text, Title } = Typography;

const getUpdateFn = (userType: string, id: number, data: any) => {
    if (!id || isNaN(id)) return Promise.resolve();
    switch (userType) {
        case 'doctor': return partnerService.updateDoctor(id, data);
        case 'hospital': return partnerService.updateHospital(id, data);
        case 'clinic': return partnerService.updateClinic(id, data);
        case 'pharmacy': return partnerService.updatePharmacy(id, data);
        case 'pharmacist': return partnerService.updatePharmacist(id, data);
        default: return Promise.resolve();
    }
};

// ─── Tab 1: Giới thiệu ─────────────────────────────────────────────────────
export const IntroTab: React.FC<{ data: any }> = ({ data }) => {
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    
    // Initial mapping from data
    const initialSpecialty = data.specialty || (data.specialties?.[0]) || (data.departments?.[0]) || data.specialistly || '';
    const [localData, setLocalData] = useState({ 
        specialty: initialSpecialty, 
        address: data.address || '', 
        exp: data.intro || data.description || '' 
    });
    const [form] = Form.useForm();

    const handleEdit = () => { form.setFieldsValue(localData); setEditing(true); };

    const handleSave = async () => {
        const vals = form.getFieldsValue();
        setSaving(true);
        try {
            const id = parseInt(data.userId || data.id || '0');
            const updatePayload: any = { 
                intro: vals.exp, 
                address: vals.address 
            };

            // Handle type-specific specialty field
            if (data.userType === 'doctor') updatePayload.specialty = vals.specialty;
            else if (data.userType === 'clinic') updatePayload.specialties = [vals.specialty];
            else if (data.userType === 'hospital') updatePayload.departments = [vals.specialty];
            else if (data.userType === 'pharmacist') updatePayload.specialistly = vals.specialty;

            await getUpdateFn(data.userType, id, updatePayload);
            setLocalData(vals);
            setEditing(false);
            message.success('Đã cập nhật thông tin!');
        } catch (error) { 
            console.error('Update failed:', error);
            message.error('Lỗi khi lưu thông tin giới thiệu. Có thể service đang bận.'); 
        }
        finally { setSaving(false); }
    };

    return (
        <div style={{ padding: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <Title level={5} style={{ margin: 0 }}>Thông tin giới thiệu</Title>
                {editing
                    ? <Space>
                        <Button size="small" icon={<CloseOutlined />} onClick={() => setEditing(false)}>Hủy</Button>
                        <Button size="small" type="primary" icon={<SaveOutlined />} loading={saving} onClick={handleSave}>Lưu</Button>
                    </Space>
                    : <Button size="small" icon={<EditOutlined />} onClick={handleEdit}>Chỉnh sửa</Button>
                }
            </div>
            {editing ? (
                <Form form={form} layout="vertical">
                    <Form.Item name="specialty" label={data.userType === 'hospital' ? 'Khoa' : 'Chuyên khoa / Lĩnh vực'}><Input /></Form.Item>
                    <Form.Item name="address" label="Địa chỉ"><Input /></Form.Item>
                    <Form.Item name="exp" label="Kinh nghiệm / Giới thiệu"><TextArea rows={6} /></Form.Item>
                </Form>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ padding: '10px 14px', background: '#fafafa', borderRadius: 8 }}><Text strong>{data.userType === 'hospital' ? 'Khoa chính' : 'Chuyên khoa'}: </Text><Text>{localData.specialty || '–'}</Text></div>
                    <div style={{ padding: '10px 14px', background: '#fafafa', borderRadius: 8 }}><Text strong>Địa chỉ: </Text><Text>{localData.address || '–'}</Text></div>
                    <div style={{ padding: '10px 14px', background: '#fafafa', borderRadius: 8, whiteSpace: 'pre-wrap' }}><Text>{localData.exp || '(Chưa có thông tin giới thiệu)'}</Text></div>
                </div>
            )}
        </div>
    );
};

// ─── Tab 2: Dịch vụ ────────────────────────────────────────────────────────
export const ServiceTab: React.FC<{ data: any }> = ({ data }) => {
    // DEBUG: console.log('ServiceTab Data:', data);
    
    // Handle both nested structure (service) and flat structure (services)
    const initialServices = React.useMemo(() => {
        const plural = Array.isArray(data.services) ? data.services : [];
        const singular = (data.service || []).flatMap((s: any, si: number) =>
            (s.services || []).map((sv: any, vi: number) => ({ ...sv, specialty: sv.specialty || s.specialty || s.speciality || sv.speciality, _key: `${si}-${vi}` }))
        );
        
        const combined = plural.length > 0 ? plural : singular;
        return combined.map((s: any, i: number) => ({ 
            ...s, 
            _key: s._key || `db-${i}`,
            specialty: s.specialty || s.speciality // Ensure both spellings work
        }));
    }, [data]);

    const [services, setServices] = useState<any[]>(initialServices);
    const [modalOpen, setModalOpen] = useState(false);
    const [editKey, setEditKey] = useState<string | null>(null);
    const [form] = Form.useForm();

    // Sync state when data changes (e.g. after reload or parent update)
    React.useEffect(() => {
        setServices(initialServices);
    }, [initialServices]);

    const openAdd = () => { setEditKey(null); form.resetFields(); setModalOpen(true); };
    const openEdit = (item: any) => { setEditKey(item._key); form.setFieldsValue(item); setModalOpen(true); };

    const handleSave = async () => {
        const vals = form.getFieldsValue();
        try {
            const id = parseInt(data.userId || data.id || '0');
            let newServices = [...services];
            if (editKey !== null) {
                newServices = newServices.map(s => s._key === editKey ? { ...s, ...vals } : s);
            } else {
                const key = `new-${Date.now()}`;
                newServices = [...newServices, { ...vals, _key: key }];
            }

            // Sync with backend
            try {
                await getUpdateFn(data.userType, id, { services: newServices });
                setServices(newServices);
                setModalOpen(false);
                message.success(editKey !== null ? 'Đã cập nhật dịch vụ!' : 'Đã thêm dịch vụ!');
            } catch (e) { 
                console.error('Sync failed:', e);
                message.error('Lỗi khi lưu vào máy chủ. Vui lòng thử lại.'); 
            }
        } catch (e) { 
            console.error(e);
            message.error('Lỗi form hoặc xử lý dữ liệu'); 
        }
    };

    const handleDelete = async (key: string) => { 
        const newServices = services.filter(s => s._key !== key);
        const id = parseInt(data.userId || data.id || '0');
        try {
            await getUpdateFn(data.userType, id, { services: newServices });
            setServices(newServices); 
            message.success('Đã xóa dịch vụ!'); 
        } catch (e) { 
            message.error('Lỗi khi xóa. Vui lòng thử lại.'); 
        }
    };

    return (
        <div style={{ padding: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <Title level={5} style={{ margin: 0 }}>Danh sách dịch vụ ({services.length})</Title>
                <Button type="primary" size="small" icon={<PlusOutlined />} onClick={openAdd}>Thêm dịch vụ</Button>
            </div>
            <List dataSource={services} rowKey="_key"
                renderItem={(item: any) => (
                    <List.Item actions={[
                        <Button key="e" type="text" size="small" icon={<EditOutlined />} onClick={() => openEdit(item)} />,
                        <Popconfirm key="d" title="Xóa dịch vụ này?" onConfirm={() => handleDelete(item._key)}><Button type="text" size="small" danger icon={<DeleteOutlined />} /></Popconfirm>
                    ]}>
                        <List.Item.Meta title={item.name} description={<><Tag color="blue">{item.specialty || item.speciality}</Tag><Text type="secondary"> · {Number(item.price || 0).toLocaleString('vi-VN')}đ</Text></>} />
                    </List.Item>
                )}
                locale={{ emptyText: 'Chưa có dịch vụ nào.' }}
            />
            <Modal open={modalOpen} title={editKey ? 'Sửa dịch vụ' : 'Thêm dịch vụ'} onCancel={() => setModalOpen(false)} onOk={handleSave} okText="Lưu">
                <Form form={form} layout="vertical">
                    <Form.Item name="specialty" label="Chuyên khoa"><Input /></Form.Item>
                    <Form.Item name="name" label="Tên dịch vụ" rules={[{ required: true }]}><Input /></Form.Item>
                    <Form.Item name="price" label="Giá (VNĐ)"><Input type="number" /></Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

// ─── Tab 3: Đánh giá (local state only) ────────────────────────────────────
export const RatingTab: React.FC<{ data: any }> = ({ data }) => {
    const [ratings, setRatings] = useState<any[]>(Array.isArray(data.rating) ? data.rating : []);
    const [replyTarget, setReplyTarget] = useState<number | null>(null);
    const [replyText, setReplyText] = useState('');

    const handleDelete = (idx: number) => { setRatings(prev => prev.filter((_, i) => i !== idx)); message.success('Đã xóa đánh giá!'); };
    const handleReply = (idx: number) => {
        setRatings(prev => prev.map((r, i) => i === idx ? { ...r, reply: replyText } : r));
        setReplyTarget(null); setReplyText(''); message.success('Đã trả lời!');
    };

    return (
        <div style={{ padding: 8 }}>
            <Title level={5} style={{ marginBottom: 16 }}>Đánh giá ({ratings.length})</Title>
            {ratings.length === 0 && <Text type="secondary">Chưa có đánh giá nào.</Text>}
            {ratings.map((r: any, i: number) => (
                <Card key={i} size="small" style={{ borderRadius: 10, marginBottom: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Space><Avatar size="small">{r.author?.name?.[0] || 'U'}</Avatar><Text strong>{r.author?.name || 'Ẩn danh'}</Text><Rate disabled value={r.vote} style={{ fontSize: 12 }} /></Space>
                        <Popconfirm title="Xóa đánh giá này?" onConfirm={() => handleDelete(i)}><Button type="text" size="small" danger icon={<DeleteOutlined />} /></Popconfirm>
                    </div>
                    <Text style={{ display: 'block', marginTop: 8 }}>{r.content}</Text>
                    {r.reply && <div style={{ marginTop: 8, padding: 8, background: '#e6f7ff', borderRadius: 6 }}><Text type="secondary">Trả lời: {r.reply}</Text></div>}
                    {replyTarget === i
                        ? <div style={{ marginTop: 8 }}>
                            <TextArea rows={2} value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Nhập phản hồi..." />
                            <Space style={{ marginTop: 8 }}>
                                <Button size="small" onClick={() => setReplyTarget(null)}>Hủy</Button>
                                <Button size="small" type="primary" onClick={() => handleReply(i)}>Gửi</Button>
                            </Space>
                        </div>
                        : <Button type="link" size="small" style={{ paddingLeft: 0, marginTop: 4 }} onClick={() => { setReplyTarget(i); setReplyText(''); }}>Trả lời</Button>
                    }
                </Card>
            ))}
        </div>
    );
};

// ─── Tab 4: Giờ làm việc ───────────────────────────────────────────────────
export const WorktimeTab: React.FC<{ data: any }> = ({ data }) => {
    const DAYS_CONFIG = [
        { label: 'Thứ Hai', key: 'monday' },
        { label: 'Thứ Ba', key: 'tuesday' },
        { label: 'Thứ Tư', key: 'wednesday' },
        { label: 'Thứ Năm', key: 'thursday' },
        { label: 'Thứ Sáu', key: 'friday' },
        { label: 'Thứ Bảy', key: 'saturday' },
        { label: 'Chủ Nhật', key: 'sunday' },
        { label: 'Ngày Lễ', key: 'holiday' },
    ];

    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [schedule, setSchedule] = useState<any>(data.worktime || {});
    const [form] = Form.useForm();

    React.useEffect(() => {
        setSchedule(data.worktime || {});
    }, [data.worktime]);

    const handleSave = async () => {
        const vals = form.getFieldsValue();
        setSaving(true);
        try {
            const id = parseInt(data.userId || data.id || '0');
            await getUpdateFn(data.userType, id, { worktime: vals });
            setSchedule(vals);
            setEditing(false);
            message.success('Đã cập nhật lịch làm việc!');
        } catch { message.error('Lỗi khi lưu lịch làm việc'); }
        finally { setSaving(false); }
    };

    return (
        <div style={{ padding: '8px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                    <Title level={4} style={{ margin: 0 }}>Lịch làm việc</Title>
                    <Text type="secondary">Quản lý thời gian phục vụ và các thông báo nghỉ</Text>
                </div>
                {editing ? (
                    <Space>
                        <Button onClick={() => setEditing(false)}>Hủy</Button>
                        <Button type="primary" icon={<SaveOutlined />} loading={saving} onClick={handleSave}>Lưu thay đổi</Button>
                    </Space>
                ) : (
                    <Button type="primary" ghost icon={<EditOutlined />} onClick={() => { form.setFieldsValue(schedule); setEditing(true); }}>Chỉnh sửa lịch</Button>
                )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: editing ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                {DAYS_CONFIG.map(day => {
                    const dayData = schedule[day.key] || { isOpen: false, time: 'Nghỉ' };
                    return (
                        <Card 
                            key={day.key} 
                            size="small" 
                            style={{ 
                                borderRadius: 12, 
                                border: '1px solid #f0f0f0',
                                background: dayData.isOpen ? '#fff' : '#fafafa'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Space>
                                    <ClockCircleOutlined style={{ color: dayData.isOpen ? '#1890ff' : '#bfbfbf' }} />
                                    <Text strong>{day.label}</Text>
                                </Space>
                                {editing ? (
                                    <Form form={form} component={false}>
                                        <Space>
                                            <Form.Item name={[day.key, 'isOpen']} valuePropName="checked" noStyle>
                                                <Switch size="small" />
                                            </Form.Item>
                                            <Form.Item name={[day.key, 'time']} noStyle>
                                                <Input size="small" placeholder="08:00 - 17:00" style={{ width: 120 }} disabled={!form.getFieldValue([day.key, 'isOpen'])} />
                                            </Form.Item>
                                        </Space>
                                    </Form>
                                ) : (
                                    <Badge 
                                        status={dayData.isOpen ? 'success' : 'default'} 
                                        text={dayData.isOpen ? (dayData.time || '08:00 - 17:00') : 'Nghỉ'} 
                                    />
                                )}
                            </div>
                        </Card>
                    );
                })}
            </div>

            <Divider style={{ margin: '32px 0 16px' }} />
            
            <Card style={{ borderRadius: 16, background: '#fff7e6', border: '1px solid #ffe7ba' }}>
                <div style={{ display: 'flex', gap: 16 }}>
                    <InfoCircleOutlined style={{ fontSize: 20, color: '#fa8c16', marginTop: 4 }} />
                    <div style={{ flex: 1 }}>
                        <Title level={5} style={{ margin: '0 0 8px', color: '#d46b08' }}>Thông báo & Ghi chú đặc biệt</Title>
                        {editing ? (
                            <Form form={form} layout="vertical">
                                <Form.Item name="specialNote" noStyle>
                                    <TextArea rows={3} placeholder="Nhập các ghi chú về ngày nghỉ lễ, nghỉ đột xuất hoặc lưu ý cho bệnh nhân..." />
                                </Form.Item>
                            </Form>
                        ) : (
                            <Text style={{ color: '#874d00' }}>
                                {schedule.specialNote || 'Hiện không có thông báo đặc biệt nào về lịch làm việc.'}
                            </Text>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    );
};

// ─── Tab 5: Hình ảnh ───────────────────────────────────────────────────────
export const GalleryTab: React.FC<{ data: any }> = ({ data }) => {
    const initialImages = React.useMemo(() => {
        return Array.isArray(data.gallery) ? data.gallery : [];
    }, [data.gallery]);

    const [images, setImages] = useState<string[]>(initialImages);
    const [uploading, setUploading] = useState(false);

    React.useEffect(() => {
        setImages(initialImages);
    }, [initialImages]);

    const handleUpload = async (info: any) => {
        if (info.file.status === 'uploading') {
            setUploading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Backend returns { id, filename, path, ... }
            const fileId = info.file.response?.id;
            const url = fileId 
                ? `http://localhost:3000/v1/files/${fileId}/download` 
                : `https://picsum.photos/seed/${Date.now()}/800/600`; 
                
            const newImages = [...images, url];
            const id = parseInt(data.userId || data.id || '0');
            try {
                await getUpdateFn(data.userType, id, { gallery: newImages });
                setImages(newImages);
                message.success('Tải lên thành công!');
            } catch (e) { message.error('Lỗi khi lưu ảnh vào hồ sơ'); }
            setUploading(false);
        } else if (info.file.status === 'error') {
            message.error('Tải lên thất bại!');
            setUploading(false);
        }
    };

    const handleDelete = async (targetUrl: string) => {
        const newImages = images.filter(u => u !== targetUrl);
        const id = parseInt(data.userId || data.id || '0');
        try {
            await getUpdateFn(data.userType, id, { gallery: newImages });
            setImages(newImages);
            message.success('Đã xóa ảnh!');
        } catch (e) { message.error('Lỗi khi xóa ảnh'); }
    };

    return (
        <div style={{ padding: '12px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                    <Title level={4} style={{ margin: 0 }}>Thư viện hình ảnh</Title>
                    <Text type="secondary">Quản lý hình ảnh hoạt động và cơ sở vật chất</Text>
                </div>
                <Upload
                    name="file"
                    action="http://localhost:3000/v1/files"
                    headers={{ 'x-user-id': data.userId || data.id || '2' }}
                    showUploadList={false}
                    onChange={handleUpload}
                >
                    <Button type="primary" icon={<UploadOutlined />} loading={uploading}>
                        Tải ảnh lên
                    </Button>
                </Upload>
            </div>

            {images.length === 0 ? (
                <Empty description="Chưa có hình ảnh nào" image={Empty.PRESENTED_IMAGE_SIMPLE} style={{ padding: '40px 0' }} />
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
                    {images.map((img, i) => (
                        <div key={i} style={{ 
                            position: 'relative', 
                            aspectRatio: '16/10', 
                            borderRadius: 12, 
                            overflow: 'hidden', 
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                            border: '1px solid #f0f0f0'
                        }}>
                            <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ 
                                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
                                background: 'rgba(0,0,0,0.4)', 
                                display: 'flex', justifyContent: 'center', alignItems: 'center',
                                opacity: 0, transition: '0.3s',
                            }} onMouseEnter={e => e.currentTarget.style.opacity = '1'} onMouseLeave={e => e.currentTarget.style.opacity = '0'}>
                                <Space>
                                    <Tooltip title="Xem ảnh">
                                        <Button shape="circle" icon={<EyeOutlined />} onClick={() => window.open(img, '_blank')} />
                                    </Tooltip>
                                    <Popconfirm title="Xóa ảnh này?" onConfirm={() => handleDelete(img)} okText="Xóa" cancelText="Hủy">
                                        <Button shape="circle" danger icon={<DeleteOutlined />} />
                                    </Popconfirm>
                                </Space>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export const QaTab: React.FC<{ data: any }> = ({ data }) => {
    const initialQa = React.useMemo(() => {
        return Array.isArray(data.qaData) ? data.qaData : (Array.isArray(data.qa) ? data.qa : []);
    }, [data.qaData, data.qa]);

    const [qaList, setQaList] = useState<any[]>(initialQa);
    const [modalOpen, setModalOpen] = useState(false);
    const [replyTarget, setReplyTarget] = useState<number | null>(null);
    const [replyText, setReplyText] = useState('');
    const [form] = Form.useForm();

    React.useEffect(() => {
        setQaList(initialQa);
    }, [initialQa]);

    const handleAdd = async () => {
        const vals = form.getFieldsValue();
        if (!vals.content?.trim()) return message.warning('Vui lòng nhập nội dung câu hỏi');
        
        const newQaItem = { 
            id: Date.now(),
            author: { name: 'Người dùng', avatar: null }, 
            content: vals.content, 
            publishDate: 'Vừa xong', 
            vote: 0, 
            reply: '' 
        };
        const newQa = [newQaItem, ...qaList];
        
        const id = parseInt(data.userId || data.id || '0');
        try {
            await getUpdateFn(data.userType, id, { qaData: newQa });
            setQaList(newQa);
            form.resetFields(); 
            setModalOpen(false); 
            message.success('Đã thêm câu hỏi!');
        } catch (e) { message.error('Lỗi khi gửi câu hỏi'); }
    };

    const handleDelete = async (targetId: number) => { 
        const newQa = qaList.filter(q => (q.id || q._key) !== targetId);
        const id = parseInt(data.userId || data.id || '0');
        try {
            await getUpdateFn(data.userType, id, { qaData: newQa });
            setQaList(newQa); 
            message.success('Đã xóa!'); 
        } catch (e) { message.error('Lỗi khi xóa'); }
    };

    const handleReply = async (idx: number) => {
        if (!replyText.trim()) return message.warning('Vui lòng nhập câu trả lời');
        const newQa = qaList.map((q, i) => i === idx ? { ...q, reply: replyText } : q);
        const id = parseInt(data.userId || data.id || '0');
        try {
            await getUpdateFn(data.userType, id, { qaData: newQa });
            setQaList(newQa);
            setReplyTarget(null); 
            setReplyText(''); 
            message.success('Đã phản hồi!');
        } catch (e) { message.error('Lỗi khi lưu phản hồi'); }
    };

    return (
        <div style={{ padding: '8px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <Title level={4} style={{ margin: 0 }}>Hỏi đáp & Phản hồi</Title>
                <Button type="primary" icon={<MessageOutlined />} onClick={() => setModalOpen(true)}>Đặt câu hỏi</Button>
            </div>

            {qaList.length === 0 ? (
                <Empty description="Chưa có câu hỏi nào" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {qaList.map((q: any, i: number) => (
                        <div key={q.id || i} style={{ 
                            padding: 20, 
                            background: '#fff', 
                            borderRadius: 16, 
                            border: '1px solid #f0f0f0',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                                <Space align="start">
                                    <Avatar src={q.author?.avatar} style={{ backgroundColor: '#1890ff' }}>
                                        {q.author?.name?.[0] || 'U'}
                                    </Avatar>
                                    <div>
                                        <Text strong style={{ fontSize: 15, display: 'block' }}>{q.author?.name || 'Người dùng ẩn danh'}</Text>
                                        <Text type="secondary" style={{ fontSize: 12 }}>{q.publishDate}</Text>
                                    </div>
                                </Space>
                                <Popconfirm title="Xóa câu hỏi này?" onConfirm={() => handleDelete(q.id || i)} okText="Xóa" cancelText="Hủy">
                                    <Button type="text" danger icon={<DeleteOutlined />} size="small" />
                                </Popconfirm>
                            </div>
                            
                            <div style={{ paddingLeft: 40 }}>
                                <Text style={{ fontSize: 15, lineHeight: '1.6', color: '#444' }}>{q.content}</Text>
                                
                                {q.reply ? (
                                    <div style={{ 
                                        marginTop: 16, 
                                        padding: '12px 16px', 
                                        background: '#f6ffed', 
                                        borderRadius: 12, 
                                        border: '1px solid #b7eb8f',
                                        position: 'relative'
                                    }}>
                                        <div style={{ marginBottom: 4 }}>
                                            <Tag color="success">Phản hồi từ bác sĩ</Tag>
                                        </div>
                                        <Text style={{ color: '#389e0d' }}>{q.reply}</Text>
                                        <Button type="link" size="small" style={{ position: 'absolute', top: 8, right: 8 }} onClick={() => { setReplyTarget(i); setReplyText(q.reply); }}>Sửa</Button>
                                    </div>
                                ) : (
                                    <div style={{ marginTop: 12 }}>
                                        {replyTarget === i ? (
                                            <div style={{ marginTop: 8 }}>
                                                <TextArea rows={3} value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Nhập câu trả lời của bạn..." autoFocus />
                                                <Space style={{ marginTop: 8 }}>
                                                    <Button size="small" onClick={() => setReplyTarget(null)}>Hủy</Button>
                                                    <Button size="small" type="primary" onClick={() => handleReply(i)}>Gửi phản hồi</Button>
                                                </Space>
                                            </div>
                                        ) : (
                                            <Button type="dashed" size="small" icon={<MessageOutlined />} onClick={() => { setReplyTarget(i); setReplyText(''); }}>Trả lời câu hỏi này</Button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Modal open={modalOpen} title="Đặt câu hỏi mới" onCancel={() => setModalOpen(false)} onOk={handleAdd} okText="Gửi câu hỏi" centered>
                <Form form={form} layout="vertical">
                    <Form.Item name="content" label="Nội dung" rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}>
                        <TextArea rows={4} placeholder="Bác sĩ ơi cho tôi hỏi..." />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

// ─── Tab 7: Bài viết ───────────────────────────────────────────────────────
export const ArticleTab: React.FC<{ data: any }> = ({ data }) => {
    const initialArticles = React.useMemo(() => {
        return Array.isArray(data.articlesData) ? data.articlesData : 
               (Array.isArray(data.articles) ? data.articles : 
               (Array.isArray(data.newsFeed) ? data.newsFeed : []));
    }, [data.articlesData, data.articles, data.newsFeed]);

    const [articles, setArticles] = useState<any[]>(initialArticles);
    const [modalOpen, setModalOpen] = useState(false);
    const [editIdx, setEditIdx] = useState<number | null>(null);
    const [form] = Form.useForm();
    const [fetchingContent, setFetchingContent] = useState(false);

    React.useEffect(() => {
        setArticles(initialArticles);
    }, [initialArticles]);

    const handleOpenEdit = async (idx: number, art: any) => {
        setEditIdx(idx);
        form.setFieldsValue(art);
        setModalOpen(true);

        if (art.contentId) {
            setFetchingContent(true);
            try {
                const post = await contentService.getPost(art.contentId);
                if (post) {
                    form.setFieldsValue({ htmlContent: post.content });
                }
            } catch (e) {
                console.error('Failed to fetch article content:', e);
                message.warning('Không thể tải nội dung chi tiết từ máy chủ.');
            } finally {
                setFetchingContent(false);
            }
        }
    };

    const handleSave = async () => {
        const vals = form.getFieldsValue();
        let newArticles = [...articles];
        
        try {
            // 1. Handle content-service sync
            let contentId = editIdx !== null ? newArticles[editIdx].contentId : null;
            
            if (contentId) {
                // Update existing content
                await contentService.updatePost(contentId, {
                    title: vals.title,
                    content: vals.htmlContent,
                    desc: vals.desc
                });
            } else {
                // Create new content in content-service
                const newPost = await contentService.createPost({
                    title: vals.title,
                    content: vals.htmlContent,
                    desc: vals.desc,
                    author: data.name || 'Bác sĩ chuyên khoa',
                    date: new Date().toLocaleDateString('vi-VN'),
                    isActive: true,
                    categoryId: 1 // Default category
                });
                contentId = newPost.id;
            }

            // 2. Prepare article item for partner-service
            const articleItem = { 
                ...vals, 
                contentId: contentId, // Store the mapping ID
                publishDate: editIdx !== null ? newArticles[editIdx].publishDate : 'Vừa xong', 
                view: vals.view || 0,
                thumbnail: vals.thumbnail || `https://picsum.photos/seed/${Date.now()}/400/250`
            };
            
            // Remove the large HTML content before saving to partner-service JSON
            delete articleItem.htmlContent;

            if (editIdx !== null) {
                newArticles[editIdx] = { ...newArticles[editIdx], ...articleItem };
            } else {
                newArticles = [articleItem, ...newArticles];
            }

            const id = parseInt(data.userId || data.id || '0');
            await getUpdateFn(data.userType, id, { articlesData: newArticles });
            setArticles(newArticles);
            setModalOpen(false);
            message.success(editIdx !== null ? 'Đã cập nhật bài viết!' : 'Đã thêm bài viết mới!');
        } catch (e) { 
            console.error('Save failed:', e);
            message.error('Lỗi khi lưu bài viết. Vui lòng kiểm tra lại kết nối.'); 
        }
    };

    const handleDelete = (idx: number) => {
        const newArticles = articles.filter((_, i) => i !== idx);
        const id = parseInt(data.userId || data.id || '0');
        getUpdateFn(data.userType, id, { articlesData: newArticles })
            .then(() => {
                setArticles(newArticles);
                message.success('Đã xóa bài viết');
            })
            .catch(() => message.error('Lỗi khi xóa bài viết'));
    };

    return (
        <div style={{ padding: '8px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                    <Title level={4} style={{ margin: 0 }}>Bài viết chuyên môn</Title>
                    <Text type="secondary">Chia sẻ kiến thức và tin tức y tế</Text>
                </div>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditIdx(null); form.resetFields(); setModalOpen(true); }}>Viết bài mới</Button>
            </div>

            {articles.length === 0 ? (
                <Empty description="Chưa có bài viết nào" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
                    {articles.map((art, i) => (
                        <Card
                            key={i}
                            hoverable
                            cover={<img alt={art.title} src={art.thumbnail} style={{ height: 180, objectFit: 'cover' }} />}
                            actions={[
                                <Tooltip title="Chỉnh sửa"><EditOutlined key="edit" onClick={() => handleOpenEdit(i, art)} /></Tooltip>,
                                <Popconfirm title="Xóa bài viết này?" onConfirm={() => handleDelete(i)} okText="Xóa" cancelText="Hủy">
                                    <DeleteOutlined key="delete" style={{ color: '#ff4d4f' }} />
                                </Popconfirm>
                            ]}
                            style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #f0f0f0' }}
                            bodyStyle={{ padding: 16 }}
                        >
                            <div style={{ marginBottom: 12 }}>
                                <Tag color="blue">{art.type === 'video' ? 'Video' : 'Bài viết'}</Tag>
                            </div>
                            <Title level={5} ellipsis={{ rows: 2 }} style={{ marginBottom: 12, height: 48 }}>{art.title}</Title>
                            <Text type="secondary" ellipsis={{ rows: 2 }} style={{ display: 'block', marginBottom: 16, fontSize: 13, height: 40 }}>{art.desc}</Text>
                            
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f5f5f5', paddingTop: 12 }}>
                                <Space style={{ fontSize: 12, color: '#8c8c8c' }}>
                                    <CalendarOutlined /> {art.publishDate}
                                </Space>
                                <Space style={{ fontSize: 12, color: '#8c8c8c' }}>
                                    <EyeOutlined /> {art.view}
                                </Space>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            <Modal 
                open={modalOpen} 
                title={editIdx !== null ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới'} 
                onCancel={() => setModalOpen(false)} 
                onOk={handleSave} 
                okText="Lưu bài viết"
                width={700}
                centered
            >
                <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
                    <Spin spinning={fetchingContent}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            <Form.Item name="title" label="Tiêu đề bài viết" rules={[{ required: true }]} style={{ gridColumn: 'span 2' }}>
                                <Input placeholder="Nhập tiêu đề hấp dẫn..." />
                            </Form.Item>
                            <Form.Item name="type" label="Loại nội dung" initialValue="article">
                                <Tag.CheckableTag checked={form.getFieldValue('type') === 'article'} onChange={() => form.setFieldsValue({ type: 'article' })}>Bài viết</Tag.CheckableTag>
                                <Tag.CheckableTag checked={form.getFieldValue('type') === 'video'} onChange={() => form.setFieldsValue({ type: 'video' })}>Video</Tag.CheckableTag>
                            </Form.Item>
                            <Form.Item name="view" label="Lượt xem ban đầu">
                                <Input type="number" placeholder="0" />
                            </Form.Item>
                        </div>
                        <Form.Item name="thumbnail" label="URL ảnh bìa (Thumbnail)">
                            <Input placeholder="https://..." prefix={<UploadOutlined />} />
                        </Form.Item>
                        <Form.Item name="desc" label="Mô tả ngắn gọn">
                            <TextArea rows={2} placeholder="Tóm tắt nội dung bài viết..." />
                        </Form.Item>
                        <Form.Item name="htmlContent" label="Nội dung bài viết">
                            <HtmlEditor 
                                value={form.getFieldValue('htmlContent')} 
                                onChange={(val) => form.setFieldsValue({ htmlContent: val })}
                                placeholder="Nhập nội dung bài viết chuyên môn tại đây..."
                            />
                        </Form.Item>
                    </Spin>
                </Form>
            </Modal>
        </div>
    );
};
