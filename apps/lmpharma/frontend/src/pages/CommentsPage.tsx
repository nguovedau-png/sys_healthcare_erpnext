import React, { useState } from 'react';
import { Table, Tag, Button, Space, Card, Modal, message, Popconfirm } from 'antd';
import { CheckOutlined, CloseOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { useFrappeGetDocList, useFrappeUpdateDoc, useFrappeDeleteDoc } from 'frappe-react-sdk';

const CommentsPage: React.FC = () => {
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState<any>(null);

  const { data, isLoading, mutate } = useFrappeGetDocList('Comment', {
    fields: ['name', 'name_field', 'email', 'subject', 'content', 'date', 'status', 'total_like'],
    limit: 100,
    orderBy: { field: 'date', order: 'desc' },
  });

  const updateDoc = useFrappeUpdateDoc();
  const deleteDoc = useFrappeDeleteDoc();

  const handleView = (record: any) => {
    setSelectedComment(record);
    setViewModalOpen(true);
  };

  const handleApprove = async (name: string) => {
    try {
      await updateDoc.updateDoc('Comment', name, { status: 1 });
      message.success('Comment approved');
      mutate();
    } catch (error) {
      message.error('Failed to approve comment');
    }
  };

  const handleReject = async (name: string) => {
    try {
      await updateDoc.updateDoc('Comment', name, { status: 0 });
      message.success('Comment rejected');
      mutate();
    } catch (error) {
      message.error('Failed to reject comment');
    }
  };

  const handleDelete = async (name: string) => {
    try {
      await deleteDoc.deleteDoc('Comment', name);
      message.success('Comment deleted successfully');
      mutate();
    } catch (error) {
      message.error('Failed to delete comment');
    }
  };

  const columns = [
    {
      title: 'Author',
      dataIndex: 'name_field',
      key: 'name_field',
      render: (text: string) => <strong>{text || 'Anonymous'}</strong>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      ellipsis: true,
      width: 300,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => date ? new Date(date).toLocaleDateString() : '-',
    },
    {
      title: 'Likes',
      dataIndex: 'total_like',
      key: 'total_like',
      render: (likes: number) => <Tag color="red">❤️ {likes || 0}</Tag>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: number) => status ? 
        <Tag color="green"><CheckOutlined /> Approved</Tag> : 
        <Tag color="default"><CloseOutlined /> Pending</Tag>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button type="text" size="small" icon={<EyeOutlined />} onClick={() => handleView(record)}>
            View
          </Button>
          {record.status === 0 ? (
            <Popconfirm
              title="Approve Comment"
              description="Are you sure you want to approve this comment?"
              onConfirm={() => handleApprove(record.name)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="text" size="small" style={{ color: '#52c41a' }}>
                <CheckOutlined /> Approve
              </Button>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Reject Comment"
              description="Are you sure you want to reject this comment?"
              onConfirm={() => handleReject(record.name)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="text" size="small" style={{ color: '#faad14' }}>
                <CloseOutlined /> Reject
              </Button>
            </Popconfirm>
          )}
          <Popconfirm
            title="Delete Comment"
            description="Are you sure you want to delete this comment?"
            onConfirm={() => handleDelete(record.name)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" danger size="small" icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card title="Comments Management" bordered={false}>
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        rowKey="name"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title="Comment Details"
        open={viewModalOpen}
        onCancel={() => setViewModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setViewModalOpen(false)}>
            Close
          </Button>,
        ]}
        width={700}
      >
        {selectedComment && (
          <div style={{ padding: '16px 0' }}>
            <div style={{ marginBottom: 16 }}>
              <strong>Author:</strong> {selectedComment.name_field || 'Anonymous'}
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>Email:</strong> {selectedComment.email || 'N/A'}
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>Subject:</strong> {selectedComment.subject || 'N/A'}
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>Date:</strong> {selectedComment.date ? new Date(selectedComment.date).toLocaleString() : 'N/A'}
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>Likes:</strong> {selectedComment.total_like || 0}
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>Status:</strong>{' '}
              {selectedComment.status ? (
                <Tag color="green"><CheckOutlined /> Approved</Tag>
              ) : (
                <Tag color="default"><CloseOutlined /> Pending</Tag>
              )}
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>Content:</strong>
              <div style={{ 
                marginTop: 8, 
                padding: 12, 
                backgroundColor: '#f5f5f5', 
                borderRadius: 4,
                whiteSpace: 'pre-wrap',
                maxHeight: 300,
                overflow: 'auto'
              }}>
                {selectedComment.content}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default CommentsPage;
