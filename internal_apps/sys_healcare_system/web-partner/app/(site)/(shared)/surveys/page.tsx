"use client";
import React, { useState } from "react";
import {
  Card, Space, Row, Col, Typography, Tag, Progress, Button, message,
  Select, Table, Tabs, Input, Radio, Checkbox, Switch, Divider, List, Avatar, Modal, Form
} from "antd";
const { Title, Text, Paragraph } = Typography;
import {
  FormOutlined, PlusOutlined, EditOutlined, DeleteOutlined,
  BarChartOutlined, HistoryOutlined, ArrowLeftOutlined,
  QuestionCircleOutlined, CheckCircleOutlined, AlignLeftOutlined,
  CheckSquareOutlined, PieChartOutlined, UserOutlined
} from "@ant-design/icons";
import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";

// --- MOCK DATA ---
const SURVEYS_INIT = [
  {
    id: 1,
    title: "Khảo sát hài lòng bệnh nhân Q1/2024",
    category: "Patient Satisfaction",
    responses: 412,
    target: 500,
    status: "Active",
    createdAt: "01/01/2024",
    questions: [
      { id: 101, type: "single", text: "Bạn đánh giá thái độ phục vụ của bác sĩ như thế nào?", options: ["Rất hài lòng", "Hài lòng", "Bình thường", "Không hài lòng"] },
      { id: 102, type: "multiple", text: "Bạn đã sử dụng các dịch vụ nào tại phòng khám?", options: ["Khám bệnh", "Xét nghiệm máu", "Chụp X-Quang", "Mua thuốc"] },
      { id: 103, type: "yesno", text: "Bạn có sẵn sàng giới thiệu phòng khám cho người thân không?" },
      { id: 104, type: "text", text: "Bạn có góp ý gì để chúng tôi cải thiện dịch vụ không?" }
    ],
    stats: {
      101: { "Rất hài lòng": 250, "Hài lòng": 120, "Bình thường": 30, "Không hài lòng": 12 },
      102: { "Khám bệnh": 400, "Xét nghiệm máu": 250, "Chụp X-Quang": 100, "Mua thuốc": 380 },
      103: { "Yes": 390, "No": 22 },
      104: ["Dịch vụ rất tốt, nhanh chóng.", "Bãi gửi xe hơi chật.", "Bác sĩ tư vấn rất kỹ và nhiệt tình."]
    }
  },
  {
    id: 2,
    title: "Đánh giá chất lượng dịch vụ Khoa Nội",
    category: "Service Quality",
    responses: 85,
    target: 100,
    status: "Active",
    createdAt: "15/03/2024",
    questions: [],
    stats: {}
  },
  {
    id: 3,
    title: "Khảo sát nhân viên cuối năm 2023",
    category: "Employee Engagement",
    responses: 98,
    target: 100,
    status: "Closed",
    createdAt: "01/12/2023",
    questions: [],
    stats: {}
  },
];

const SURVEY_FIELDS: CrudField[] = [
  { name: "title", label: "Tiêu đề khảo sát", type: "text", placeholder: "Khảo sát hài lòng bệnh nhân Q1/2024", required: true, span: 2 },
  { name: "category", label: "Phân loại khảo sát", type: "select", required: true, options: [{ value: "Patient Satisfaction", label: "Hài lòng bệnh nhân" }, { value: "Service Quality", label: "Chất lượng dịch vụ" }, { value: "Employee Engagement", label: "Gắn kết nhân viên" }] },
  { name: "target", label: "Mục tiêu số lượng phản hồi", type: "number", placeholder: "500", required: true },
  { name: "createdAt", label: "Ngày tạo", type: "text", placeholder: "01/01/2024" },
  { name: "status", label: "Trạng thái", type: "select", options: [{ value: "Active", label: "Đang chạy" }, { value: "Closed", label: "Đã đóng" }, { value: "Draft", label: "Bản nháp" }] },
];

export default function SurveysPage() {
  const [data, setData] = useState(SURVEYS_INIT);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);

  // Detail View State
  const [selectedSurveyId, setSelectedSurveyId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("questions");

  // Question Builder State
  const [addQuestionOpen, setAddQuestionOpen] = useState(false);
  const [questionForm] = Form.useForm();

  // Handlers for List View
  const handleAdd = (v: any) => { setData((p) => [{ ...v, id: Date.now(), responses: 0, questions: [], stats: {} }, ...p]); setAddOpen(false); message.success("Đã tạo khảo sát mới!"); };
  const handleEdit = (v: any) => { setData((p) => p.map((r) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật khảo sát thành công!"); };
  const handleDelete = () => { setData((p) => p.filter((r) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xoá khảo sát!"); };

  const selectedSurvey = data.find(s => s.id === selectedSurveyId);

  const handleAddQuestion = (values: any) => {
    if (!selectedSurvey) return;
    const newQuestion = {
      id: Date.now(),
      type: values.type,
      text: values.text,
      options: values.options ? values.options.split('\n').filter((o: string) => o.trim() !== '') : []
    };

    setData(prev => prev.map(s => {
      if (s.id === selectedSurvey.id) {
        return { ...s, questions: [...(s.questions || []), newQuestion] };
      }
      return s;
    }));

    setAddQuestionOpen(false);
    questionForm.resetFields();
    message.success("Đã thêm câu hỏi mới!");
  };

  // RENDER: Question Icon Helper
  const getQuestionIcon = (type: string) => {
    switch (type) {
      case 'single': return <CheckCircleOutlined style={{ color: '#1890ff' }} />;
      case 'multiple': return <CheckSquareOutlined style={{ color: '#52c41a' }} />;
      case 'yesno': return <Switch size="small" checked disabled />;
      case 'text': return <AlignLeftOutlined style={{ color: '#faad14' }} />;
      default: return <QuestionCircleOutlined />;
    }
  };

  const getQuestionTypeName = (type: string) => {
    switch (type) {
      case 'single': return "Chọn 1 đáp án (Radio)";
      case 'multiple': return "Chọn nhiều (Checkbox)";
      case 'yesno': return "Đúng / Sai (Yes/No)";
      case 'text': return "Nhập nội dung (Text)";
      default: return "Khác";
    }
  };

  const renderDetailView = () => {
    return (
      <>
        <EhrPageHeader
          title={selectedSurvey.title}
          subtitle={`Phân loại: ${selectedSurvey.category} | Trạng thái: ${selectedSurvey.status}`}
          onBack={() => setSelectedSurveyId(null)}
          extra={
            <Space>
              <Button icon={<FormOutlined />} onClick={() => setEditRecord(selectedSurvey)}>Sửa thông tin</Button>
              <Button type="primary" icon={<PieChartOutlined />}>Xuất báo cáo PDF</Button>
              <Button type="dashed" icon={<AlignLeftOutlined />} onClick={() => window.open(`/survey/${selectedSurvey.id}`, '_blank')}>Mở trang Public</Button>
            </Space>
          }
        />

        <Row gutter={24} style={{ marginTop: 24 }}>
          <Col span={6}>
            <Card className="ehr-card" style={{ height: '100%' }}>
              <Title level={5}>Tổng quan phản hồi</Title>
              <div style={{ textAlign: 'center', margin: '24px 0' }}>
                <Progress type="dashboard" percent={Math.round((selectedSurvey.responses / selectedSurvey.target) * 100)} size={120} />
                <Title level={3} style={{ margin: '16px 0 4px' }}>{selectedSurvey.responses}</Title>
                <Text type="secondary">Phản hồi đã nhận (Mục tiêu: {selectedSurvey.target})</Text>
              </div>
              <Divider />
              <Space direction="vertical" style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text type="secondary">Tỷ lệ hoàn thành:</Text>
                  <Text strong>98%</Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text type="secondary">Thời gian TB:</Text>
                  <Text strong>02:15</Text>
                </div>
              </Space>
            </Card>
          </Col>
          <Col span={18}>
            <Card className="ehr-card" bodyStyle={{ padding: '0 24px 24px' }}>
              <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={[
                  {
                    key: "questions",
                    label: <span><FormOutlined /> Bộ Câu Hỏi</span>,
                    children: (
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                          <Text type="secondary">Quản lý cấu trúc các câu hỏi hiển thị cho người dùng.</Text>
                          <Button type="dashed" icon={<PlusOutlined />} onClick={() => setAddQuestionOpen(true)}>Thêm câu hỏi mới</Button>
                        </div>

                        {selectedSurvey.questions && selectedSurvey.questions.length > 0 ? (
                          <Space direction="vertical" size={16} style={{ width: '100%' }}>
                            {selectedSurvey.questions.map((q: any, idx: number) => (
                              <Card key={q.id} size="small" type="inner" title={<span>Câu {idx + 1}: {q.text}</span>} extra={<Tag>{getQuestionTypeName(q.type)}</Tag>}>
                                {q.type === 'single' && (
                                  <Radio.Group value={1}>
                                    <Space direction="vertical">
                                      {q.options.map((opt: string, i: number) => <Radio key={i} value={i}>{opt}</Radio>)}
                                    </Space>
                                  </Radio.Group>
                                )}
                                {q.type === 'multiple' && (
                                  <Checkbox.Group value={[0]}>
                                    <Space direction="vertical">
                                      {q.options.map((opt: string, i: number) => <Checkbox key={i} value={i}>{opt}</Checkbox>)}
                                    </Space>
                                  </Checkbox.Group>
                                )}
                                {q.type === 'yesno' && (
                                  <Radio.Group value="yes">
                                    <Space>
                                      <Radio.Button value="yes">Có (Yes)</Radio.Button>
                                      <Radio.Button value="no">Không (No)</Radio.Button>
                                    </Space>
                                  </Radio.Group>
                                )}
                                {q.type === 'text' && (
                                  <Input.TextArea rows={3} placeholder="Nội dung người dùng nhập..." disabled />
                                )}
                              </Card>
                            ))}
                          </Space>
                        ) : (
                          <div style={{ textAlign: 'center', padding: 40 }}><Text type="secondary">Chưa có câu hỏi nào trong khảo sát này.</Text></div>
                        )}
                      </div>
                    )
                  },
                  {
                    key: "stats",
                    label: <span><BarChartOutlined /> Kết quả & Thống kê</span>,
                    children: (
                      <div>
                        <Title level={5} style={{ marginBottom: 24 }}>Phân tích Dữ liệu Phản hồi</Title>

                        {selectedSurvey.questions && selectedSurvey.questions.length > 0 ? (
                          <Space direction="vertical" size={24} style={{ width: '100%' }}>
                            {selectedSurvey.questions.map((q: any, idx: number) => {
                              const stats = selectedSurvey.stats[q.id];
                              if (!stats) return null;

                              return (
                                <Card key={q.id} size="small" title={<Text strong>Câu {idx + 1}: {q.text}</Text>}>
                                  {q.type === 'text' ? (
                                    <List
                                      size="small"
                                      dataSource={stats as string[]}
                                      renderItem={(item: string) => <List.Item><Text type="secondary">"{item}"</Text></List.Item>}
                                      pagination={{ pageSize: 3, size: "small" }}
                                    />
                                  ) : (
                                    <div>
                                      {Object.keys(stats).map(key => {
                                        const count = (stats as any)[key];
                                        const percent = Math.round((count / selectedSurvey.responses) * 100) || 0;
                                        return (
                                          <div key={key} style={{ marginBottom: 12 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                              <Text>{key}</Text>
                                              <Text strong>{count} ({percent}%)</Text>
                                            </div>
                                            <Progress percent={percent} showInfo={false} strokeColor="#1890ff" />
                                          </div>
                                        )
                                      })}
                                    </div>
                                  )}
                                </Card>
                              );
                            })}
                          </Space>
                        ) : (
                          <div style={{ textAlign: 'center', padding: 40 }}><Text type="secondary">Chưa có dữ liệu phản hồi.</Text></div>
                        )}
                      </div>
                    )
                  }
                ]}
              />
            </Card>
          </Col>
        </Row>
      </>
    );
  };

  // RENDER: List View
  const renderListView = () => {
    const stats = [
      { label: "Khảo sát đang chạy", value: "08", icon: <FormOutlined /> },
      { label: "Tổng phản hồi", value: "4.2k", color: "#0050b3" },
      { label: "Tỷ lệ hoàn thành", value: "82%", color: "#52c41a" },
      { label: "Điểm NPS", value: "+68", color: "#faad14" }
    ];

    const columns = [
      {
        title: <Text strong style={{ fontSize: 11 }}>KHẢO SÁT / PHÂN LOẠI</Text>,
        render: (_: any, r: any) => (
          <Space size={12}>
            <div style={{ width: 32, height: 32, borderRadius: 4, background: '#f0f5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0050b3' }}>
              <FormOutlined />
            </div>
            <div>
              <a onClick={() => setSelectedSurveyId(r.id)}>
                <Text strong style={{ fontSize: 13, display: 'block', color: '#1890ff' }}>{r.title}</Text>
              </a>
              <Text type="secondary" style={{ fontSize: 11 }}>{r.category} • {r.createdAt}</Text>
            </div>
          </Space>
        ),
      },
      {
        title: <Text strong style={{ fontSize: 11 }}>TIẾN ĐỘ</Text>,
        render: (_: any, r: any) => (
          <div style={{ width: 180 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
              <Text type="secondary" style={{ fontSize: 10 }}>{r.responses} / {r.target} phản hồi</Text>
              <Text strong style={{ fontSize: 10 }}>{Math.round((r.responses / r.target) * 100)}%</Text>
            </div>
            <Progress percent={(r.responses / r.target) * 100} showInfo={false} strokeColor="#0050b3" size="small" />
          </div>
        ),
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
            <Button type="text" size="small" icon={<BarChartOutlined />} onClick={() => setSelectedSurveyId(r.id)} />
            <Button type="text" size="small" icon={<EditOutlined />} onClick={() => setEditRecord(r)} />
            <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => setDeleteRecord(r)} />
          </Space>
        ),
      },
    ];

    return (
      <div style={{ paddingBottom: 40 }}>
        <EhrPageHeader
          title="Surveys & Feedback Intelligence"
          subtitle="Hệ thống khảo sát hài lòng, thu thập ý kiến đóng góp và phân tích chỉ số NPS y tế tự động"
          primaryAction={{
            label: "Tạo khảo sát",
            icon: <PlusOutlined />,
            onClick: () => setAddOpen(true)
          }}
          extra={<Button icon={<HistoryOutlined />}>Lịch sử khảo sát</Button>}
        />

        <EhrStatCards stats={stats} />

        <EhrFilterBar placeholder="Tìm khảo sát, phân loại...">
          <Select placeholder="Phân loại" style={{ width: 150 }} options={[{ value: "ps", label: "Hài lòng BN" }]} />
        </EhrFilterBar>

        <Card className="ehr-card" bodyStyle={{ padding: 0 }}>
          <Table
            className="ehr-table-compact"
            dataSource={data}
            rowKey="id"
            pagination={false}
            columns={columns}
            size="small"
          />
        </Card>
      </div>
    );
  };

  return (
    <div style={{ paddingBottom: 40 }}>
      {selectedSurvey ? renderDetailView() : renderListView()}

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Khảo sát" fields={SURVEY_FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.title} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />

      {/* Question Builder Modal */}
      <Modal
        title="Thêm Câu hỏi mới"
        open={addQuestionOpen}
        onCancel={() => setAddQuestionOpen(false)}
        onOk={() => questionForm.submit()}
        okText="Thêm câu hỏi"
        cancelText="Huỷ"
      >
        <Form form={questionForm} layout="vertical" onFinish={handleAddQuestion}>
          <Form.Item name="type" label="Loại câu hỏi" initialValue="single" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="single">Chọn 1 đáp án (Radio)</Select.Option>
              <Select.Option value="multiple">Chọn nhiều đáp án (Checkbox)</Select.Option>
              <Select.Option value="yesno">Đúng / Sai (Yes/No)</Select.Option>
              <Select.Option value="text">Nhập văn bản tự do (Text)</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="text" label="Nội dung câu hỏi" rules={[{ required: true, message: 'Vui lòng nhập câu hỏi' }]}>
            <Input.TextArea rows={2} placeholder="Ví dụ: Bạn đánh giá thế nào về..." />
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}
          >
            {({ getFieldValue }) => {
              const type = getFieldValue('type');
              if (type === 'single' || type === 'multiple') {
                return (
                  <Form.Item name="options" label="Các lựa chọn (Mỗi dòng 1 lựa chọn)" rules={[{ required: true, message: 'Vui lòng nhập ít nhất 1 lựa chọn' }]}>
                    <Input.TextArea rows={4} placeholder={`Rất hài lòng\nHài lòng\nBình thường\nKhông hài lòng`} />
                  </Form.Item>
                );
              }
              return null;
            }}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}