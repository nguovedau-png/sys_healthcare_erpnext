import React from 'react';
import { createRoot } from 'react-dom/client';
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineInfoCircle, AiOutlineWarning } from 'react-icons/ai';

type MessageType = 'success' | 'error' | 'info' | 'warning';

interface MessageConfig {
  content: string;
  duration?: number;
  type?: MessageType;
}

class MessageManager {
  private container: HTMLDivElement | null = null;

  private getContainer() {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'fixed top-4 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 pointer-events-none';
      document.body.appendChild(this.container);
    }
    return this.container;
  }

  private show(config: MessageConfig) {
    const { content, duration = 3, type = 'info' } = config;
    const container = this.getContainer();
    
    const messageWrap = document.createElement('div');
    // Animate in
    messageWrap.className = 'bg-white shadow-lg rounded-lg px-4 py-3 flex items-center gap-3 transition-all duration-300 transform translate-y-[-20px] opacity-0 pointer-events-auto border border-slate-100';
    
    container.appendChild(messageWrap);
    
    // Create root and render
    const root = createRoot(messageWrap);
    
    const getIcon = () => {
      switch (type) {
        case 'success': return <AiOutlineCheckCircle className="text-teal-500 text-xl" />;
        case 'error': return <AiOutlineCloseCircle className="text-red-500 text-xl" />;
        case 'warning': return <AiOutlineWarning className="text-orange-500 text-xl" />;
        case 'info':
        default: return <AiOutlineInfoCircle className="text-blue-500 text-xl" />;
      }
    };

    root.render(
      <>
        {getIcon()}
        <span className="text-slate-700 font-medium text-sm">{content}</span>
      </>
    );

    // Trigger animation
    requestAnimationFrame(() => {
      messageWrap.classList.remove('translate-y-[-20px]', 'opacity-0');
      messageWrap.classList.add('translate-y-0', 'opacity-100');
    });

    // Auto remove
    setTimeout(() => {
      messageWrap.classList.remove('translate-y-0', 'opacity-100');
      messageWrap.classList.add('translate-y-[-20px]', 'opacity-0');
      
      setTimeout(() => {
        root.unmount();
        if (container.contains(messageWrap)) {
          container.removeChild(messageWrap);
        }
      }, 300);
    }, duration * 1000);
  }

  success(content: string, duration?: number) { this.show({ content, duration, type: 'success' }); }
  error(content: string, duration?: number) { this.show({ content, duration, type: 'error' }); }
  info(content: string, duration?: number) { this.show({ content, duration, type: 'info' }); }
  warning(content: string, duration?: number) { this.show({ content, duration, type: 'warning' }); }
}

export const message = new MessageManager();
