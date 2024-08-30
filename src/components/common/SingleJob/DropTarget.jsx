import React from 'react';
import { useDrop } from 'react-dnd';

const DropZone = ({ onDrop, children }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'FIELD',
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} style={{ backgroundColor: isOver ? 'lightgreen' : 'white' }}>
      {children}
    </div>
  );
};

export default DropZone;
