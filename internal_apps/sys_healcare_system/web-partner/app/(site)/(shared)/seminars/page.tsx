"use client";
import React, { useState } from "react";
import { Tag, Button, Input, Select, Progress, message, Tooltip, Table, Card, Space, Row, Col, Typography, Avatar } from "antd";
import { CalendarOutlined, SearchOutlined, FilterOutlined, PlusOutlined, ArrowRightOutlined, ThunderboltFilled, EditOutlined, DeleteOutlined, HistoryOutlined, EnvironmentFilled, ClockCircleFilled, TeamOutlined, TrophyFilled, RocketOutlined, GlobalOutlined } from "@ant-design/icons";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";

const SEMINARS_INIT = [
  { id: 1, title: "Hội thảo Dược lâm sàng 2024", date: "2024-12-25", time: "08:00 - 17:00", location: "Khách sạn Rex, Quận 1, TP.HCM", speakers: "GS.TS Nguyễn Văn A, PGS.TS Trần Thị B", registered: 245, capacity: 300, status: "OPEN", category: "PHARMACOLOGY", month: "DEC" },
  { id: 2, title: "Cập nhật Điều trị Tim mạch 2025", date: "2025-01-15", time: "08:30 - 16:30", location: "Trung tâm Hội nghị Quốc gia, Hà Nội", speakers: "TS.BS Lê Văn C, BS.CKII Phạm Thị D", registered: 180, capacity: 250, status: "OPEN", category: "CARDIOLOGY", month: "JAN" },
  { id: 3, title: "Hội thảo Kháng sinh Hợp lý 2025", date: "2025-02-10", time: "09:00 - 17:00", location: "Bệnh viện Đại học Y Dược, TP.HCM", speakers: "PGS.TS Hoàng Văn E", registered: 120, capacity: 200, status: "OPEN", category: "INTERNAL MEDICINE", month: "FEB" },
];

const SEM_FIELDS: CrudField[] = [
  { name: "title", label: "Tên hội thảo", type: "text", placeholder: "Hội thảo Dược lâm sàng...", required: true, span: 2 },
  { name: "category", label: "Chuyên ngành", type: "select", required: true, options: [{ value: "PHARMACOLOGY", label: "Dược lâm sàng" }, { value: "CARDIOLOGY", label: "Tim mạch" }, { value: "INTERNAL MEDICINE", label: "Nội khoa" }, { value: "PEDIATRICS", label: "Nhi khoa" }] },
  { name: "date", label: "Ngày tổ chức", type: "date", required: true },
  { name: "time", label: "Thời gian", type: "text", placeholder: "08:00 - 17:00" },
  { name: "location", label: "Địa điểm", type: "text", placeholder: "Khách sạn Rex, TP.HCM", required: true, span: 2 },
  { name: "speakers", label: "Diễn giả chính", type: "textarea", placeholder: "GS.TS Nguyễn Văn A, ...", span: 2 },
  { name: "capacity", label: "Sức chứa tối đa", type: "number", placeholder: "300", required: true },
  { name: "status", label: "Trạng thái đăng ký", type: "select", options: [{ value: "OPEN", label: "Đang mở đăng ký" }, { value: "CLOSED", label: "Đã đóng" }, { value: "FULL", label: "Đủ người" }] },
];

export default function SeminarsPage() {
  const [data, setData] = useState(SEMINARS_INIT);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);

  const handleAdd = (v: any) => { setData((p) => [{ ...v, id: Date.now(), registered: 0, month: v.date?.slice(5, 7) ?? "JAN" }, ...p]); setAddOpen(false); message.success("Đã tạo hội thảo mới!"); };
  const handleEdit = (v: any) => { setData((p) => p.map((r) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật hội thảo thành công!"); };
  const handleDelete = () => { setData((p) => p.filter((r) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xóa hội thảo!"); };

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', paddingBottom: 80 }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 40 }}>
        <div>
          <h1 style={{ fontSize: 36, fontWeight: 900, color: '#111827', letterSpacing: '-0.025em', margin: 0 }}>Clinical Seminars & Workshops</h1>
          <p style={{ color: '#6b7280', fontSize: 14, marginTop: 4, fontWeight: 500 }}>Nâng cao năng lực chuyên môn thông qua các buổi hội thảo trực tiếp, thực hành lâm sàng và trao đổi học thuật</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button size="large" icon={<HistoryOutlined />} style={{ borderRadius: 9, fontWeight: 700, height: 48, borderColor: '#f3f4f6', color: '#9ca3af' }}>Participation History</Button>
          <button onClick={() => setAddOpen(true)} style={{ padding: '14px 32px', backgroundColor: '#111827', color: 'white', fontWeight: 900, borderRadius: 9, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 12, textTransform: 'uppercase', fontSize: 10, letterSpacing: '0.1em', border: 'none', cursor: 'pointer' }}>
            <PlusOutlined style={{ fontSize: 18 }} /><span>ĐỀ XUẤT HỘI THẢO</span>
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
        {[
          { label: "Upcoming Events", value: "12", color: "#111827", icon: <CalendarOutlined style={{ color: '#14b8a6' }} /> },
          { label: "New Workshops", value: "04", color: "#2563eb", icon: <RocketOutlined style={{ color: '#3b82f6' }} /> },
          { label: "Registered Specialists", value: "1.2k", color: "#4f46e5", icon: <TeamOutlined style={{ color: '#6366f1' }} /> },
          { label: "CME Hours Earned", value: "450h", color: "#d97706", icon: <TrophyFilled style={{ color: '#f59e0b' }} /> },
        ].map((s, i) => (
          <div key={i} style={{ backgroundColor: 'white', padding: 32, borderRadius: 9, border: '1px solid #f3f4f6', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 24, right: 24, opacity: 0.05, fontSize: 24, transform: 'scale(1.1)' }}>{s.icon}</div>
            <div style={{ fontSize: 36, fontWeight: 900, color: s.color, letterSpacing: '-0.05em' }}>{s.value}</div>
            <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: 'white', padding: 20, borderRadius: 9, border: '1px solid #f3f4f6', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center', marginTop: 40 }}>
        <Input placeholder="Tìm tên hội thảo, địa điểm, diễn giả..." prefix={<SearchOutlined style={{ marginLeft: 8, color: '#9ca3af' }} />} style={{ flex: 1, borderRadius: 9, height: 64, border: 'none', backgroundColor: '#f9fafb', fontSize: 18, fontWeight: 700, padding: '0 32px' }} />
        <div style={{ display: 'flex', gap: 24, width: '100%' }}>
          <Select placeholder="Filter by Month" style={{ height: 64, width: 256 }} allowClear options={[{ value: "12", label: "December" }, { value: "01", label: "January" }]} />
          <Button size="large" icon={<FilterOutlined />} style={{ borderRadius: 9, height: 64, width: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', backgroundColor: '#111827', color: 'white', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40, marginTop: 40 }}>
        {data.map((s) => (
          <div key={s.id} style={{ backgroundColor: 'white', borderRadius: 72, border: '1px solid #f3f4f6', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)', overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'pointer', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 8, opacity: 0, zIndex: 30 }}>
              <Tooltip title="Chỉnh sửa"><Button icon={<EditOutlined />} size="small" onClick={(e) => { e.stopPropagation(); setEditRecord(s); }} style={{ borderRadius: 9, border: 'none', backgroundColor: 'white', color: '#3b82f6', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} /></Tooltip>
              <Tooltip title="Xóa"><Button icon={<DeleteOutlined />} size="small" onClick={(e) => { e.stopPropagation(); setDeleteRecord(s); }} style={{ borderRadius: 9, border: 'none', backgroundColor: 'white', color: '#f43f5e', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} /></Tooltip>
            </div>

            <div style={{ height: 256, position: 'relative', overflow: 'hidden', backgroundColor: '#f3f4f6' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom right, rgba(20,184,166,0.2), rgba(59,130,246,0.1), transparent)' }} />
              <div style={{ position: 'absolute', top: 32, left: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 80, height: 80, backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: 9, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', border: '4px solid rgba(255,255,255,0.2)' }}>
                <span style={{ fontSize: 10, fontWeight: 900, color: '#0d9488', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.month}</span>
                <span style={{ fontSize: 36, fontWeight: 900, color: '#111827', lineHeight: 1 }}>{s.date?.split("-")[2]}</span>
              </div>
              <div style={{ position: 'absolute', top: 32, right: 32 }}>
                <Tag style={{ borderRadius: 9, border: 'none', fontWeight: 900, fontSize: 10, padding: '8px 24px', backgroundColor: '#111827', color: 'white', letterSpacing: '0.2em' }}>NEW EVENT</Tag>
              </div>
            </div>

            <div style={{ padding: 48, flex: 1, display: 'flex', flexDirection: 'column', gap: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <Tag style={{ borderRadius: 9, fontWeight: 900, fontSize: 10, padding: '8px 20px', backgroundColor: '#f0fdfa', color: '#0d9488', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.category}</Tag>
                <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 900, letterSpacing: '0.3em', display: 'flex', alignItems: 'center', gap: 12 }}><ClockCircleFilled style={{ color: '#3b82f6' }} />{s.time}</div>
              </div>
              <h3 style={{ fontSize: 24, fontWeight: 900, color: '#111827', lineHeight: 1.2, letterSpacing: '-0.05em' }}>{s.title}</h3>
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 9, backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#14b8a6', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)' }}><EnvironmentFilled /></div>
                  <div><div style={{ fontSize: 9, color: '#9ca3af', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Venue</div><div style={{ fontSize: 12, fontWeight: 700, color: '#4b5563', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.location}</div></div>
                </div>
              </div>
              <div style={{ marginTop: 'auto', paddingTop: 32, borderTop: '1px solid #f9fafb' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  <span style={{ color: '#9ca3af' }}>Registration: {s.registered}/{s.capacity}</span>
                  <span style={{ color: '#0d9488' }}>{Math.round((s.registered / s.capacity) * 100)}%</span>
                </div>
                <div style={{ position: 'relative', height: 10, borderRadius: 9999, backgroundColor: '#f9fafb', overflow: 'hidden', marginBottom: 24, boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', backgroundColor: '#0d9488', boxShadow: '0 0 15px rgba(13,148,136,0.3)' }} />
                </div>
                <button style={{ width: '100%', padding: 20, backgroundColor: '#111827', color: 'white', fontWeight: 900, borderRadius: 9, textTransform: 'uppercase', letterSpacing: '0.3em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, border: 'none', cursor: 'pointer', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
                  REGISTER NOW <ArrowRightOutlined style={{ fontSize: 18 }} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: 'linear-gradient(to bottom right, #0f172a, #111827, #0f172a)', padding: 96, borderRadius: 96, color: 'white', position: 'relative', overflow: 'hidden', marginTop: 64 }}>
        <div style={{ position: 'absolute', top: 0, right: 0, fontSize: 400, opacity: 0.1, transform: 'scale(1.1)' }}><GlobalOutlined /></div>
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', gap: 64 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 40 }}><ThunderboltFilled style={{ color: '#fbbf24', fontSize: 60, animation: 'pulse 2s infinite' }} /><h2 style={{ fontSize: 48, fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.2 }}>AI-Driven Clinical Networking</h2></div>
            <p style={{ color: 'rgba(20,197,197,0.7)', fontSize: 20, marginBottom: 48, lineHeight: 1.6 }}>Hệ thống AI gợi ý các buổi hội thảo phù hợp với lộ trình thăng tiến nghề nghiệp của bạn.</p>
            <div style={{ display: 'flex', gap: 24 }}>
              <Button size="large" style={{ borderRadius: 9, height: 64, padding: '0 48px', fontWeight: 900, backgroundColor: '#0d9488', color: 'white', border: 'none', textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: 11 }}>EXPLORE CAREER PATHS</Button>
              <Button size="large" ghost style={{ borderRadius: 9, height: 64, padding: '0 48px', fontWeight: 900, border: '1px solid rgba(255,255,255,0.2)', color: 'white', textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: 11 }}>INTERNATIONAL HUB</Button>
            </div>
          </div>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(72px)', border: '1px solid rgba(255,255,255,0.1)', padding: 80, borderRadius: 9, textAlign: 'center', minWidth: 280, display: 'flex', flexDirection: 'column', gap: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 900, color: '#2dd4bf', letterSpacing: '0.5em' }}>Global Academic Impact</div>
            <div style={{ fontSize: 72, fontWeight: 900, letterSpacing: '-0.05em' }}>12</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: '#10b981', animation: 'pulse 2s infinite' }} /><span style={{ fontSize: 12, fontWeight: 900, color: 'rgba(20,197,197,0.7)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Live Active</span></div>
          </div>
        </div>
      </div>

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Hội thảo / Workshop" fields={SEM_FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.title} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}