"use client";

import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Input, Button, Badge, Modal, Form, Select, Space, Tag, message, Avatar, Divider, Layout } from 'antd';
import { SearchOutlined, EnvironmentOutlined, DollarOutlined, SolutionOutlined, RocketOutlined, BuildOutlined, CheckCircleFilled, UserOutlined, FileTextOutlined, PhoneOutlined } from '@ant-design/icons';
import EhrPageHeader from "@/components/portal/EhrPageHeader";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const JOBS_DB = [
    { id: 1, position: "Bác sĩ Nội khoa", pharmacy: "Bệnh viện Đa khoa Quốc tế", salary: "25-45 triệu", location: "TP.HCM", type: "Full-time", requirements: "Kinh nghiệm 2 năm, chứng chỉ hành nghề", image: "https://via.placeholder.com/150?text=BV+Quoc+Te" },
    { id: 2, position: "Điều dưỡng trưởng", pharmacy: "Phòng khám Đa khoa VIP", salary: "15-20 triệu", location: "Hà Nội", type: "Full-time", requirements: "Có chứng chỉ hành nghề, giao tiếp tốt", image: "https://via.placeholder.com/150?text=PK+VIP" },
    { id: 3, position: "Dược sĩ tư vấn", pharmacy: "Nhà thuốc Healthe", salary: "12-18 triệu", location: "Đà Nẵng", type: "Part-time", requirements: "Tốt nghiệp đại học dược, làm ca", image: "https://via.placeholder.com/150?text=Nha+Thuoc" },
    { id: 4, position: "Bác sĩ Răng Hàm Mặt", pharmacy: "Nha Khoa Smile", salary: "30-50 triệu", location: "TP.HCM", type: "Full-time", requirements: "Kinh nghiệm chỉnh nha, Implant", image: "https://via.placeholder.com/150?text=Nha+Khoa" },
    { id: 5, position: "Dược sĩ lâm sàng", pharmacy: "Bệnh viện TW Huế", salary: "20-30 triệu", location: "Huế", type: "Contract", requirements: "Thạc sĩ, tiếng Anh tốt", image: "https://via.placeholder.com/150?text=BV+TW+Hue" },
    { id: 6, position: "Kỹ thuật viên xét nghiệm", pharmacy: "Phòng khám MedLab", salary: "10-15 triệu", location: "Cần Thơ", type: "Full-time", requirements: "Sử dụng thành thạo máy huyết học", image: "https://via.placeholder.com/150?text=MedLab" },
];

export default function JobMarketPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [locationFilter, setLocationFilter] = useState<string | null>(null);
    const [jobs, setJobs] = useState(JOBS_DB);
    const [applyModalOpen, setApplyModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState<any>(null);
    const [form] = Form.useForm();
    const [appliedJobs, setAppliedJobs] = useState<number[]>([]);

    useEffect(() => {
        const storedApps = localStorage.getItem('ehr_job_applications');
        if (storedApps) {
            try {
                const apps = JSON.parse(storedApps);
                setAppliedJobs(apps.map((a: any) => a.jobId));
            } catch (e) {}
        }
    }, []);

    const filteredJobs = jobs.filter(job => {
        const matchSearch = job.position.toLowerCase().includes(searchQuery.toLowerCase()) || job.pharmacy.toLowerCase().includes(searchQuery.toLowerCase());
        const matchLoc = locationFilter ? job.location === locationFilter : true;
        return matchSearch && matchLoc;
    });

    const handleApplyClick = (job: any) => {
        if (appliedJobs.includes(job.id)) {
            message.info("Bạn đã ứng tuyển vị trí này rồi!");
            return;
        }
        setSelectedJob(job);
        setApplyModalOpen(true);
    };

    const handleApplySubmit = (values: any) => {
        const application = {
            id: Date.now(),
            jobId: selectedJob.id,
            jobTitle: selectedJob.position,
            employer: selectedJob.pharmacy,
            candidateName: values.fullName,
            phone: values.phone,
            email: values.email,
            cvLink: values.cvLink,
            appliedAt: new Date().toISOString()
        };

        // Get existing apps
        const storedApps = localStorage.getItem('ehr_job_applications');
        let apps = [];
        if (storedApps) {
            try { apps = JSON.parse(storedApps); } catch(e){}
        }
        apps.push(application);
        localStorage.setItem('ehr_job_applications', JSON.stringify(apps));

        setAppliedJobs([...appliedJobs, selectedJob.id]);
        message.success({
            content: `Ứng tuyển thành công vị trí ${selectedJob.position}! Hệ thống đã gửi hồ sơ tới nhà tuyển dụng.`,
            icon: <CheckCircleFilled style={{ color: '#52c41a' }} />
        });
        setApplyModalOpen(false);
        form.resetFields();
    };

    return (
        <div style={{ paddingBottom: 60 }}>
            {/* Hero Section */}
            <div style={{ 
                background: 'linear-gradient(135deg, #001529 0%, #003a8c 100%)', 
                padding: '60px 24px', 
                borderRadius: '0 0 24px 24px',
                marginBottom: 32,
                color: 'white',
                textAlign: 'center'
            }}>
                <RocketOutlined style={{ fontSize: 48, color: '#1890ff', marginBottom: 16 }} />
                <Title level={1} style={{ color: 'white', margin: 0, fontWeight: 800 }}>Mạng lưới Việc làm Y tế</Title>
                <Paragraph style={{ color: 'rgba(255,255,255,0.7)', fontSize: 18, maxWidth: 600, margin: '16px auto 0' }}>
                    Khám phá hàng ngàn cơ hội nghề nghiệp tại các bệnh viện, phòng khám và nhà thuốc hàng đầu trên toàn quốc.
                </Paragraph>
            </div>

            <div style={{ padding: '0 24px', maxWidth: 1200, margin: '0 auto' }}>
                {/* Search Bar */}
                <Card bodyStyle={{ padding: 24 }} style={{ marginBottom: 32, borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    <Row gutter={16}>
                        <Col xs={24} md={12}>
                            <Input 
                                size="large" 
                                placeholder="Tìm theo vị trí, bệnh viện, nhà thuốc..." 
                                prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                        </Col>
                        <Col xs={24} md={8}>
                            <Select 
                                size="large" 
                                style={{ width: '100%' }} 
                                placeholder="Địa điểm" 
                                allowClear
                                onChange={setLocationFilter}
                            >
                                <Option value="TP.HCM">TP.HCM</Option>
                                <Option value="Hà Nội">Hà Nội</Option>
                                <Option value="Đà Nẵng">Đà Nẵng</Option>
                                <Option value="Cần Thơ">Cần Thơ</Option>
                                <Option value="Huế">Huế</Option>
                            </Select>
                        </Col>
                        <Col xs={24} md={4}>
                            <Button type="primary" size="large" block style={{ background: '#1890ff' }}>
                                Tìm kiếm
                            </Button>
                        </Col>
                    </Row>
                </Card>

                {/* Job List */}
                <Row gutter={[24, 24]}>
                    {filteredJobs.map(job => {
                        const isApplied = appliedJobs.includes(job.id);
                        return (
                            <Col xs={24} lg={12} key={job.id}>
                                <Card 
                                    hoverable 
                                    style={{ borderRadius: 12, overflow: 'hidden', height: '100%', border: isApplied ? '1px solid #b7eb8f' : '1px solid #f0f0f0' }}
                                    bodyStyle={{ padding: 24, display: 'flex', flexDirection: 'column', height: '100%' }}
                                >
                                    <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                                        <Avatar src={job.image} size={64} shape="square" style={{ borderRadius: 8, flexShrink: 0 }} />
                                        <div style={{ flex: 1 }}>
                                            <Title level={4} style={{ margin: 0, color: '#001529' }}>{job.position}</Title>
                                            <Space align="center" style={{ marginTop: 4 }}>
                                                <BuildOutlined style={{ color: '#8c8c8c' }} />
                                                <Text type="secondary">{job.pharmacy}</Text>
                                            </Space>
                                        </div>
                                    </div>
                                    
                                    <Space size={[16, 8]} wrap style={{ marginBottom: 16 }}>
                                        <Tag color="blue" style={{ borderRadius: 4, padding: '4px 8px' }}><DollarOutlined /> {job.salary}</Tag>
                                        <Tag color="cyan" style={{ borderRadius: 4, padding: '4px 8px' }}><EnvironmentOutlined /> {job.location}</Tag>
                                        <Tag style={{ borderRadius: 4, padding: '4px 8px' }}><SolutionOutlined /> {job.type}</Tag>
                                    </Space>

                                    <div style={{ background: '#fafafa', padding: 12, borderRadius: 8, marginBottom: 20, flex: 1 }}>
                                        <Text strong style={{ fontSize: 13 }}>Yêu cầu: </Text>
                                        <Text style={{ fontSize: 13, color: '#595959' }}>{job.requirements}</Text>
                                    </div>

                                    <Button 
                                        type={isApplied ? "default" : "primary"}
                                        size="large" 
                                        block 
                                        onClick={() => handleApplyClick(job)}
                                        disabled={isApplied}
                                        style={isApplied ? { color: '#52c41a', borderColor: '#b7eb8f', background: '#f6ffed' } : {}}
                                    >
                                        {isApplied ? "Đã ứng tuyển" : "Nộp Hồ Sơ Ngay"}
                                    </Button>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </div>

            {/* Apply Modal */}
            <Modal
                title={
                    <Space>
                        <SolutionOutlined style={{ color: '#1890ff' }} />
                        <span>Ứng tuyển vị trí {selectedJob?.position}</span>
                    </Space>
                }
                open={applyModalOpen}
                onCancel={() => setApplyModalOpen(false)}
                footer={null}
                width={500}
            >
                <div style={{ marginBottom: 24, padding: 16, background: '#f0f5ff', borderRadius: 8 }}>
                    <Text strong style={{ display: 'block' }}>Tổ chức:</Text> <Text>{selectedJob?.pharmacy}</Text>
                </div>

                <Form layout="vertical" form={form} onFinish={handleApplySubmit}>
                    <Form.Item name="fullName" label="Họ và tên" rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}>
                        <Input prefix={<UserOutlined />} placeholder="Ví dụ: Nguyễn Văn A" size="large" />
                    </Form.Item>
                    
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: 'Vui lòng nhập SĐT' }]}>
                                <Input prefix={<PhoneOutlined />} placeholder="09xxxx" size="large" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="email" label="Email liên hệ">
                                <Input placeholder="email@example.com" size="large" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item name="cvLink" label="Đường dẫn CV (Google Drive, LinkedIn...)" rules={[{ required: true, message: 'Vui lòng cung cấp link CV' }]}>
                        <Input prefix={<FileTextOutlined />} placeholder="https://..." size="large" />
                    </Form.Item>

                    <Divider />
                    
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                        <Button onClick={() => setApplyModalOpen(false)} size="large">Hủy bỏ</Button>
                        <Button type="primary" htmlType="submit" size="large" style={{ background: '#1890ff' }}>
                            Gửi Hồ Sơ
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
}
