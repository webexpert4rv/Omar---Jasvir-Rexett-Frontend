import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableField = ({ type, icon, label }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'FIELD',
    item: { type, label },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div className="drag-icon">
        {icon}
      </div>
      <p className="mb-0">{label}</p>
    </div>
  );
};

export default DraggableField;
