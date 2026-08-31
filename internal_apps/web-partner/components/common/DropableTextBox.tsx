import React from 'react';
import { ItemTypes } from './ItemTypes';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import type { Identifier } from 'dnd-core';

interface Answer {
  key: string;
  name: string;
}

interface DropItem {
  value: string;
}

interface DropableTextBoxProps {
  answer: Answer | null;
  status: string | null;
  onDrop: (item: DropItem) => void;
  name: string;
}

interface DropCollectedProps {
  canDrop: boolean;
  isOver: boolean;
}

const DropableTextBox: React.FC<DropableTextBoxProps> = ({ 
  answer, 
  status, 
  onDrop, 
  name 
}) => {
  const [collected, drop] = useDrop<DropItem, void, DropCollectedProps>(() => ({
    accept: ItemTypes.TEXTBOX,
    drop: onDrop,
    collect: (monitor: DropTargetMonitor): DropCollectedProps => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    })
  }), [onDrop]);

  const { canDrop, isOver } = collected;


  const isActive = isOver && canDrop;
  let borderStyle: 'solid' | 'dashed' = 'solid';
  
  if (isActive) {
    borderStyle = 'dashed';
  } else if (canDrop) {
    borderStyle = 'dashed';
  }

  return (
    // @ts-ignore
    <div ref={drop}>
      <input
        className="d-none"
        readOnly
        value={answer?.key || ''}
        id={name}
      />
      <label
        className={`textbox readonly ${status || ''}`}
        style={{ borderStyle }}
        htmlFor={name}
      >
        {answer?.name || ''}
      </label>
    </div>
  );
};

export default DropableTextBox;