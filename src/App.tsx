import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { AppProvider, useApp } from './contexts/AppContext';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './screens/HomeScreen';
import { CombosScreen } from './screens/CombosScreen';
import { AddObjectModal } from './components/modals/AddObjectModal';
import { Sun, Moon } from 'lucide-react';

const AppContent: React.FC = () => {
  const { screen, setScreen, addObject } = useApp();
  const { isDark, toggleTheme } = useTheme();
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddObject = (name: string, price: number, emoji: string) => {
    addObject(name, price, emoji);
    setShowAddModal(false);
  };

  return (
    <div className="relative min-h-screen">
      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 bg-white dark:bg-slate-800 p-2 rounded-full shadow-lg transition-colors border border-slate-200 dark:border-slate-700"
        aria-label="Toggle theme"
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-amber-500" />
        ) : (
          <Moon className="w-5 h-5 text-slate-600" />
        )}
      </button>

      {/* Main content */}
      {screen === 'home' ? <HomeScreen onAddObject={() => setShowAddModal(true)} /> : <CombosScreen />}

      {/* Bottom navigation */}
      <BottomNav 
        currentScreen={screen} 
        onNavigate={setScreen}
        onAddObject={() => setShowAddModal(true)}
      />

      {/* Add Object Modal */}
      <AddObjectModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddObject}
      />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;