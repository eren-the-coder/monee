import { WishObject } from '../types';

const STORAGE_KEY = 'monee_objects';
const SAVINGS_KEY = 'monee_savings';
const THEME_KEY = 'monee_theme';

export const loadObjects = (): WishObject[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [
      { id: '1', name: 'Casque Audio', price: 25000, emoji: '🎧' },
      { id: '2', name: 'Smartphone', price: 120000, emoji: '📱' },
      { id: '3', name: 'Basket', price: 35000, emoji: '👟' },
      { id: '4', name: 'Montre connectée', price: 45000, emoji: '⌚' }
    ];
  } catch {
    return [];
  }
};

export const saveObjects = (objects: WishObject[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(objects));
};

export const loadSavings = (): number => {
  try {
    const data = localStorage.getItem(SAVINGS_KEY);
    return data ? parseFloat(data) : 12500;
  } catch {
    return 0;
  }
};

export const saveSavings = (savings: number): void => {
  localStorage.setItem(SAVINGS_KEY, savings.toString());
};

export const loadTheme = (): boolean => {
  try {
    const data = localStorage.getItem(THEME_KEY);
    if (data !== null) return JSON.parse(data);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch {
    return false;
  }
};

export const saveTheme = (isDark: boolean): void => {
  localStorage.setItem(THEME_KEY, JSON.stringify(isDark));
};

export const generateId = (): string => {
  return Date.now().toString();
};