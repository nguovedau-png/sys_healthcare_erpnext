"use client";
import { Card, Space, Row, Col, Typography, Tag, Switch, Button, message, Input, Table, Tabs } from "antd";
const { Title, Text } = Typography;
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, SettingOutlined, HistoryOutlined, SecurityScanOutlined, ApiOutlined, NotificationOutlined, MailOutlined, MessageOutlined, MobileOutlined, FileTextOutlined, CodeOutlined } from "@ant-design/icons";
import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import SystemLogsView from "@/components/settings/SystemLogsView";
import CronJobsView from "@/components/settings/CronJobsView";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";
import { useState, useEffect, useMemo } from "react";
import settingService, { Setting } from "@/services/setting.service";

const FIELDS: CrudField[] = [
  { name: "key", label: "Mã cấu hình (Key)", type: "text", placeholder: "VD: SMTP_HOST", required: true, span: 2 },
  { name: "value", label: "Giá trị", type: "text", placeholder: "Nhập giá trị cấu hình...", required: true, span: 2 },
  { name: "description", label: "Mô tả", type: "text", placeholder: "Mô tả chi tiết cấu hình..." },
  { name: "isPublic", label: "Công khai?", type: "select", options: [{ value: true, label: "Có (Public)" }, { value: false, label: "Không (Private)" }] },
];

const TABS_CONFIG = [
  { key: "general", label: "Cài đặt chung", icon: <SettingOutlined /> },
  { key: "email", label: "Cấu hình Email", icon: <MailOutlined /> },
  { key: "sms", label: "Cấu hình SMS", icon: <MobileOutlined /> },
  { key: "notification", label: "Thông báo", icon: <NotificationOutlined /> },
  { key: "bot-node", label: "Tích hợp Bot", icon: <MessageOutlined /> },
  { key: "security", label: "Bảo mật", icon: <SecurityScanOutlined /> },
  { key: "system-logs", label: "Nhật ký hệ thống", icon: <FileTextOutlined />, isCustom: true },
  { key: "cron-jobs", label: "Tiến trình ngầm", icon: <CodeOutlined />, isCustom: true },
];

export default function SettingsPage() {
  const [data, setData] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<Setting | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<Setting | null>(null);
  const [activeTab, setActiveTab] = useState("general");
  const [searchText, setSearchText] = useState("");

  const fetchSettings = async () => {
    try {
        setLoading(true);
        const res = await settingService.getSettings();
        setData(res);
    } catch (error) {
        message.error("Lỗi khi tải cấu hình!");
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleAdd = async (v: any) => { 
    try {
        if (v.isPublic === "true" || v.isPublic === true) v.isPublic = true;
        else v.isPublic = false;

        v.category = activeTab; // Implicitly set category

        await settingService.createSetting(v);
        setAddOpen(false); 
        message.success("Đã thêm Cài đặt mới!"); 
        fetchSettings();
    } catch (e) {
        message.error("Lỗi khi thêm cấu hình");
    }
  };

  const handleEdit = async (v: any) => { 
    if (!editRecord) return;
    try {
        if (v.isPublic === "true" || v.isPublic === true) v.isPublic = true;
        else v.isPublic = false;

        v.category = editRecord.category; // Preserve original category

        await settingService.updateSetting(editRecord.id, v);
        setEditRecord(null); 
        message.success("Cập nhật Cài đặt thành công!"); 
        fetchSettings();
    } catch (e) {
        message.error("Lỗi khi cập nhật cấu hình");
    }
  };

  const handleDelete = async () => { 
    if (!deleteRecord) return;
    try {
        await settingService.deleteSetting(deleteRecord.id);
        setDeleteRecord(null); 
        message.success("Đã xóa Cài đặt!"); 
        fetchSettings();
    } catch (e) {
        message.error("Lỗi khi xóa cấu hình");
    }
  };

  const filteredData = useMemo(() => {
     let filtered = data.filter(d => (d.category || "general") === activeTab);
     if (searchText) {
         filtered = filtered.filter(d => d.key.toLowerCase().includes(searchText.toLowerCase()) || d.value.toLowerCase().includes(searchText.toLowerCase()));
     }
     return filtered;
  }, [data, activeTab, searchText]);

  const stats = [
    { label: "Tổng cấu hình", value: data.length.toString(), icon: <SettingOutlined /> },
    { label: "Email & SMS", value: data.filter(s => s.category === 'email' || s.category === 'sms').length.toString(), color: "#52c41a" },
    { label: "Bot Nodes", value: data.filter(s => s.category === 'bot-node').length.toString(), color: "#0050b3" },
    { label: "Cấu hình Public", value: data.filter(s => s.isPublic).length.toString(), color: "#faad14" }
  ];

  const columns = [
    { 
      title: <Text strong style={{ fontSize: 11 }}>MÃ CẤU HÌNH</Text>, 
      render: (_: any, r: Setting) => (
        <Space size={12}>
           <div style={{ width: 32, height: 32, borderRadius: 4, background: '#f0f5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0050b3' }}>
            <SettingOutlined />
          </div>
          <div>
            <Text strong style={{ fontSize: 13, display: 'block' }}>{r.key}</Text>
          </div>
        </Space>
      ) 
    },
    { 
        title: <Text strong style={{ fontSize: 11 }}>GIÁ TRỊ</Text>, 
        render: (_: any, r: Setting) => <Text style={{ fontSize: 12, fontFamily: 'monospace' }}>{r.value.length > 50 ? r.value.substring(0, 50) + "..." : r.value}</Text> 
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>MÔ TẢ</Text>, 
      render: (_: any, r: Setting) => <Text style={{ fontSize: 12, color: '#8c8c8c' }}>{r.description || "-"}</Text> 
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>BẢO MẬT</Text>, 
      render: (_: any, r: Setting) => (
        <Tag bordered={false} color={r.isPublic ? "orange" : "green"} style={{ fontSize: 10, fontWeight: 700 }}>
          {r.isPublic ? "PUBLIC" : "PRIVATE"}
        </Tag>
      ) 
    },
    { 
      title: "", 
      render: (_: any, r: Setting) => (
        <Space size={8}>
          <Button type="text" size="small" icon={<EditOutlined />} onClick={() => setEditRecord(r)} />
          <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => setDeleteRecord(r)} />
        </Space>
      ) 
    },
  ];

  return (
    <div style={{ paddingBottom: 40 }}>
      <EhrPageHeader 
        title="System Settings & Integrations" 
        subtitle="Quản lý tập trung toàn bộ cấu hình hệ thống: Email, SMS, Bot Chat, Webhook API và các thiết lập an ninh."
        extra={<Button icon={<HistoryOutlined />}>Lịch sử thay đổi</Button>}
      />

      <EhrStatCards stats={stats} />

      <Card bordered={false} className="ehr-card" bodyStyle={{ padding: 0 }}>
        <Tabs 
          tabPosition="left" 
          activeKey={activeTab} 
          onChange={setActiveTab}
          style={{ minHeight: 600 }}
          items={TABS_CONFIG.map(tab => ({
             key: tab.key,
             label: (
                <span style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 4px', fontSize: 14 }}>
                   {tab.icon} {tab.label}
                </span>
             ),
             children: tab.isCustom ? (
                 tab.key === 'system-logs' ? <SystemLogsView /> : <CronJobsView />
             ) : (
                 <div style={{ padding: '24px 32px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                        <div>
                            <Title level={4} style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>{tab.icon} {tab.label}</Title>
                            <Text type="secondary">Quản lý cấu hình dành riêng cho {tab.label.toLowerCase()}</Text>
                        </div>
                        <Space>
                            <Input prefix={<SearchOutlined />} placeholder="Tìm kiếm..." allowClear onChange={(e) => setSearchText(e.target.value)} style={{ width: 250 }} />
                            <Button type="primary" icon={<PlusOutlined />} onClick={() => setAddOpen(true)}>Thêm cấu hình</Button>
                        </Space>
                    </div>

                    <Table 
                        className="ehr-table-compact"
                        dataSource={filteredData} 
                        loading={loading}
                        rowKey="id" 
                        pagination={{ pageSize: 15 }} 
                        columns={columns} 
                        size="small"
                        locale={{ emptyText: "Chưa có cấu hình nào trong mục này." }}
                    />
                 </div>
             )
          }))}
        />
      </Card>

      <CrudModal 
        open={addOpen || !!editRecord} 
        onClose={() => { setAddOpen(false); setEditRecord(null); }} 
        onSubmit={editRecord ? handleEdit : handleAdd} 
        record={editRecord} 
        title={`Cấu hình ${TABS_CONFIG.find(t => t.key === activeTab)?.label}`} 
        fields={FIELDS} 
      />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.key} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}