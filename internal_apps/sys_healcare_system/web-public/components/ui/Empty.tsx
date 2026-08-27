import React from 'react';
import classNames from 'classnames';

export interface EmptyProps {
  description?: React.ReactNode;
  image?: React.ReactNode;
  imageStyle?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

const DefaultImage = (
  <svg
    className="w-16 h-16 text-slate-300 mx-auto"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1}
      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
    />
  </svg>
);

const SimpleImage = (
  <svg
    className="w-12 h-12 text-slate-200 mx-auto"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1}
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const Empty: React.FC<EmptyProps> & {
  PRESENTED_IMAGE_SIMPLE: React.ReactNode;
  PRESENTED_IMAGE_DEFAULT: React.ReactNode;
} = ({
  description = 'No Data',
  image,
  imageStyle,
  className,
  children,
}) => {
  return (
    <div
      className={classNames('flex flex-col items-center justify-center py-8 text-slate-500', className)}
    >
      <div className="mb-4" style={imageStyle}>
        {image || DefaultImage}
      </div>
      <div className="text-sm">{description}</div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};

Empty.PRESENTED_IMAGE_SIMPLE = SimpleImage;
Empty.PRESENTED_IMAGE_DEFAULT = DefaultImage;

export default Empty;
