"use client";
import React from "react";
import { Modal, Button, Space, Typography } from "antd";
import {
  DeleteOutlined, CloseOutlined,
  ExclamationCircleFilled, WarningFilled,
} from "@ant-design/icons";

const { Text } = Typography;

interface DeleteModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  recordName?: string;
  description?: string;
  loading?: boolean;
}

export default function DeleteModal({
  open, onConfirm, onCancel, recordName, description, loading = false,
}: DeleteModalProps) {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      width={420}
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
      {/* ── Danger accent bar ── */}
      <div style={{ height: 4, background: "linear-gradient(90deg, #cf1322, #ff4d4f)" }} />

      {/* ── Body ── */}
      <div style={{ padding: "24px 24px 16px" }}>
        <Space size={14} align="start">
          <div style={{
            width: 44, height: 44, borderRadius: 4, flexShrink: 0,
            background: "#fff1f0", border: "1px solid #ffccc7",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <WarningFilled style={{ fontSize: 22, color: "#cf1322" }} />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#1f1f1f", marginBottom: 4, lineHeight: 1.3 }}>
              Xác nhận Xóa bản ghi
            </div>
            <div style={{ fontSize: 13, color: "#595959", lineHeight: 1.6 }}>
              {description ?? (
                <>
                  Thao tác này sẽ{" "}
                  <span style={{ fontWeight: 700, color: "#cf1322" }}>xóa vĩnh viễn</span>{" "}
                  bản ghi và không thể hoàn tác.
                </>
              )}
            </div>
          </div>
        </Space>

        {recordName && (
          <div style={{
            marginTop: 14,
            background: "#fafafa", border: "1px solid #f0f0f0",
            borderLeft: "3px solid #ff4d4f", borderRadius: 4,
            padding: "9px 14px", display: "flex", alignItems: "center", gap: 10,
          }}>
            <DeleteOutlined style={{ color: "#ff4d4f", fontSize: 13, flexShrink: 0 }} />
            <span style={{
              fontWeight: 600, color: "#1f1f1f", fontSize: 13,
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>
              {recordName}
            </span>
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <div style={{
        padding: "10px 24px 18px",
        display: "flex", gap: 10,
        borderTop: "1px solid #f5f5f5",
      }}>
        <Button
          size="large"
          onClick={onCancel}
          style={{ flex: 1, height: 38, borderRadius: 4, fontWeight: 600, fontSize: 13 }}
        >
          Hủy bỏ
        </Button>
        <Button
          size="large"
          danger
          type="primary"
          loading={loading}
          onClick={onConfirm}
          icon={<DeleteOutlined />}
          style={{ flex: 1.5, height: 38, borderRadius: 4, fontWeight: 700, fontSize: 13 }}
        >
          Xác nhận Xóa
        </Button>
      </div>
    </Modal>
  );
}