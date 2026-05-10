import React, { useState, useRef } from 'react';
import { WishObject } from '../types';
import { Clock, CheckCircle, X, Edit, Trash2 } from 'lucide-react';

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
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
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
        // Swipe gauche = supprimer (avec confirmation)
        setShowConfirmDelete(true);
      } else if (translateX > 80) {
        // Swipe droite = modifier
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
        className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-md border border-slate-100 dark:border-slate-700 transition-transform duration-200 ease-out"
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

      {/* Confirmation Dialog */}
      {showConfirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 w-full max-w-sm rounded-3xl p-6 shadow-2xl">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Trash2 className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                Confirmer la suppression
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Êtes-vous sûr de vouloir supprimer "{object.name}" ?
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="flex-1 py-3 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  onDelete();
                  setShowConfirmDelete(false);
                }}
                className="flex-1 py-3 rounded-full bg-red-600 text-white font-semibold"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
