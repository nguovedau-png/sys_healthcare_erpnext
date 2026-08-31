import React from 'react';
import classNames from 'classnames';
import Spin from './Spin';
import Empty from './Empty';

export interface ColumnType<T = any> {
  title: React.ReactNode;
  dataIndex?: string;
  key: string;
  render?: (value: any, record: T, index: number) => React.ReactNode;
}

export interface TableProps<T = any> {
  dataSource?: T[];
  columns: ColumnType<T>[];
  rowKey?: string | ((record: T) => string);
  loading?: boolean;
  className?: string;
  pagination?: { pageSize?: number } | false;
}

const Table = <T extends Record<string, any>>({
  dataSource = [],
  columns,
  rowKey = 'id',
  loading = false,
  className,
  pagination,
}: TableProps<T>) => {
  const getRowKey = (record: T, index: number) => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return record[rowKey] !== undefined ? record[rowKey] : index;
  };

  return (
    <div className={classNames('w-full overflow-x-auto', className)}>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 bg-slate-50 text-slate-600 font-semibold text-sm border-b border-slate-200"
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="relative">
          {loading && (
            <tr>
              <td colSpan={columns.length} className="h-32">
                <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-10">
                  <Spin size="large" />
                </div>
              </td>
            </tr>
          )}
          {!loading && dataSource.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="py-8">
                <Empty />
              </td>
            </tr>
          ) : (
            dataSource.map((record, index) => (
              <tr
                key={getRowKey(record, index)}
                className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-sm text-slate-700">
                    {col.render
                      ? col.render(col.dataIndex ? record[col.dataIndex] : undefined, record, index)
                      : col.dataIndex
                      ? record[col.dataIndex]
                      : null}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {pagination !== false && dataSource.length > (pagination?.pageSize || 10) && (
        <div className="py-4 px-4 text-center text-sm text-slate-500 bg-white border-t border-slate-100">
          Hiển thị nhiều trang chưa được hỗ trợ trong phiên bản đơn giản này
        </div>
      )}
    </div>
  );
};

export default Table;
