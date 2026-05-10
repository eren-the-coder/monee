import React, { useState, useRef } from 'react';
import { WishObject } from '../types';
import { Clock, CheckCircle } from 'lucide-react';

interface ObjectCardProps {
  object: WishObject;
  savings: number;
  onDelete: () => void;
  onEdit: () => void;
}

export const ObjectCard: React.FC<ObjectCardProps> = ({ object, savings, onDelete, onEdit }) => {
  const progress = object.price > 0 ? Math.min(100, Math.max(0, (savings / object.price) * 100)) : 0;
  const canBuy = savings >= object.price;
  const missing = object.price - savings;

  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const isHorizontal = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    setIsDragging(true);
    isHorizontal.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - startX.current;
    
    if (Math.abs(deltaX) > 10 && Math.abs(deltaX) > Math.abs(e.touches[0].clientY - startX.current)) {
      isHorizontal.current = true;
      e.preventDefault();
      const limited = Math.max(-120, Math.min(120, deltaX));
      setTranslateX(limited);
    }
  };

  const handleTouchEnd = () => {
    if (isHorizontal.current) {
      if (translateX < -80) {
        onDelete();
      } else if (translateX > 80) {
        onEdit();
      }
    }
    setTranslateX(0);
    setIsDragging(false);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl mb-4">
      {/* Background actions */}
      <div className="absolute inset-0 flex">
        <div className="flex-1 bg-red-500 flex items-center pl-4">
          <span className="text-white font-medium">Supprimer</span>
        </div>
        <div className="flex-1 bg-amber-500 flex items-center justify-end pr-4">
          <span className="text-white font-medium">Modifier</span>
        </div>
      </div>

      {/* Card */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ transform: `translateX(${translateX}px)` }}
        className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-md border border-slate-100 dark:border-slate-700 transition-transform"
      >
        {/* Progress bar */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 opacity-20 rounded-3xl transition-all duration-300"
          style={{ width: `${progress}%` }}
        />

        <div className="relative flex items-center p-4 gap-4">
          <div className="w-14 h-14 bg-blue-50 dark:bg-slate-700 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
            {object.emoji || '📦'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-slate-800 dark:text-white text-lg truncate">{object.name}</div>
            <div className="inline-block bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-semibold mt-1">
              {object.price.toLocaleString('fr-FR')} FCFA
            </div>
            {!canBuy ? (
              <div className="text-xs text-orange-500 mt-1 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Manque {missing.toLocaleString('fr-FR')} FCFA</span>
              </div>
            ) : (
              <div className="text-xs text-emerald-500 mt-1 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                <span>Achetable !</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};