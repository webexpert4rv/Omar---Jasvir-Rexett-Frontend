import React, { memo } from "react";
import { useDrag } from "react-dnd";

const DraggableTag = ({ dragDetails }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TAG",
    item: { ...dragDetails },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }} class={"d-flex align-items-center gap-2"}>
      <div className="drag-icon">{dragDetails.icon}</div>
      <p className="mb-0">{dragDetails.tag}</p>
    </div>
  );
};

export default memo(DraggableTag);
