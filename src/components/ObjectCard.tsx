import React, { useState } from 'react';
import { WishObject } from '../types';
import { Clock, CheckCircle, Edit, Trash2, MoreVertical } from 'lucide-react';

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
  const [showMenu, setShowMenu] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleCardClick = () => {
    setShowMenu(true);
  };

  const handleEdit = () => {
    setShowMenu(false);
    onEdit();
  };

  const handleDeleteClick = () => {
    setShowMenu(false);
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setShowConfirmDelete(false);
  };

  return (
    <>
      <div className="relative overflow-hidden rounded-3xl mb-4">
        {/* Progress bar background */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 opacity-20 rounded-3xl transition-all duration-300"
          style={{ width: `${progress}%` }}
        />

        {/* Card */}
        <div
          onClick={handleCardClick}
          className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-md border border-slate-100 dark:border-slate-700 cursor-pointer active:scale-[0.98] transition-transform duration-150"
        >
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
            <div className="flex-shrink-0">
              <MoreVertical className="w-5 h-5 text-slate-400 dark:text-slate-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Menu Contextuel */}
      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => setShowMenu(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-800 rounded-t-3xl shadow-2xl animate-slide-up">
            <div className="p-6">
              <div className="text-center mb-4">
                <div className="w-12 h-1 bg-slate-200 dark:bg-slate-600 rounded-full mx-auto mb-6" />
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">
                  {object.name}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  {object.price.toLocaleString('fr-FR')} FCFA
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleEdit}
                  className="w-full flex items-center justify-between p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                >
                  <span>Modifier</span>
                  <Edit className="w-5 h-5" />
                </button>

                <button
                  onClick={handleDeleteClick}
                  className="w-full flex items-center justify-between p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-semibold hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                >
                  <span>Supprimer</span>
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={() => setShowMenu(false)}
                className="w-full mt-6 py-3 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold"
              >
                Annuler
              </button>
            </div>
          </div>
        </>
      )}

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
                onClick={handleConfirmDelete}
                className="flex-1 py-3 rounded-full bg-red-600 text-white font-semibold"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
};