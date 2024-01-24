import { useEffect } from "react";

export const Modal = ({ src, alt, onClose }) => {
  const handleKeyDown = (event) => {
    if (event.code === 'Escape') {
      onClose();
    }
  };
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal">
        <img src={src} alt={alt} />
      </div>
    </div>
  );
};