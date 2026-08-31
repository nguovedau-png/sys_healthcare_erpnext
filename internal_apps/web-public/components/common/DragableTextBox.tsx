import React from 'react';
import { ItemTypes } from './ItemTypes';
import { useDrag, DragSourceMonitor, ConnectDragSource, DragPreviewOptions } from 'react-dnd';
import type { Identifier } from 'dnd-core';

interface DragItem {
  value: string;
}

interface DragableTextBoxProps {
  name: string;
  value: string;
  isDropped: boolean;
  isDisabled: string;
  onEnd: (item: DragItem | undefined, monitor: DragSourceMonitor) => void;
}

interface DragCollectedProps {
  opacity: number;
  isDragging: boolean;
}

const DragableTextBox: React.FC<DragableTextBoxProps> = ({ 
  name, 
  value, 
  isDropped, 
  isDisabled, 
  onEnd 
}) => {
  const [collected, drag] = useDrag<DragItem, void, DragCollectedProps>(() => ({
    type: ItemTypes.TEXTBOX,
    item: { value },
    end: onEnd,
    collect: (monitor): DragCollectedProps => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
      isDragging: monitor.isDragging(),
    }),
  }), [value, onEnd]);

  const { opacity } = collected;


  return (
    <span
      // @ts-ignore
      ref={drag}
      className={`textbox ${isDisabled}`}
      style={{ opacity }}
      data-value={value}
    >
      {isDropped ? <u>{name}</u> : name}
    </span>
  );
};

export default DragableTextBox;