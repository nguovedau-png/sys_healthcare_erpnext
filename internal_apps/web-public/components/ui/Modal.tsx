import React, { useEffect } from 'react';
import classNames from 'classnames';
import { createPortal } from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';

export interface ModalProps {
  open?: boolean;
  onCancel?: () => void;
  onOk?: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  centered?: boolean;
  destroyOnClose?: boolean;
  width?: string | number;
  className?: string;
  okText?: string;
  cancelText?: string;
}

const Modal: React.FC<ModalProps> = ({
  open = false,
  onCancel,
  onOk,
  title,
  children,
  footer,
  centered = false,
  destroyOnClose = false,
  width = 520,
  className,
  okText = 'OK',
  cancelText = 'Cancel',
}) => {
  const [shouldRender, setShouldRender] = React.useState(open);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      if (destroyOnClose) {
        setTimeout(() => setShouldRender(false), 300);
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open, destroyOnClose]);

  if (!shouldRender && !open) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && onCancel) {
      onCancel();
    }
  };

  const defaultFooter = (
    <div className="flex justify-end gap-3 mt-6">
      <button
        onClick={onCancel}
        className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
      >
        {cancelText}
      </button>
      <button
        onClick={onOk}
        className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
      >
        {okText}
      </button>
    </div>
  );

  const modalContent = (
    <div
      className={classNames(
        'fixed inset-0 z-50 flex p-4 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300',
        centered ? 'items-center justify-center' : 'items-start justify-center pt-24',
        open ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
      onClick={handleBackdropClick}
    >
      <div
        className={classNames(
          'relative bg-white rounded-lg shadow-2xl flex flex-col w-full max-h-[calc(100vh-2rem)] transition-all duration-300 transform',
          open ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 -translate-y-4 opacity-0',
          className
        )}
        style={{ maxWidth: width }}
      >
        {title && (
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="text-lg font-bold text-slate-800">{title}</div>
            <button
              onClick={onCancel}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <AiOutlineClose size={20} />
            </button>
          </div>
        )}
        
        {!title && onCancel && (
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 z-10 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <AiOutlineClose size={20} />
          </button>
        )}

        <div className="px-6 py-5 overflow-y-auto">
          {children}
        </div>

        {footer !== null && (
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl">
            {footer || defaultFooter}
          </div>
        )}
      </div>
    </div>
  );

  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  return null;
};

export default Modal;
