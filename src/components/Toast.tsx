import React, { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 200);
    }, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-5 py-2 rounded-full text-sm z-50 transition-opacity duration-200 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      {message}
    </div>
  );
};