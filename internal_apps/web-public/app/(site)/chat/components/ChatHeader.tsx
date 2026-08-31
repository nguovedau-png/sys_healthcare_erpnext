'use client';

import React from 'react';
import Image from 'next/image';
import { User } from '../types';

interface ChatHeaderProps {
  participants: User[];
  onlineUsers?: string[];
  currentUserId: string;
  onVideoCall?: () => void;
  onVoiceCall?: () => void;
  onViewProfile?: (userId: string) => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  participants,
  onlineUsers = [],
  currentUserId,
  onVideoCall,
  onVoiceCall,
  onViewProfile
}) => {
  const otherParticipants = participants.filter(p => p.id !== currentUserId);
  const isGroup = otherParticipants.length > 1;

  const getStatusText = () => {
    if (isGroup) {
      const onlineCount = otherParticipants.filter(p => onlineUsers.includes(p.id)).length;
      return `${onlineCount} thành viên đang hoạt động`;
    } else {
      const otherUser = otherParticipants[0];
      return onlineUsers.includes(otherUser.id) ? 'Đang hoạt động' : 'Không hoạt động';
    }
  };

  return (
    <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
      <div className="flex items-center flex-1">
        <div className="relative">
          {isGroup ? (
            <div className="flex -space-x-3">
              {otherParticipants.slice(0, 3).map((participant) => (
                <div key={participant.id} className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white shadow-soft">
                  <img
                    src={participant.avatar || '/assets/default-avatar.png'}
                    alt={participant.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {otherParticipants.length > 3 && (
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-xs font-black text-slate-500 border-2 border-white">
                  +{otherParticipants.length - 3}
                </div>
              )}
            </div>
          ) : (
            <div
              className="relative cursor-pointer group"
              onClick={() => onViewProfile?.(otherParticipants[0].id)}
            >
              <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white shadow-premium bg-white group-hover:scale-105 transition-transform duration-300">
                <img
                  src={otherParticipants[0].avatar || '/assets/default-avatar.png'}
                  alt={otherParticipants[0].name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${onlineUsers.includes(otherParticipants[0].id) || otherParticipants[0].id.startsWith('pharmacy') ? 'bg-teal-500' : 'bg-slate-300'}`} />
            </div>
          )}
        </div>

        <div className="ml-5">
          <h2 className="text-lg font-black text-slate-900 tracking-tight leading-tight">
            {isGroup
              ? otherParticipants.map(p => p.name).join(', ')
              : otherParticipants[0].name
            }
          </h2>
          <div className="flex items-center gap-2 mt-1">
             <div className={`w-1.5 h-1.5 rounded-full ${onlineUsers.includes(otherParticipants[0]?.id) || otherParticipants[0]?.id?.startsWith('pharmacy') ? 'bg-teal-500 animate-pulse' : 'bg-slate-300'}`}></div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">{getStatusText()}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {!isGroup && (
          <>
            <button
              onClick={onVoiceCall}
              className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
              title="Gọi thoại"
            >
              📞
            </button>
            <button
              onClick={onVideoCall}
              className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
              title="Gọi video"
            >
              🎥
            </button>
          </>
        )}
        <button
          onClick={() => onViewProfile?.(isGroup ? '' : otherParticipants[0].id)}
          className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
          title="Xem thông tin"
        >
          ℹ️
        </button>
        <div className="w-px h-6 bg-slate-100 mx-2"></div>
        <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
          🚫
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;