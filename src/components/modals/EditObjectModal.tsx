import React, { useState, useEffect } from 'react';
import { X, Edit } from 'lucide-react';
import { WishObject } from '../../types';

interface EditObjectModalProps {
  isOpen: boolean;
  object: WishObject | null;
  onClose: () => void;
  onSave: (id: string, name: string, price: number, emoji: string) => void;
}

export const EditObjectModal: React.FC<EditObjectModalProps> = ({ isOpen, object, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [emoji, setEmoji] = useState('📦');

  useEffect(() => {
    if (object) {
      setName(object.name);
      setPrice(object.price.toString());
      setEmoji(object.emoji || '📦');
    }
  }, [object]);

  if (!isOpen || !object) return null;

  const handleSave = () => {
    if (name.trim() && parseFloat(price) > 0) {
      onSave(object.id, name.trim(), parseFloat(price), emoji || '📦');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-slate-800 w-full max-w-sm rounded-3xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Edit className="w-6 h-6 text-amber-500" />
            Modifier l'objet
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>


        <input
          type="text"
          value={emoji}
          onChange={(e: any) => setEmoji(e.target.value.slice(0, 2))}
          placeholder="Emoji"
          className="w-full px-4 py-3 rounded-full border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          value={name}
          onChange={(e: any) => setName(e.target.value)}
          placeholder="Nom de l'objet"
          className="w-full px-4 py-3 rounded-full border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          value={price}
          onChange={(e: any) => setPrice(e.target.value)}
          placeholder="Prix (FCFA)"
          className="w-full px-4 py-3 rounded-full border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3 rounded-full bg-emerald-600 text-white font-semibold"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};