import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Card, Col, DatePicker, Form, Input, Modal, Row, Space, Statistic, Table, Tag, Typography, message } from 'antd';
import { CalendarOutlined, CheckCircleOutlined, ClockCircleOutlined, PlusOutlined, ReloadOutlined, TeamOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs, { Dayjs } from 'dayjs';
import api from '../../../services/api';

const { Title, Text } = Typography;

type AppointmentStatus = 'pending' | 'confirmed' | 'checked_in' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';

interface Appointment {
  id: number;
  patientName: string;
  patientPhone: string;
  doctorName?: string;
  appointmentDate?: string;
  status: AppointmentStatus;
  service?: string;
  note?: string;
}

interface Consultation {
  id: number;
  patientId: string;
  patientName: string;
  patientGender?: string;
  patientAge?: number;
  type?: string;
  line?: string;
  status: 'waiting' | 'examining' | 'completed' | 'absent' | string;
}

interface PaginatedResult<T> {
  data: T[];
  pagination?: { total?: number };
}

function unwrap<T>(response: any): PaginatedResult<T> {
  const body = response?.data?.success ? response.data.data : response?.data;
  if (Array.isArray(body)) return { data: body };
  return { data: body?.data ?? [], pagination: body?.pagination };
}

const NEXT_STATUS: Partial<Record<AppointmentStatus, AppointmentStatus>> = {
  pending: 'confirmed',
  confirmed: 'checked_in',
  checked_in: 'in_progress',
  in_progress: 'completed',
};

const statusColor: Record<string, string> = {
  pending: 'gold',
  confirmed: 'blue',
  checked_in: 'cyan',
  in_progress: 'processing',
  completed: 'green',
  cancelled: 'red',
  no_show: 'volcano',
  waiting: 'gold',
  examining: 'processing',
};

const Operations: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [form] = Form.useForm();

  const fetchQueues = useCallback(async () => {
    setLoading(true);
    try {
      const [appointmentResponse, consultationResponse] = await Promise.all([
        api.get('/bookings/appointments', { params: { page: 1, limit: 100, search: search || undefined } }),
        api.get('/bookings/consultations', { params: { page: 1, limit: 100 } }),
      ]);
      setAppointments(unwrap<Appointment>(appointmentResponse).data);
      setConsultations(unwrap<Consultation>(consultationResponse).data);
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Không thể tải hàng đợi khám');
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchQueues();
  }, [fetchQueues]);

  const handleCreateAppointment = async (values: { patientName: string; patientPhone: string; email?: string; doctorId?: string; doctorName?: string; service?: string; appointmentDate?: Dayjs; note?: string }) => {
    try {
      await api.post('/bookings/appointments', {
        ...values,
        appointmentDate: values.appointmentDate?.toISOString(),
      });
      message.success('Đã tạo lịch hẹn');
      setAppointmentModalOpen(false);
      form.resetFields();
      await fetchQueues();
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Không thể tạo lịch hẹn');
    }
  };

  const advanceAppointment = async (appointment: Appointment) => {
    const next = NEXT_STATUS[appointment.status];
    if (!next) return;
    try {
      await api.put(`/bookings/appointments/${appointment.id}`, { status: next });
      message.success(`Đã chuyển lịch hẹn sang ${next}`);
      await fetchQueues();
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Không thể chuyển trạng thái lịch hẹn');
    }
  };

  const waitingCount = useMemo(() => consultations.filter((item) => item.status === 'waiting').length, [consultations]);
  const todayCount = useMemo(() => appointments.filter((item) => item.appointmentDate && dayjs(item.appointmentDate).isSame(dayjs(), 'day')).length, [appointments]);
  const activeCount = useMemo(() => appointments.filter((item) => !['completed', 'cancelled', 'no_show'].includes(item.status)).length, [appointments]);

  const appointmentColumns: ColumnsType<Appointment> = [
    { title: 'Bệnh nhân', dataIndex: 'patientName', key: 'patientName', render: (name: string, record) => <Space direction="vertical" size={0}><Text strong>{name}</Text><Text type="secondary">{record.patientPhone}</Text></Space> },
    { title: 'Bác sĩ', dataIndex: 'doctorName', key: 'doctorName', render: (value?: string) => value || 'Chưa phân công' },
    { title: 'Dịch vụ', dataIndex: 'service', key: 'service', render: (value?: string) => value || '-' },
    { title: 'Thời gian', dataIndex: 'appointmentDate', key: 'appointmentDate', render: (value?: string) => value ? dayjs(value).format('DD/MM/YYYY HH:mm') : '-' },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status', render: (value: string) => <Tag color={statusColor[value] || 'default'}>{value.replace('_', ' ')}</Tag> },
    { title: 'Thao tác', key: 'actions', render: (_, record) => NEXT_STATUS[record.status] ? <Button size="small" type="link" onClick={() => advanceAppointment(record)}>Sang {NEXT_STATUS[record.status]?.replace('_', ' ')}</Button> : <Text type="secondary">Đã kết thúc</Text> },
  ];

  const consultationColumns: ColumnsType<Consultation> = [
    { title: 'Số hồ sơ', dataIndex: 'patientId', key: 'patientId' },
    { title: 'Bệnh nhân', dataIndex: 'patientName', key: 'patientName' },
    { title: 'Tuổi/Giới', key: 'demographics', render: (_, record) => `${record.patientAge ?? '-'} / ${record.patientGender ?? '-'}` },
    { title: 'Loại khám', dataIndex: 'type', key: 'type' },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status', render: (value: string) => <Tag color={statusColor[value] || 'default'}>{value}</Tag> },
  ];

  return (
    <div>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <Title level={2} style={{ margin: 0 }}>Vận hành phòng khám</Title>
            <Text type="secondary">Hàng đợi khám, lịch hẹn và điều phối bệnh nhân</Text>
          </div>
          <Space>
            <Button icon={<ReloadOutlined />} onClick={fetchQueues} loading={loading}>Làm mới</Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setAppointmentModalOpen(true)}>Tạo lịch hẹn</Button>
          </Space>
        </div>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}><Card><Statistic title="Lịch hẹn hôm nay" value={todayCount} prefix={<CalendarOutlined />} /></Card></Col>
          <Col xs={24} sm={8}><Card><Statistic title="Đang xử lý" value={activeCount} prefix={<ClockCircleOutlined />} valueStyle={{ color: '#1677ff' }} /></Card></Col>
          <Col xs={24} sm={8}><Card><Statistic title="Đang chờ khám" value={waitingCount} prefix={<TeamOutlined />} valueStyle={{ color: '#d48806' }} /></Card></Col>
        </Row>

        <Card title="Lịch hẹn" extra={<Input.Search allowClear placeholder="Tìm bệnh nhân, bác sĩ..." style={{ width: 280 }} onSearch={setSearch} /> }>
          <Table rowKey="id" columns={appointmentColumns} dataSource={appointments} loading={loading} scroll={{ x: 900 }} pagination={{ pageSize: 10 }} locale={{ emptyText: 'Chưa có lịch hẹn' }} />
        </Card>

        <Card title={<Space><CheckCircleOutlined /> Hàng đợi tiếp nhận</Space>}>
          <Table rowKey="id" columns={consultationColumns} dataSource={consultations} loading={loading} scroll={{ x: 800 }} pagination={{ pageSize: 10 }} locale={{ emptyText: 'Chưa có bệnh nhân trong hàng đợi' }} />
        </Card>
      </Space>

      <Modal title="Tạo lịch hẹn" open={appointmentModalOpen} onCancel={() => setAppointmentModalOpen(false)} onOk={() => form.submit()} okText="Tạo lịch hẹn" cancelText="Hủy" confirmLoading={loading} destroyOnClose>
        <Form form={form} layout="vertical" onFinish={handleCreateAppointment} initialValues={{ appointmentDate: dayjs().add(1, 'hour') }}>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="patientName" label="Họ tên bệnh nhân" rules={[{ required: true, min: 2, max: 160 }]}><Input /></Form.Item></Col>
            <Col span={12}><Form.Item name="patientPhone" label="Số điện thoại" rules={[{ required: true, pattern: /^(?:\+84|84|0)(?:3|5|7|8|9)[\s().-]?\d{3}[\s.-]?\d{3}[\s.-]?\d{3}$/ }]}><Input placeholder="0901234567" /></Form.Item></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="doctorName" label="Bác sĩ"><Input /></Form.Item></Col>
            <Col span={12}><Form.Item name="doctorId" label="Mã bác sĩ"><Input /></Form.Item></Col>
          </Row>
          <Form.Item name="email" label="Email" rules={[{ type: 'email' }]}><Input /></Form.Item>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="service" label="Dịch vụ"><Input /></Form.Item></Col>
            <Col span={12}><Form.Item name="appointmentDate" label="Thời gian" rules={[{ required: true }]}><DatePicker showTime format="DD/MM/YYYY HH:mm" style={{ width: '100%' }} /></Form.Item></Col>
          </Row>
          <Form.Item name="note" label="Ghi chú"><Input.TextArea rows={3} maxLength={2000} showCount /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Operations;
