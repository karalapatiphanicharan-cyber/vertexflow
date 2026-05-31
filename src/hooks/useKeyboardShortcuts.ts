import { useEffect } from 'react';
import { useGraphStore } from '../store/useGraphStore';

export const useKeyboardShortcuts = () => {
  const {
    undo,
    redo,
    isPlaying,
    setIsPlaying,
    nextStep,
    prevStep,
    clearGraph
  } = useGraphStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Undo: Ctrl+Z
      if (e.ctrlKey && e.key === 'z') {
        e.preventDefault();
        undo();
      }
      // Redo: Ctrl+Y or Ctrl+Shift+Z
      if ((e.ctrlKey && e.key === 'y') || (e.ctrlKey && e.shiftKey && e.key === 'Z')) {
        e.preventDefault();
        redo();
      }
      // Play/Pause: Space
      if (e.code === 'Space' && (e.target as HTMLElement).tagName !== 'INPUT' && (e.target as HTMLElement).tagName !== 'SELECT') {
        e.preventDefault();
        setIsPlaying(!isPlaying);
      }
      // Next Step: Right Arrow
      if (e.key === 'ArrowRight') {
        nextStep();
      }
      // Prev Step: Left Arrow
      if (e.key === 'ArrowLeft') {
        prevStep();
      }
      // Clear: Escape
      if (e.key === 'Escape') {
        clearGraph();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, isPlaying, setIsPlaying, nextStep, prevStep, clearGraph]);
};
