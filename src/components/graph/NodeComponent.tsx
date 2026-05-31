import React, { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { useGraphStore } from '../../store/useGraphStore';
import { X } from 'lucide-react';

const NodeComponent = ({ id, data, selected }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label);
  const renameNode = useGraphStore(state => state.renameNode);
  const deleteNode = useGraphStore(state => state.deleteNode);

  const typeStyles: Record<string, string> = {
    start: 'bg-primary-yellow text-black',
    end: 'bg-red-500 text-white',
    visited: 'bg-primary-blue text-white',
    completed: 'bg-green-500 text-white',
    highlight: 'bg-orange-500 text-black',
    default: 'bg-white text-black'
  };

  const bgClass = typeStyles[data.type] || typeStyles.default;

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    renameNode(id, label);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      renameNode(id, label);
    }
  };

  return (
    <div
      onDoubleClick={handleDoubleClick}
      className={`px-4 py-2 border-4 border-black font-black uppercase text-xs shadow-brutal transition-all duration-300 ${bgClass} ${selected ? 'ring-4 ring-primary-yellow ring-offset-2' : ''} cursor-pointer group relative min-w-[60px] text-center`}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-black border-2 border-white" />

      {isEditing ? (
        <input
          autoFocus
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-none outline-none w-full font-black uppercase text-center"
        />
      ) : (
        <span>{data.label}</span>
      )}

      {selected && !isEditing && (
         <button
           onClick={() => deleteNode(id)}
           className="absolute -top-4 -right-4 bg-red-500 text-white border-2 border-black p-0.5 hover:bg-red-600 shadow-brutal active:translate-x-0.5 active:translate-y-0.5 active:shadow-none z-50 rounded-full"
         >
            <X size={12} strokeWidth={4} />
         </button>
      )}

      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-black border-2 border-white" />
    </div>
  );
};

export default memo(NodeComponent);
