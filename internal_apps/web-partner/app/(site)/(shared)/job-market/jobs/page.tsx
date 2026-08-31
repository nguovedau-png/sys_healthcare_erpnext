"use client";
import { Card, Space, Row, Col, Typography, Avatar, Statistic, Tag, Progress, Button, Badge, message, Table, Select } from "antd";
const { Title, Text, Paragraph } = Typography;
import { SolutionOutlined, SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, DollarOutlined, EnvironmentOutlined, ThunderboltFilled, TeamOutlined, UserOutlined } from "@ant-design/icons";
import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";
import { useState, useEffect } from "react";
import { Drawer, List } from "antd";

const JOBS_INIT = [
  { id: 1, position: "Bác sĩ Nội khoa", pharmacy: "Bệnh viện Đa khoa Quốc tế", salary: "25-45 triệu", location: "TP.HCM", type: "Full-time", status: "Open", applicants: 12 },
  { id: 2, position: "Điều dưỡng trưởng", pharmacy: "Phòng khám Đa khoa VIP", salary: "15-20 triệu", location: "Hà Nội", type: "Full-time", status: "Open", applicants: 8 },
  { id: 3, position: "Dược sĩ tư vấn", pharmacy: "Nhà thuốc Healthe", salary: "12-18 triệu", location: "Đà Nẵng", type: "Part-time", status: "Closed", applicants: 4 },
];

const JOB_FIELDS: CrudField[] = [
  { name: "position", label: "Vị trí công việc", type: "text", placeholder: "Bác sĩ Nội khoa", required: true, span: 2 },
  { name: "pharmacy", label: "Tổ chức / Bệnh viện", type: "text", placeholder: "Bệnh viện Đa khoa Quốc tế", required: true, span: 2 },
  { name: "salary", label: "Mức lương dự kiến", type: "text", placeholder: "25-45 triệu", required: true },
  { name: "location", label: "Địa điểm làm việc", type: "text", placeholder: "TP.HCM", required: true },
  { name: "type", label: "Hình thức làm việc", type: "select", required: true, options: [{ value: "Full-time", label: "Toàn thời gian" }, { value: "Part-time", label: "Bán thời gian" }, { value: "Contract", label: "Hợp đồng ngắn hạn" }] },
  { name: "status", label: "Trạng thái tin", type: "select", options: [{ value: "Open", label: "Đang tuyển" }, { value: "Closed", label: "Đã đóng" }] },
];

export default function JobsPage() {
  const [data, setData] = useState(JOBS_INIT);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);
  const [appsDrawerOpen, setAppsDrawerOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [allApplications, setAllApplications] = useState<any[]>([]);

  useEffect(() => {
    const fetchApps = () => {
      const stored = localStorage.getItem('ehr_job_applications');
      if (stored) {
        try { setAllApplications(JSON.parse(stored)); } catch (e) {}
      }
    };
    fetchApps();
    window.addEventListener('storage', fetchApps); // in case candidate applies in another tab
    return () => window.removeEventListener('storage', fetchApps);
  }, []);

  const handleAdd = (v: any) => { setData((p) => [{ ...v, id: Date.now(), applicants: 0 }, ...p]); setAddOpen(false); message.success("Đã đăng tin tuyển dụng!"); };
  const handleEdit = (v: any) => { setData((p) => p.map((r) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật tin tuyển dụng thành công!"); };
  const handleDelete = () => { setData((p) => p.filter((r) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xoá tin tuyển dụng!"); };

  const getJobApplicantsCount = (jobId: number) => {
    return allApplications.filter(app => app.jobId === jobId).length;
  };

  const stats = [
    { label: "Tin tuyển dụng", value: "12", icon: <SolutionOutlined /> },
    { label: "Hồ sơ ứng tuyển", value: "458", color: "#4f46e5" },
    { label: "Đã phỏng vấn", value: "32", color: "#059669" },
    { label: "Thời gian tuyển TB", value: "14 Ngày", color: "#d97706" }
  ];

  const columns = [
    {
      title: <Text strong style={{ fontSize: 11 }}>VỊ TRÍ & TỔ CHỨC</Text>,
      render: (_: any, r: any) => (
        <Space size={12}>
           <div style={{ width: 32, height: 32, borderRadius: 4, background: '#f0f5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0050b3' }}>
            <SolutionOutlined />
          </div>
          <div>
            <Text strong style={{ fontSize: 13, display: 'block' }}>{r.position}</Text>
            <Text type="secondary" style={{ fontSize: 11 }}>{r.pharmacy}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: <Text strong style={{ fontSize: 11 }}>THÔNG TIN</Text>,
      render: (_: any, r: any) => (
        <Space direction="vertical" size={0}>
          <Text style={{ fontSize: 12, color: '#059669', fontWeight: 700 }}><DollarOutlined /> {r.salary}</Text>
          <Text type="secondary" style={{ fontSize: 11 }}><EnvironmentOutlined /> {r.location}</Text>
        </Space>
      ),
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>HÌNH THỨC</Text>, 
      render: (_: any, r: any) => (
        <Tag bordered={false} color="blue" style={{ fontSize: 10, fontWeight: 700 }}>
          {r.type.toUpperCase()}
        </Tag>
      ) 
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>ỨNG VIÊN</Text>, 
      render: (_: any, r: any) => {
        const count = getJobApplicantsCount(r.id) + r.applicants; // include mock applicants
        return (
          <Space 
            size={8} 
            style={{ cursor: 'pointer', padding: '4px 8px', borderRadius: 4, background: '#f0f5ff' }}
            onClick={() => {
              setSelectedJob(r);
              setAppsDrawerOpen(true);
            }}
          >
            <Badge count={count} style={{ backgroundColor: '#0050b3' }} />
            <Text style={{ fontSize: 11, fontWeight: 700, color: '#0050b3' }}>HỒ SƠ</Text>
          </Space>
        );
      } 
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>TRẠNG THÁI</Text>, 
      render: (_: any, r: any) => (
        <Tag bordered={false} color={r.status === "Open" ? "green" : "default"} style={{ fontSize: 10, fontWeight: 700 }}>
          {r.status === "Open" ? "ĐANG TUYỂN" : "ĐÃ ĐÓNG"}
        </Tag>
      ) 
    },
    {
      title: "",
      render: (_: any, r: any) => (
        <Space size={8}>
          <Button type="text" size="small" icon={<EditOutlined />} onClick={() => setEditRecord(r)} />
          <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => setDeleteRecord(r)} />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ paddingBottom: 40 }}>
      <EhrPageHeader 
        title="Cổng Tuyển dụng Y tế" 
        subtitle="Thu hút nhân tài, xây dựng đội ngũ y bác sĩ chuyên môn cao và quản lý cơ hội nghề nghiệp"
        primaryAction={{
            label: "Đăng tin mới",
            icon: <PlusOutlined />,
            onClick: () => setAddOpen(true)
        }}
      />

      <EhrStatCards stats={stats} />

      <EhrFilterBar placeholder="Tìm vị trí, chuyên khoa hoặc bệnh viện..." />

      <Card className="ehr-card" bodyStyle={{ padding: 0 }} style={{ marginBottom: 24 }}>
        <Table 
            className="ehr-table-compact"
            dataSource={data} 
            rowKey="id" 
            pagination={false} 
            columns={columns} 
            size="small"
        />
      </Card>

      <Card bordered={false} style={{ background: '#001529', backgroundImage: 'linear-gradient(135deg, #001529 0%, #003a8c 100%)', borderRadius: 4 }} bodyStyle={{ padding: 40 }}>
        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} lg={16}>
            <Space direction="vertical" size={20}>
              <Space align="center" size={12}>
                <ThunderboltFilled style={{ color: '#faad14', fontSize: 32 }} />
                <Title level={4} style={{ color: 'white', margin: 0, fontWeight: 700 }}>AI Talent Matching</Title>
              </Space>
              <Paragraph style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16, margin: 0 }}>
                Hệ thống AI tự động sàng lọc hồ sơ và đánh giá sự phù hợp dựa trên kỹ năng y khoa. Hiện có 124 hồ sơ tiềm năng trong tuần này.
              </Paragraph>
              <Space size="middle">
                <Button type="primary" style={{ height: 40, padding: '0 24px', fontWeight: 600 }}>KÍCH HOẠT SÀNG LỌC</Button>
                <Button ghost style={{ height: 40, padding: '0 24px', fontWeight: 600, borderColor: 'rgba(255,255,255,0.2)' }}>XEM BÁO CÁO</Button>
              </Space>
            </Space>
          </Col>
          <Col xs={24} lg={8}>
             <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.05)', padding: 32, borderRadius: 4 }}>
                <Statistic value={124} title={<Text style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, fontWeight: 700 }}>ỨNG VIÊN TIỀM NĂNG</Text>} valueStyle={{ color: '#fff', fontSize: 48, fontWeight: 700 }} />
                <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    <TeamOutlined style={{ color: '#818cf8' }} />
                    <Text style={{ color: '#818cf8', fontSize: 11, fontWeight: 700 }}>MATCH RATE 85%</Text>
                </div>
            </div>
          </Col>
        </Row>
      </Card>

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Tin tuyển dụng" fields={JOB_FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.position} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
      
      <Drawer
        title={`Hồ sơ ứng tuyển: ${selectedJob?.position}`}
        placement="right"
        onClose={() => setAppsDrawerOpen(false)}
        open={appsDrawerOpen}
        width={500}
      >
        <List
          itemLayout="vertical"
          dataSource={allApplications.filter(app => app.jobId === selectedJob?.id)}
          locale={{ emptyText: 'Chưa có ứng viên nào ứng tuyển (trên hệ thống mới)' }}
          renderItem={item => (
            <List.Item
              style={{ background: '#fafafa', borderRadius: 8, padding: 16, marginBottom: 16 }}
              actions={[
                <Button type="primary" size="small" ghost>Xem CV</Button>,
                <Button size="small">Liên hệ</Button>
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar size={48} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />}
                title={<Text strong style={{ fontSize: 16 }}>{item.candidateName}</Text>}
                description={
                  <Space direction="vertical" size={4} style={{ marginTop: 8 }}>
                    <Text type="secondary" style={{ fontSize: 13 }}>SĐT: <Text strong>{item.phone}</Text></Text>
                    {item.email && <Text type="secondary" style={{ fontSize: 13 }}>Email: <Text strong>{item.email}</Text></Text>}
                    <Text type="secondary" style={{ fontSize: 13 }}>CV Link: <a href={item.cvLink} target="_blank" rel="noreferrer">{item.cvLink}</a></Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>Ngày nộp: {new Date(item.appliedAt).toLocaleString('vi-VN')}</Text>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      </Drawer>
    </div>
  );
}