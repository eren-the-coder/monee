import React from 'react';
import { Wallet } from 'lucide-react';

interface SavingsCardProps {
  savings: number;
}

export const SavingsCard: React.FC<SavingsCardProps> = ({ savings }) => {
  return (
    <div className="bg-white rounded-3xl py-6 px-5 shadow-lg mb-7 text-center border border-blue-100 dark:bg-slate-800 dark:border-slate-700">
      <div className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center justify-center gap-2">
        <Wallet className="w-4 h-4" />
        <span>Économies totales</span>
      </div>
      <div className="text-4xl font-extrabold bg-gradient-to-r from-slate-800 to-blue-900 bg-clip-text text-transparent dark:from-white dark:to-blue-300">
        {Math.floor(savings).toLocaleString('fr-FR')} <span className="text-lg font-medium text-slate-500 dark:text-slate-400">FCFA</span>
      </div>
    </div>
  );
};