import React from 'react';
import { Combo } from '../types';
import { Package } from 'lucide-react';

interface ComboCardProps {
  combo: Combo;
  index: number;
}

export const ComboCard: React.FC<ComboCardProps> = ({ combo, index }) => {
  const gradients = [
    'from-emerald-500 to-teal-600',
    'from-blue-500 to-indigo-600',
    'from-purple-500 to-violet-600',
    'from-amber-500 to-orange-600',
    'from-rose-500 to-pink-600'
  ];

  const gradient = gradients[index % gradients.length];

  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-3xl p-5 shadow-lg mx-4 mb-4`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
            Combo {index + 1}
          </span>
          <span className="text-white/80 text-sm flex items-center gap-1">
            <Package className="w-4 h-4" />
            {combo.objects.length} objet{combo.objects.length > 1 ? 's' : ''}
          </span>
        </div>
        <div className="text-right">
          <p className="text-white font-bold text-lg">
            {combo.totalPrice.toLocaleString('fr-FR')} FCFA
          </p>
          <p className="text-white/70 text-xs">
            Reste: {combo.remaining.toLocaleString('fr-FR')} FCFA
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {combo.objects.map((obj) => (
          <div
            key={obj.id}
            className="bg-white/20 backdrop-blur-sm rounded-2xl px-3 py-2 flex items-center gap-2"
          >
            <span className="text-2xl">{obj.emoji}</span>
            <div>
              <p className="text-white font-medium text-sm">{obj.name}</p>
              <p className="text-white/70 text-xs">{obj.price.toLocaleString('fr-FR')} FCFA</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};