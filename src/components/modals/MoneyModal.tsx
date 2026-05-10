import React, { useState } from 'react';
import { X, Coins, PlusCircle, MinusCircle } from 'lucide-react';

interface MoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (amount: number) => void;
  onWithdraw: (amount: number) => void;
  currentSavings: number;
}

export const MoneyModal: React.FC<MoneyModalProps> = ({ isOpen, onClose, onAdd, onWithdraw, currentSavings }) => {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'add' | 'withdraw'>('add');

  if (!isOpen) return null;

  const handleConfirm = () => {
    const value = parseFloat(amount);
    if (value > 0) {
      if (type === 'add') {
        onAdd(value);
      } else if (value <= currentSavings) {
        onWithdraw(value);
      }
      setAmount('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-slate-800 w-full max-w-sm rounded-3xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Coins className="w-6 h-6 text-amber-500" />
            Gérer l'argent
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-700 rounded-full p-1 mb-4">
          <button
            onClick={() => setType('add')}
            className={`flex-1 py-2 rounded-full font-medium transition-all flex items-center justify-center gap-2 ${type === 'add' ? 'bg-emerald-500 text-white' : 'text-slate-600 dark:text-slate-300'
              }`}
          >
            <PlusCircle className="w-4 h-4" />
            Ajouter
          </button>
          <button
            onClick={() => setType('withdraw')}
            className={`flex-1 py-2 rounded-full font-medium transition-all flex items-center justify-center gap-2 ${type === 'withdraw' ? 'bg-red-500 text-white' : 'text-slate-600 dark:text-slate-300'
              }`}
          >
            <MinusCircle className="w-4 h-4" />
            Retirer
          </button>
        </div>

        <input
          type="number"
          value={amount}
          onChange={(e: any) => setAmount(e.target.value)}
          placeholder="Montant (FCFA)"
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
            onClick={handleConfirm}
            disabled={!amount || (type === 'withdraw' && parseFloat(amount) > currentSavings)}
            className={`flex-1 py-3 rounded-full font-semibold text-white disabled:opacity-50 ${type === 'add' ? 'bg-emerald-600' : 'bg-red-600'
              }`}
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
};