"use client";

import React, { useState, useEffect } from 'react';
import { Table, Card, Row, Col, Typography, Tag, Select, Space, Button, Input, Spin } from 'antd';
import { DownloadOutlined, FilterOutlined, BookOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import reportService from '@/services/report.service';

const { Title, Text } = Typography;

const getFallbackData = () => [
    { id: 1, name: 'bao chau', type: '', phone: '0908770719', address: '438, P.08, Quận 10, Hồ Chí Minh', b1: 'Đạt', b2: 'Đạt', b3: 'Đạt', b4: 'Đạt', result: 'done all', region: 'HCM', asm: 'A. Thi', comment: 'done all' },
    { id: 2, name: 'nhà thuốc hải đăng', type: 'NT', phone: '0982819828', address: '142 vũ trọng phụng, P.Nhân Chính, Thanh Xuân, Hà Nội', b1: 'Lỗi', b2: 'Lỗi', b3: 'Lỗi', b4: 'Lỗi', result: 'Chưa đạt', region: 'HN', asm: 'C. Quy', comment: '' },
    { id: 3, name: 'Nhà Thuốc MINH TÂM', type: 'NT', phone: '0988555420', address: '475 BÀ HẠT, P.08, Quận 10, Hồ Chí Minh', b1: 'Đạt', b2: 'Đạt', b3: 'Lỗi', b4: 'Lỗi', result: 'Đang học', region: 'HCM', asm: 'A. Thi', comment: '' },
    { id: 4, name: 'nhà thuốc hữu nghị', type: 'NT', phone: '0384880388', address: '174 hạ đình, P.Thanh Xuân Trung, Thanh Xuân, Hà Nội', b1: 'Lỗi', b2: 'Lỗi', b3: 'Lỗi', b4: 'Lỗi', result: 'Chưa đạt', region: 'HN', asm: 'C. Quy', comment: '' },
    { id: 5, name: 'NT Thái Hà', type: 'NT', phone: '0986012498', address: '88 Lò Đúc, P.Phạm Đình Hổ, Hai Bà Trưng, Hà Nội', b1: 'Đạt', b2: 'Đạt', b3: 'Đạt', b4: 'Đạt', result: 'done all', region: 'HN', asm: 'C. Quy', comment: 'done all' },
    { id: 6, name: 'nhà thuốc hương dung', type: 'NT', phone: '0362484097', address: '72a/5 phố phương mai, P.Tân Biên, Biên Hòa, Đồng Nai', b1: 'Lỗi', b2: 'Lỗi', b3: 'Lỗi', b4: 'Lỗi', result: 'Chưa đạt', region: 'Đồng Nai', asm: 'A. Tuấn', comment: '' },
    { id: 7, name: 'nt an huy cơ sở 8', type: 'NT', phone: '0388552359', address: 'Khu đô thị thanh hà, P.Dịch Vọng Cầu Giấy, Hà Nội', b1: 'Đạt', b2: 'Đạt', b3: 'Đạt', b4: 'Đạt', result: 'done all', region: 'HN', asm: 'C. Quy', comment: 'done all' },
    { id: 8, name: 'nhà thuốc hồ anh tuấn', type: 'NT', phone: '0888303616', address: 'Tầng 1 - 17T4 trung hoà, P.Nhân Chính, Thanh Xuân, Hà Nội', b1: 'Lỗi', b2: 'Lỗi', b3: 'Lỗi', b4: 'Lỗi', result: 'Chưa đạt', region: 'HN', asm: 'C. Quy', comment: '' },
];

const PIVOT_ASM = [
    { asm: 'A. Thi', count: 3, done: 2 },
    { asm: 'A. Tuấn', count: 31, done: 5 },
    { asm: 'C. Quy', count: 69, done: 30 },
    { asm: 'Chưa phân bổ', count: 179, done: 0 },
];

const PIVOT_REGION = [
    { region: 'HN', count: 69 },
    { region: 'HCM', count: 31 },
    { region: 'Đà Nẵng', count: 2 },
    { region: 'Bình Dương', count: 1 },
    { region: 'Cần Thơ', count: 1 },
    { region: 'Khánh Hòa', count: 1 },
    { region: 'Hà Tĩnh', count: 1 },
    { region: 'Nghệ An', count: 1 },
    { region: 'Phú Thọ', count: 1 },
    { region: 'Thanh Hóa', count: 1 },
];

export default function LearningReportPage() {
    const [searchText, setSearchText] = useState("");
    const [reportData, setReportData] = useState<any[]>(getFallbackData());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await reportService.getProgress();
                if (data && Array.isArray(data) && data.length > 0) {
                    setReportData(data);
                }
            } catch (e) { console.error('Failed to fetch learning report:', e); }
            finally { setLoading(false); }
        };
        fetchData();
    }, []);

    const handleExportExcel = () => {
        // Prepare data with exactly the columns from the image
        const wsData = [
            ['STT', 'ScName', 'Tên nhà thuốc', 'Số điện thoại', 'Địa chỉ', 'Bài 1', 'Bài 2', 'Bài 3', 'Bài 4', 'Results', 'Khu vực', 'ASM', 'comment']
        ];
        
        reportData.forEach((item, index) => {
            wsData.push([
                index + 1,
                '', // ScName
                item.name,
                item.phone,
                item.address,
                item.b1,
                item.b2,
                item.b3,
                item.b4,
                item.result,
                item.region,
                item.asm,
                item.comment
            ]);
        });

        const ws = XLSX.utils.aoa_to_sheet(wsData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Updated data");
        XLSX.writeFile(wb, "B107-Feb-20-Report.xlsx");
    };

    const columns = [
        { title: 'STT', dataIndex: 'id', width: 60, align: 'center' as const },
        { title: 'Tên nhà thuốc', dataIndex: 'name', render: (text: string) => <Text strong>{text.toUpperCase()}</Text> },
        { title: 'Số điện thoại', dataIndex: 'phone', width: 120 },
        { title: 'Địa chỉ', dataIndex: 'address', ellipsis: true },
        { title: 'Bài 1', dataIndex: 'b1', width: 80, align: 'center' as const, render: (val: string) => <Tag color={val === 'Đạt' ? 'green' : 'error'}>{val}</Tag> },
        { title: 'Bài 2', dataIndex: 'b2', width: 80, align: 'center' as const, render: (val: string) => <Tag color={val === 'Đạt' ? 'green' : 'error'}>{val}</Tag> },
        { title: 'Bài 3', dataIndex: 'b3', width: 80, align: 'center' as const, render: (val: string) => <Tag color={val === 'Đạt' ? 'green' : 'error'}>{val}</Tag> },
        { title: 'Bài 4', dataIndex: 'b4', width: 80, align: 'center' as const, render: (val: string) => <Tag color={val === 'Đạt' ? 'green' : 'error'}>{val}</Tag> },
        { title: 'Results', dataIndex: 'result', width: 100, align: 'center' as const, render: (val: string) => <Text strong style={{ color: val === 'done all' ? '#389e0d' : '#8c8c8c' }}>{val}</Text> },
        { title: 'Khu vực', dataIndex: 'region', width: 100 },
        { title: 'ASM', dataIndex: 'asm', width: 100 },
        { title: 'Comment', dataIndex: 'comment' },
    ];

    return (
        <div style={{ padding: 24, maxWidth: 1600, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                    <Title level={3} style={{ margin: 0, color: '#001529', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <BookOutlined /> Báo cáo Tiến độ Đào tạo Nhà thuốc
                    </Title>
                    <Text type="secondary">Báo cáo cập nhật kết quả học tập E-Detailing / E-Learning của các nhà thuốc theo ASM và Khu vực</Text>
                </div>
                <Space>
                    <Button icon={<FilterOutlined />}>Bộ lọc</Button>
                    <Button type="primary" icon={<DownloadOutlined />} style={{ background: '#389e0d' }} onClick={handleExportExcel}>Xuất Excel</Button>
                </Space>
            </div>

            <Row gutter={[24, 24]}>
                {/* Top Summaries / Pivot Tables */}
                <Col xs={24} md={12}>
                    <Card title="Thống kê theo ASM" size="small" style={{ height: '100%' }}>
                        <Table 
                            size="small" 
                            pagination={false} 
                            dataSource={PIVOT_ASM}
                            columns={[
                                { title: 'ASM', dataIndex: 'asm', key: 'asm' },
                                { title: 'Tổng nhà thuốc', dataIndex: 'count', key: 'count', align: 'center' as const },
                                { title: 'Hoàn thành (Done All)', dataIndex: 'done', key: 'done', align: 'center' as const, render: (val) => <Text type="success" strong>{val}</Text> },
                                { title: 'Tỷ lệ', key: 'rate', align: 'right' as const, render: (_, r) => <Text>{Math.round((r.done / r.count) * 100)}%</Text> }
                            ]}
                            summary={(pageData) => {
                                let totalCount = 0;
                                let totalDone = 0;
                                pageData.forEach(({ count, done }) => {
                                    totalCount += count;
                                    totalDone += done;
                                });
                                return (
                                    <Table.Summary.Row style={{ background: '#fafafa', fontWeight: 'bold' }}>
                                        <Table.Summary.Cell index={0}>Grand Total</Table.Summary.Cell>
                                        <Table.Summary.Cell index={1} align="center">{totalCount}</Table.Summary.Cell>
                                        <Table.Summary.Cell index={2} align="center">{totalDone}</Table.Summary.Cell>
                                        <Table.Summary.Cell index={3} align="right">{Math.round((totalDone / totalCount) * 100)}%</Table.Summary.Cell>
                                    </Table.Summary.Row>
                                );
                            }}
                        />
                    </Card>
                </Col>
                
                <Col xs={24} md={12}>
                    <Card title="Phân bổ theo Khu vực (Top 10)" size="small" style={{ height: '100%' }}>
                        <Table 
                            size="small" 
                            pagination={false} 
                            dataSource={PIVOT_REGION}
                            columns={[
                                { title: 'Khu vực', dataIndex: 'region', key: 'region' },
                                { title: 'Số lượng NT', dataIndex: 'count', key: 'count', align: 'center' as const },
                                { title: 'Tỷ trọng', key: 'percent', align: 'right' as const, render: (_, r) => <Text>{((r.count / 282) * 100).toFixed(1)}%</Text> }
                            ]}
                            scroll={{ y: 200 }}
                        />
                    </Card>
                </Col>

                {/* Main Data Table */}
                <Col span={24}>
                    <Card 
                        title="Báo cáo Chi tiết (Updated data B107-Feb-20)" 
                        extra={
                            <Input.Search 
                                placeholder="Tìm theo tên NT, SĐT, ASM..." 
                                style={{ width: 300 }} 
                                onSearch={setSearchText} 
                            />
                        }
                    >
                        <Table 
                            dataSource={reportData.filter(d => d.name.toLowerCase().includes(searchText.toLowerCase()) || d.phone.includes(searchText) || d.asm.toLowerCase().includes(searchText.toLowerCase()))} 
                            columns={columns} 
                            rowKey="id"
                            size="small"
                            bordered
                            scroll={{ x: 'max-content' }}
                            pagination={{ pageSize: 20, showSizeChanger: true, showTotal: (total) => `Tổng số ${total} nhà thuốc` }}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
