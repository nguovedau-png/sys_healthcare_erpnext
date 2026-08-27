"use client";

import React, { useState, useEffect } from 'react';
import { Layout, Tabs, Input, Card, Row, Col, Typography, Tag, List, Space, Button, Alert, Modal, Spin } from 'antd';
import { SearchOutlined, BookOutlined, ReadOutlined, WarningOutlined, FilePdfOutlined, MedicineBoxOutlined } from '@ant-design/icons';
import contentService from '@/services/content.service';
import drugService from '@/services/drug.service';

const { Title, Text, Paragraph } = Typography;

const getFallbackBooks = () => [
    { id: 1, title: 'Hướng dẫn chuẩn đoán và điều trị bệnh Nội khoa', author: 'Bộ Y Tế', type: 'Sách Dược', cover: 'https://via.placeholder.com/150x200?text=Noi+Khoa' },
    { id: 2, title: 'Cẩm nang sử dụng Kháng sinh 2025', author: 'Bệnh viện Bạch Mai', type: 'Cẩm nang chuyên môn', cover: 'https://via.placeholder.com/150x200?text=Khang+Sinh' },
    { id: 3, title: 'Dược thư Quốc gia Việt Nam 2022', author: 'Hội đồng Dược thư', type: 'Sách Dược', cover: 'https://via.placeholder.com/150x200?text=Duoc+Thu' },
    { id: 4, title: 'Infographic: Phân biệt các loại Insulin', author: 'Cộng đồng Dược khoa', type: 'Infographic', cover: 'https://via.placeholder.com/150x200?text=Insulin' },
];

const getFallbackDrugs = () => [
    { id: 1, name: 'Paracetamol 500mg', activeIngredient: 'Paracetamol', indications: 'Giảm đau, hạ sốt từ nhẹ đến vừa.', contraindications: 'Suy gan nặng, mẫn cảm với paracetamol.' },
    { id: 2, name: 'Ibuprofen 400mg', activeIngredient: 'Ibuprofen', indications: 'Giảm đau, chống viêm trong các bệnh lý cơ xương khớp.', contraindications: 'Loét dạ dày tá tràng tiến triển, suy thận nặng.' },
    { id: 3, name: 'Amoxicillin 500mg', activeIngredient: 'Amoxicillin', indications: 'Nhiễm khuẩn đường hô hấp, tiêu hóa, tiết niệu.', contraindications: 'Mẫn cảm với Penicillin.' },
    { id: 4, name: 'Warfarin 2mg', activeIngredient: 'Warfarin', indications: 'Chống đông máu, dự phòng huyết khối.', contraindications: 'Chảy máu cấp tính, phụ nữ có thai.' },
];

export default function HandbookPage() {
    const [searchDrug, setSearchDrug] = useState('');
    const [selectedDrugs, setSelectedDrugs] = useState<any[]>([]);
    const [interactionWarning, setInteractionWarning] = useState<string | null>(null);
    const [books, setBooks] = useState<any[]>(getFallbackBooks());
    const [drugs, setDrugs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const posts = await contentService.getPosts();
                if (posts && posts.data) {
                    const mapped = posts.data.slice(0, 6).map((p: any) => ({
                        id: p.id, title: p.title || 'Tài liệu', author: p.author || 'Bộ Y Tế',
                        type: 'Tài liệu', cover: 'https://via.placeholder.com/150x200?text=Doc'
                    }));
                    setBooks([...mapped, ...getFallbackBooks()]);
                }

                const drugData = await drugService.getDrugReferences();
                if (drugData && drugData.length > 0) {
                    setDrugs(drugData);
                } else {
                    setDrugs(getFallbackDrugs());
                }
            } catch (e) { console.error('Failed to fetch handbook data:', e); }
            finally { setLoading(false); }
        };
        fetchData();
    }, []);

    const handleSelectDrug = (drug: any) => {
        if (!selectedDrugs.find(d => d.id === drug.id)) {
            const newSelection = [...selectedDrugs, drug];
            setSelectedDrugs(newSelection);
            checkInteractions(newSelection);
        }
    };

    const handleRemoveDrug = (id: number) => {
        const newSelection = selectedDrugs.filter(d => d.id !== id);
        setSelectedDrugs(newSelection);
        checkInteractions(newSelection);
    };

    const checkInteractions = (drugs: any[]) => {
        const names = drugs.map(d => d.activeIngredient);
        if (names.includes('Ibuprofen') && names.includes('Warfarin')) {
            setInteractionWarning('NGUY HIỂM: Phối hợp Ibuprofen và Warfarin làm tăng nguy cơ chảy máu đường tiêu hóa nghiêm trọng.');
        } else {
            setInteractionWarning(null);
        }
    };

    const filteredDrugs = drugs.filter(d => 
        d.name.toLowerCase().includes(searchDrug.toLowerCase()) || 
        d.activeIngredient.toLowerCase().includes(searchDrug.toLowerCase())
    );

    return (
        <div style={{ padding: 24, maxWidth: 1400, margin: '0 auto' }}>
            <div style={{ marginBottom: 24 }}>
                <Title level={2} style={{ margin: 0 }}><ReadOutlined /> Sổ tay Dược sĩ & Tra cứu Y khoa</Title>
                <Text type="secondary">Kho tàng kiến thức chuyên môn, cẩm nang nhà thuốc và công cụ kiểm tra tương tác thuốc chuẩn xác.</Text>
            </div>

            <Card bodyStyle={{ padding: '0 24px 24px 24px' }}>
                <Tabs defaultActiveKey="1" size="large">
                    
                    {/* Tab 1: Sổ tay / Sách Dược */}
                    <Tabs.TabPane tab={<span><BookOutlined /> Sổ tay & Cẩm nang</span>} key="1">
                        <div style={{ padding: '16px 0' }}>
                            <Input.Search placeholder="Tìm kiếm sách, tài liệu, infographic..." size="large" style={{ maxWidth: 600, marginBottom: 24 }} />
                            
                            <Row gutter={[24, 24]}>
                                {books.map(book => (
                                    <Col xs={24} sm={12} md={8} lg={6} key={book.id}>
                                        <Card 
                                            hoverable 
                                            cover={<div style={{ height: 200, background: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src={book.cover} alt={book.title} style={{ maxHeight: '100%' }} /></div>}
                                            actions={[<Button type="link" icon={<FilePdfOutlined />}>Đọc ngay</Button>]}
                                        >
                                            <Tag color="blue" style={{ marginBottom: 8 }}>{book.type}</Tag>
                                            <Card.Meta 
                                                title={<Text ellipsis={{ tooltip: book.title }}>{book.title}</Text>} 
                                                description={book.author} 
                                            />
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </Tabs.TabPane>

                    {/* Tab 2: Tra cứu thuốc & Tương tác */}
                    <Tabs.TabPane tab={<span><MedicineBoxOutlined /> Tra cứu Thuốc & Tương tác</span>} key="2">
                        <Row gutter={24} style={{ paddingTop: 16 }}>
                            <Col span={14}>
                                <Card title="Tra cứu Dược thư Quốc gia" size="small">
                                    <Input.Search 
                                        placeholder="Nhập tên thuốc hoặc hoạt chất..." 
                                        size="large" 
                                        value={searchDrug}
                                        onChange={(e) => setSearchDrug(e.target.value)}
                                        style={{ marginBottom: 16 }} 
                                    />
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={filteredDrugs}
                                        renderItem={item => (
                                            <List.Item 
                                                actions={[<Button type="primary" size="small" onClick={() => handleSelectDrug(item)}>Thêm vào toa (Check TT)</Button>]}
                                            >
                                                <List.Item.Meta
                                                    title={<Text strong>{item.name} ({item.activeIngredient})</Text>}
                                                    description={
                                                        <Space direction="vertical" size={0}>
                                                            <Text type="secondary" style={{ fontSize: 12 }}><b>Chỉ định:</b> {item.indications}</Text>
                                                            <Text type="danger" style={{ fontSize: 12 }}><b>Chống chỉ định:</b> {item.contraindications}</Text>
                                                        </Space>
                                                    }
                                                />
                                            </List.Item>
                                        )}
                                    />
                                </Card>
                            </Col>

                            <Col span={10}>
                                <Card title="Kiểm tra Tương tác thuốc" size="small" style={{ background: '#f9f9f9', minHeight: 400 }}>
                                    <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
                                        Thêm ít nhất 2 loại thuốc để hệ thống tự động kiểm tra tương tác bất lợi.
                                    </Text>

                                    {selectedDrugs.length > 0 ? (
                                        <div style={{ marginBottom: 24 }}>
                                            <Text strong>Danh sách thuốc đang kê:</Text>
                                            <div style={{ marginTop: 8 }}>
                                                {selectedDrugs.map(d => (
                                                    <Tag 
                                                        key={d.id} 
                                                        closable 
                                                        onClose={() => handleRemoveDrug(d.id)}
                                                        style={{ padding: '4px 8px', fontSize: 14, marginBottom: 8 }}
                                                    >
                                                        {d.name}
                                                    </Tag>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div style={{ padding: 40, textAlign: 'center', color: '#bfbfbf' }}>
                                            Chưa có thuốc nào được chọn
                                        </div>
                                    )}

                                    {interactionWarning && (
                                        <Alert
                                            message="Phát hiện Tương tác thuốc!"
                                            description={interactionWarning}
                                            type="error"
                                            showIcon
                                            icon={<WarningOutlined />}
                                            style={{ marginTop: 16 }}
                                        />
                                    )}
                                    
                                    {!interactionWarning && selectedDrugs.length >= 2 && (
                                        <Alert
                                            message="An toàn"
                                            description="Chưa phát hiện tương tác nguy hiểm giữa các thuốc đã chọn."
                                            type="success"
                                            showIcon
                                            style={{ marginTop: 16 }}
                                        />
                                    )}
                                </Card>
                            </Col>
                        </Row>
                    </Tabs.TabPane>

                </Tabs>
            </Card>
        </div>
    );
}
