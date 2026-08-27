"use client";
import React, { useState } from "react";
import { Card, Space, Row, Col, Typography, Avatar, Statistic, Tag, Table, message, Select, Button, Switch, Tabs, Tooltip } from "antd";
const { Title, Text, Paragraph } = Typography;
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, BellOutlined, HistoryOutlined, CheckCircleOutlined, InfoCircleOutlined, WarningOutlined, SendOutlined, MailOutlined, MessageOutlined } from "@ant-design/icons";
import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";

const DATA_INIT = [
  { "id": 1, "title": "Nhắc lịch khám định kỳ", "recipient": "Nguyễn Văn A", "status": "Active", "type": "Reminder", "time": "10:30 AM" },
  { "id": 2, "title": "Kết quả xét nghiệm đã có", "recipient": "Trần Thị B", "status": "Inactive", "type": "Result", "time": "Yesterday" }
];

const NOTIFICATION_RULES = [
  {
    key: '1',
    name: 'Thông báo hoàn thành khóa học',
    trigger: 'Hoàn thành bài học/khóa học',
    channels: ['inapp', 'email'],
    status: true,
    template: 'Chúc mừng bạn đã hoàn thành khóa học {course_name}. Điểm CME đã được cộng vào tài khoản.'
  },
  {
    key: '2',
    name: 'Thông báo có người phản hồi bình luận',
    trigger: 'Ai đó phản hồi bình luận',
    channels: ['inapp'],
    status: true,
    template: '{user_name} đã trả lời bình luận của bạn trong bài viết {article_name}.'
  },
  {
    key: '3',
    name: 'Chúc mừng thăng hạng',
    trigger: 'Tăng level member (VD: Lên hạng Vàng)',
    channels: ['inapp', 'sms', 'email'],
    status: true,
    template: 'Tuyệt vời! Bạn đã chính thức thăng hạng {level_name}. Hãy khám phá các đặc quyền mới ngay.'
  },
];

const FIELDS: CrudField[] = [
  { name: "title", label: "Tiêu đề thông báo", type: "text", placeholder: "Nhập Tiêu đề thông báo...", required: true, span: 2 },
  { name: "recipient", label: "Người nhận", type: "text", placeholder: "Nhập Người nhận..." },
  { name: "status", label: "Trạng thái", type: "select", options: [{ value: "Active", label: "Hoạt động" }, { value: "Inactive", label: "Không hoạt động" }] },
];

export default function NotificationsPage() {
  const [data, setData] = useState(DATA_INIT);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState("1");

  const handleAdd = (v: any) => { setData((p) => [{ ...v, id: Date.now() }, ...p]); setAddOpen(false); message.success("Đã thêm Thông báo mới!"); };
  const handleEdit = (v: any) => { setData((p) => p.map((r: any) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật Thông báo thành công!"); };
  const handleDelete = () => { setData((p) => p.filter((r: any) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xoá Thông báo!"); };

  const stats = [
    { label: "Tổng thông báo", value: "1,248", icon: <BellOutlined /> },
    { label: "Đã đọc", value: "92%", color: "#52c41a" },
    { label: "Chưa đọc", value: "112", color: "#f5222d" },
    { label: "Tỷ lệ nhấp", value: "18.5%", color: "#0050b3" }
  ];

  const columns = [
    {
      title: <Text strong style={{ fontSize: 11 }}>TIÊU ĐỀ / PHÂN LOẠI</Text>,
      render: (_: any, r: any) => (
        <Space size={12}>
          <div style={{ width: 32, height: 32, borderRadius: 4, background: r.type === "Reminder" ? '#e6f7ff' : '#f0f5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: r.type === "Reminder" ? '#1890ff' : '#0050b3' }}>
            {r.type === "Reminder" ? <InfoCircleOutlined /> : <CheckCircleOutlined />}
          </div>
          <div>
            <Text strong style={{ fontSize: 13, display: 'block' }}>{r.title}</Text>
            <Text type="secondary" style={{ fontSize: 11 }}>{r.type}</Text>
          </div>
        </Space>
      )
    },
    {
      title: <Text strong style={{ fontSize: 11 }}>NGƯỜI NHẬN</Text>,
      render: (_: any, r: any) => <Text style={{ fontSize: 12 }}>{r.recipient}</Text>
    },
    {
      title: <Text strong style={{ fontSize: 11 }}>THỜI GIAN</Text>,
      render: (_: any, r: any) => <Text type="secondary" style={{ fontSize: 11 }}>{r.time}</Text>
    },
    {
      title: <Text strong style={{ fontSize: 11 }}>TRẠNG THÁI</Text>,
      render: (_: any, r: any) => (
        <Tag bordered={false} color={r.status === "Active" ? "green" : "default"} style={{ fontSize: 10, fontWeight: 700 }}>
          {r.status.toUpperCase()}
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
      )
    },
  ];

  const renderChannels = (channels: string[]) => (
    <Space>
      {channels.includes('inapp') && <Tooltip title="In-App Notification"><Tag color="blue"><BellOutlined /> In-App</Tag></Tooltip>}
      {channels.includes('email') && <Tooltip title="Email"><Tag color="green"><MailOutlined /> Email</Tag></Tooltip>}
      {channels.includes('sms') && <Tooltip title="SMS"><Tag color="orange"><MessageOutlined /> SMS</Tag></Tooltip>}
    </Space>
  );

  return (
    <div style={{ paddingBottom: 40 }}>
      <EhrPageHeader
        title="Notification Center"
        subtitle="Quản lý thông báo hệ thống, nhắc nhở định kỳ và cấu hình tự động (Hub/EHR)"
        primaryAction={{
          label: "Gửi thông báo",
          icon: <SendOutlined />,
          onClick: () => setAddOpen(true)
        }}
      />

      <EhrStatCards stats={stats} />

      <Card className="ehr-card" bodyStyle={{ padding: 0 }} style={{ marginTop: 24 }}>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          size="large"
          tabBarStyle={{ padding: '0 24px', margin: 0, backgroundColor: '#fafafa' }}
          items={[
            {
              key: "1",
              label: <span><HistoryOutlined /> Lịch sử & Gửi thủ công</span>,
              children: (
                <div style={{ padding: 24 }}>
                  <EhrFilterBar placeholder="Tìm thông báo, người nhận...">
                    <Select placeholder="Loại thông báo" style={{ width: 150 }} options={[{ value: "rem", label: "Nhắc lịch" }]} />
                  </EhrFilterBar>
                  <Table
                    className="ehr-table-compact"
                    dataSource={data}
                    rowKey="id"
                    pagination={false}
                    columns={columns}
                    size="small"
                  />
                </div>
              )
            },
            {
              key: "2",
              label: <span><CheckCircleOutlined /> Cấu hình Thông báo Tự động (Rules)</span>,
              children: (
                <div style={{ padding: 24 }}>
                  <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text type="secondary">Thiết lập các kịch bản gửi In-App, Email, SMS dựa trên hành vi người dùng (Hoàn thành khóa học, thăng hạng, v.v.).</Text>
                    <Button type="primary" icon={<PlusOutlined />}>Tạo Rule Tự động</Button>
                  </div>
                  <Table
                    dataSource={NOTIFICATION_RULES}
                    pagination={false}
                    columns={[
                      {
                        title: 'Tên Kịch bản (Rule)',
                        dataIndex: 'name',
                        key: 'name',
                        render: (text, record) => (
                          <div>
                            <Text strong>{text}</Text>
                            <br />
                            <Text type="secondary" style={{ fontSize: 12 }}>{record.trigger}</Text>
                          </div>
                        )
                      },
                      {
                        title: 'Kênh gửi',
                        dataIndex: 'channels',
                        key: 'channels',
                        render: (channels) => renderChannels(channels)
                      },
                      {
                        title: 'Nội dung mẫu',
                        dataIndex: 'template',
                        key: 'template',
                        width: '40%',
                        render: (text) => <Text ellipsis style={{ maxWidth: 350, display: 'inline-block' }}>{text}</Text>
                      },
                      {
                        title: 'Trạng thái',
                        dataIndex: 'status',
                        key: 'status',
                        render: (status) => <Switch defaultChecked={status} checkedChildren="Bật" unCheckedChildren="Tắt" />
                      },
                      {
                        title: 'Thao tác',
                        key: 'action',
                        render: () => (
                          <Space>
                            <Button type="text" icon={<EditOutlined />} />
                            <Button type="text" danger icon={<DeleteOutlined />} />
                          </Space>
                        )
                      }
                    ]}
                  />
                </div>
              )
            }
          ]}
        />
      </Card>

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Thông báo" fields={FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.title} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}