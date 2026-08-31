import React from 'react';
import classNames from 'classnames';

export interface PaginationProps {
  current?: number;
  pageSize?: number;
  total?: number;
  onChange?: (page: number, pageSize: number) => void;
  className?: string;
  showSizeChanger?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  current = 1,
  pageSize = 10,
  total = 0,
  onChange,
  className,
  showSizeChanger = false,
}) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== current) {
      if (onChange) onChange(page, pageSize);
    }
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className={classNames('flex items-center gap-2', className)}>
      <button
        disabled={current === 1}
        onClick={() => handlePageChange(current - 1)}
        className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-300 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={classNames(
            'w-8 h-8 flex items-center justify-center rounded-md text-sm transition-colors',
            current === page
              ? 'bg-teal-600 text-white font-medium border border-teal-600'
              : 'border border-slate-300 text-slate-600 hover:bg-slate-50'
          )}
        >
          {page}
        </button>
      ))}

      <button
        disabled={current === totalPages}
        onClick={() => handlePageChange(current + 1)}
        className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-300 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
