import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

const NodeComponent = ({ data, selected }: any) => {
  const typeStyles: Record<string, string> = {
    start: 'bg-primary-yellow text-black',
    end: 'bg-red-500 text-white',
    visited: 'bg-primary-blue text-white',
    completed: 'bg-green-500 text-white',
    highlight: 'bg-orange-500 text-black',
    default: 'bg-white text-black'
  };

  const bgClass = typeStyles[data.type] || typeStyles.default;

  return (
    <div className={`px-4 py-2 border-4 border-black font-black uppercase text-xs shadow-brutal transition-all duration-300 ${bgClass} ${selected ? 'ring-4 ring-primary-yellow ring-offset-2' : ''}`}>
      <Handle type="target" position={Position.Top} className="w-2 h-2 bg-black border-2 border-white" />
      {data.label}
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 bg-black border-2 border-white" />
    </div>
  );
};

export default memo(NodeComponent);
