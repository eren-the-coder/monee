import React, { useMemo } from 'react';
import { useApp } from '../contexts/AppContext';
import { ComboCard } from '../components/ComboCard';
import { generateCombos } from '../utils/comboGenerator';
import { Target, Package, Search } from 'lucide-react';

export const CombosScreen: React.FC = () => {
  const { savings, objects } = useApp();

  const combos = useMemo(() => generateCombos(objects, savings), [objects, savings]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 pb-24 px-4 pt-5">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-indigo-300 flex items-center justify-center gap-2">
          Combos
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Combinaisons d'achats possibles
        </p>
      </div>

      {/* Budget Card */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-5 shadow-xl mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-indigo-100 text-sm">Budget disponible</p>
            <p className="text-white text-2xl font-bold">
              {savings.toLocaleString('fr-FR')} FCFA
            </p>
          </div>
        </div>
        <div className="mt-3 bg-white/10 rounded-xl p-3">
          <p className="text-white/80 text-sm flex items-center gap-2">
            <Package className="w-4 h-4" />
            {combos.length} combinaison{combos.length > 1 ? 's' : ''} trouvée{combos.length > 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Combos List */}
      <div className="px-0">
        {combos.length === 0 ? (
          <div className="text-center py-10 bg-white dark:bg-slate-800 rounded-3xl">
            <Search className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              Aucune combinaison possible
            </p>
            <p className="text-slate-400 dark:text-slate-500 text-sm mt-2">
              {objects.length === 0
                ? 'Ajoutez des objets pour voir les combos'
                : 'Augmentez vos économies'}
            </p>
          </div>
        ) : (
          combos.map((combo, index) => (
            <ComboCard key={index} combo={combo} index={index} />
          ))
        )}
      </div>
    </div>
  );
};