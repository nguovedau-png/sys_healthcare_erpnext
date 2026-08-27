"use client";
import React, { useEffect } from "react";
import {
  Modal, Form, Input, Select, DatePicker, InputNumber,
  Button, Switch, TimePicker, Divider, Space, Typography,
} from "antd";
import {
  PlusOutlined, EditOutlined, SaveOutlined, CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Text } = Typography;

export type FieldType =
  | "text" | "textarea" | "number" | "select" | "date"
  | "time" | "switch" | "email" | "phone" | "price";

export interface CrudField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: { value: string | number; label: string }[];
  span?: 1 | 2;
  rows?: number;
}

interface CrudModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  record?: any | null;
  title: string;
  fields: CrudField[];
  loading?: boolean;
}

const INPUT_STYLE: React.CSSProperties = {
  borderRadius: 4,
  fontSize: 13,
  height: 36,
};

const LABEL_STYLE: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  color: "#595959",
  textTransform: "uppercase",
  letterSpacing: "0.04em",
};

export default function CrudModal({
  open, onClose, onSubmit, record, title, fields, loading = false,
}: CrudModalProps) {
  const [form] = Form.useForm();
  const isEdit = !!record;

  useEffect(() => {
    if (open) {
      if (record) {
        const values: any = { ...record };
        fields.forEach((f) => {
          if (f.type === "date" && values[f.name]) values[f.name] = dayjs(values[f.name]);
          if (f.type === "time" && values[f.name]) values[f.name] = dayjs(values[f.name], "HH:mm");
        });
        form.setFieldsValue(values);
      } else {
        form.resetFields();
      }
    }
  }, [open, record, form, fields]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      fields.forEach((f) => {
        if (f.type === "date" && values[f.name]) values[f.name] = values[f.name].format("YYYY-MM-DD");
        if (f.type === "time" && values[f.name]) values[f.name] = values[f.name].format("HH:mm");
      });
      onSubmit(values);
    } catch { /* validation failed */ }
  };

  const renderField = (field: CrudField) => {
    const sharedStyle = { ...INPUT_STYLE };
    switch (field.type) {
      case "textarea":
        return (
          <Input.TextArea
            placeholder={field.placeholder}
            rows={field.rows ?? 3}
            style={{ borderRadius: 4, fontSize: 13, resize: "none" }}
          />
        );
      case "number":
        return <InputNumber placeholder={field.placeholder} style={{ ...sharedStyle, width: "100%" }} />;
      case "price":
        return (
          <InputNumber
            placeholder={field.placeholder}
            formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            parser={(v) => v?.replace(/,/g, "") as any}
            addonAfter="₫"
            style={{ width: "100%", fontSize: 13 }}
          />
        );
      case "select":
        return (
          <Select
            placeholder={field.placeholder ?? `Chọn ${field.label.toLowerCase()}...`}
            options={field.options}
            allowClear
            style={{ width: "100%", fontSize: 13 }}
          />
        );
      case "date":
        return <DatePicker placeholder={field.placeholder ?? "Chọn ngày"} format="DD/MM/YYYY" style={{ ...sharedStyle, width: "100%" }} />;
      case "time":
        return <TimePicker placeholder={field.placeholder ?? "Chọn giờ"} format="HH:mm" style={{ ...sharedStyle, width: "100%" }} />;
      case "switch":
        return <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />;
      case "email":
        return <Input type="email" placeholder={field.placeholder} style={sharedStyle} />;
      case "phone":
        return <Input type="tel" placeholder={field.placeholder} style={sharedStyle} />;
      default:
        return <Input placeholder={field.placeholder} style={sharedStyle} />;
    }
  };

  const requiredCount = fields.filter((f) => f.required).length;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={660}
      centered
      destroyOnClose
      closable={false}
      styles={{
        header: { display: "none" },
        body: { padding: 0 },
        content: { borderRadius: 4, overflow: "hidden", padding: 0 },
        mask: { backdropFilter: "blur(2px)", background: "rgba(0,0,0,0.55)" },
      }}
    >
      {/* ── Header ── */}
      <div style={{
        background: "linear-gradient(135deg, #001529 0%, #002766 100%)",
        padding: "14px 20px",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 4, flexShrink: 0,
          background: isEdit ? "rgba(250,173,20,0.2)" : "rgba(24,144,255,0.2)",
          border: `1px solid ${isEdit ? "rgba(250,173,20,0.4)" : "rgba(24,144,255,0.4)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {isEdit
            ? <EditOutlined style={{ fontSize: 16, color: "#faad14" }} />
            : <PlusOutlined style={{ fontSize: 16, color: "#69c0ff" }} />
          }
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 1 }}>
            {isEdit ? "Chỉnh sửa bản ghi" : "Tạo bản ghi mới"}
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>
            {title}
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            background: "none", border: "none", cursor: "pointer",
            width: 28, height: 28, display: "flex", alignItems: "center",
            justifyContent: "center", borderRadius: 4, flexShrink: 0,
            color: "rgba(255,255,255,0.5)", transition: "background 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
          onMouseLeave={e => (e.currentTarget.style.background = "none")}
        >
          <CloseOutlined style={{ fontSize: 13 }} />
        </button>
      </div>

      {/* ── Required fields hint ── */}
      {requiredCount > 0 && (
        <div style={{ background: "#f0f5ff", padding: "6px 20px", borderBottom: "1px solid #d6e4ff" }}>
          <Text style={{ fontSize: 11, color: "#0050b3" }}>
            <span style={{ color: "#f5222d", fontWeight: 700 }}>*</span>{" "}
            {requiredCount} trường bắt buộc cần điền
          </Text>
        </div>
      )}

      {/* ── Form body ── */}
      <div style={{ padding: "16px 20px", background: "#fff", maxHeight: "58vh", overflowY: "auto" }}>
        <Form form={form} layout="vertical" requiredMark={false}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "4px 20px" }}>
            {fields.map((field) => (
              <div key={field.name} style={field.span === 2 ? { gridColumn: "span 2" } : undefined}>
                <Form.Item
                  name={field.name}
                  label={
                    <span style={LABEL_STYLE}>
                      {field.label}
                      {field.required && <span style={{ color: "#f5222d", marginLeft: 3 }}>*</span>}
                    </span>
                  }
                  rules={field.required ? [{ required: true, message: `Bắt buộc nhập ${field.label}` }] : []}
                  valuePropName={field.type === "switch" ? "checked" : "value"}
                  style={{ marginBottom: 12 }}
                >
                  {renderField(field)}
                </Form.Item>
              </div>
            ))}
          </div>
        </Form>
      </div>

      {/* ── Footer ── */}
      <div style={{
        padding: "10px 20px",
        background: "#fafafa",
        borderTop: "1px solid #f0f0f0",
        display: "flex",
        gap: 10,
        justifyContent: "flex-end",
      }}>
        <Button
          size="large"
          onClick={onClose}
          style={{ flex: 1, height: 40, borderRadius: 4, border: "1px solid #d9d9d9", fontWeight: 600, fontSize: 13 }}
        >
          Hủy bỏ
        </Button>
        <Button
          size="large"
          type="primary"
          loading={loading}
          onClick={handleOk}
          icon={isEdit ? <SaveOutlined /> : <CheckOutlined />}
          style={{
            flex: 1, height: 40, borderRadius: 4, fontWeight: 700, fontSize: 13,
            background: isEdit ? "#faad14" : "#0050b3",
            borderColor: isEdit ? "#faad14" : "#0050b3",
          }}
        >
          {isEdit ? "Lưu thay đổi" : "Tạo mới"}
        </Button>
      </div>
    </Modal>
  );
}