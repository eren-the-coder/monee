import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WishObject, Screen } from '../types';
import { loadObjects, loadSavings, saveObjects, saveSavings, generateId } from '../utils/storage';

interface AppContextType {
  savings: number;
  objects: WishObject[];
  screen: Screen;
  setScreen: (screen: Screen) => void;
  addMoney: (amount: number) => void;
  withdrawMoney: (amount: number) => void;
  addObject: (name: string, price: number, emoji: string) => void;
  updateObject: (id: string, name: string, price: number, emoji: string) => void;
  deleteObject: (id: string) => void;
  reorderObjects: (startIndex: number, endIndex: number) => void;
}

const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savings, setSavings] = useState<number>(0);
  const [objects, setObjects] = useState<WishObject[]>([]);
  const [screen, setScreen] = useState<Screen>('home');

  useEffect(() => {
    setSavings(loadSavings());
    setObjects(loadObjects());
  }, []);

  useEffect(() => {
    saveSavings(savings);
  }, [savings]);

  useEffect(() => {
    saveObjects(objects);
  }, [objects]);

  const addMoney = (amount: number) => setSavings(prev => prev + amount);
  const withdrawMoney = (amount: number) => setSavings(prev => Math.max(0, prev - amount));

  const addObject = (name: string, price: number, emoji: string) => {
    setObjects(prev => [...prev, { id: generateId(), name, price, emoji: emoji || '📦' }]);
  };

  const updateObject = (id: string, name: string, price: number, emoji: string) => {
    setObjects(prev => prev.map(obj =>
      obj.id === id ? { ...obj, name, price, emoji: emoji || '📦' } : obj
    ));
  };

  const deleteObject = (id: string) => {
    setObjects(prev => prev.filter(obj => obj.id !== id));
  };

  const reorderObjects = (startIndex: number, endIndex: number) => {
    setObjects(prev => {
      const newObjects = [...prev];
      const [removed] = newObjects.splice(startIndex, 1);
      newObjects.splice(endIndex, 0, removed);
      return newObjects;
    });
  };

  return (
    <AppContext.Provider value={{
      savings, objects, screen, setScreen,
      addMoney, withdrawMoney, addObject, updateObject, deleteObject, reorderObjects
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext) as AppContextType;
  return context;
};