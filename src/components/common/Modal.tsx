import React from 'react';
import { X } from 'lucide-react';
import { NeoButton } from './NeoButton';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b-4 border-black bg-primary-yellow">
          <h3 className="text-xl font-black uppercase mb-0 tracking-tight">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-black/10 rounded-none transition-colors border-2 border-black"
          >
            <X size={20} strokeWidth={3} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
        {footer && (
          <div className="flex justify-end gap-3 p-4 border-t-4 border-black bg-gray-50">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
