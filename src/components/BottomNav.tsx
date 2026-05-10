import React from 'react';
import { Home, Layers, Plus } from 'lucide-react';
import { Screen } from '../types';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  onAddObject: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate, onAddObject }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 z-40 shadow-lg">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
            currentScreen === 'home'
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-slate-400 dark:text-slate-500'
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1 font-medium">Accueil</span>
        </button>
        
        <button
          onClick={onAddObject}
          className="flex flex-col items-center justify-center w-14 h-14 -mt-4 bg-blue-600 rounded-full shadow-lg text-white hover:bg-blue-700 transition-all"
        >
          <Plus className="w-7 h-7" />
        </button>
        
        <button
          onClick={() => onNavigate('combos')}
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
            currentScreen === 'combos'
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-slate-400 dark:text-slate-500'
          }`}
        >
          <Layers className="w-6 h-6" />
          <span className="text-xs mt-1 font-medium">Combos</span>
        </button>
      </div>
    </nav>
  );
};