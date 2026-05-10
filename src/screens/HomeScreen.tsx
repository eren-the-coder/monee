import React, { useState, useMemo } from 'react';
import { useApp } from '../contexts/AppContext';
import { SavingsCard } from '../components/SavingsCard';
import { ObjectCard } from '../components/ObjectCard';
import { AddObjectModal } from '../components/modals/AddObjectModal';
import { EditObjectModal } from '../components/modals/EditObjectModal';
import { MoneyModal } from '../components/modals/MoneyModal';
import { Toast } from '../components/Toast';
import { WishObject } from '../types';
import { Coins, Package, CheckCircle } from 'lucide-react';

type FilterType = 'all' | 'affordable';

interface HomeScreenProps {
  onAddObject: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onAddObject }) => {
  const { savings, objects, addMoney, withdrawMoney, addObject, updateObject, deleteObject } = useApp();

  const [filter, setFilter] = useState<FilterType>('all');
  const [showMoneyModal, setShowMoneyModal] = useState(false);
  const [editingObject, setEditingObject] = useState<WishObject | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const filteredObjects = useMemo(() => {
    if (filter === 'affordable') {
      return objects.filter(obj => savings >= obj.price);
    }
    return objects;
  }, [objects, filter, savings]);

  const handleDelete = (id: string) => {
    const obj = objects.find(o => o.id === id);
    deleteObject(id);
    setToast(`${obj?.name} supprimé`);
  };

  const handleEdit = (obj: WishObject) => {
    setEditingObject(obj);
  };

  const handleSaveEdit = (id: string, name: string, price: number, emoji: string) => {
    updateObject(id, name, price, emoji);
    setToast(`${name} modifié`);
  };

  const handleAddObject = (name: string, price: number, emoji: string) => {
    addObject(name, price, emoji);
    setToast(`${name} ajouté`);
  };

  const handleAddMoney = (amount: number) => {
    addMoney(amount);
    setToast(`+${amount.toLocaleString('fr-FR')} FCFA ajoutés`);
  };

  const handleWithdrawMoney = (amount: number) => {
    withdrawMoney(amount);
    setToast(`-${amount.toLocaleString('fr-FR')} FCFA retirés`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 pb-24 px-4 pt-5">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-300 flex items-center justify-center gap-2">
          Monee
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Gérez vos économies</p>
      </div>

      {/* Savings Card */}
      <SavingsCard savings={savings} />

      {/* Tabs */}
      <div className="bg-white dark:bg-slate-800 rounded-full p-1 shadow-sm mb-5">
        <div className="flex gap-1">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 px-4 py-2 rounded-full font-semibold text-sm transition-all flex items-center justify-center gap-2 ${filter === 'all'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-500 dark:text-slate-400'
              }`}
          >
            <Package className="w-4 h-4" />
            Tous
          </button>
          <button
            onClick={() => setFilter('affordable')}
            className={`flex-1 px-4 py-2 rounded-full font-semibold text-sm transition-all flex items-center justify-center gap-2 ${filter === 'affordable'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-500 dark:text-slate-400'
              }`}
          >
            <CheckCircle className="w-4 h-4" />
            Achetables
          </button>
        </div>
      </div>

      {/* Objects List */}
      <div>
        {filteredObjects.length === 0 ? (
          <div className="text-center py-10 bg-white dark:bg-slate-800 rounded-3xl">
            <Package className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <p className="text-slate-500 dark:text-slate-400">
              {filter === 'all' ? 'Aucun objet enregistré' : 'Aucun objet achetable'}
            </p>
          </div>
        ) : (
          filteredObjects.map((obj) => (
            <ObjectCard
              key={obj.id}
              object={obj}
              savings={savings}
              onDelete={() => handleDelete(obj.id)}
              onEdit={() => handleEdit(obj)}
            />
          ))
        )}
      </div>

      {/* FAB for Money */}
      <button
        onClick={() => setShowMoneyModal(true)}
        className="fixed bottom-20 right-5 w-14 h-14 bg-amber-500 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-amber-600 transition-all hover:scale-105"
      >
        <Coins className="w-6 h-6" />
      </button>

      {/* Modals */}
      <AddObjectModal
        isOpen={false}
        onClose={() => { }}
        onAdd={handleAddObject}
      />

      <EditObjectModal
        isOpen={!!editingObject}
        object={editingObject}
        onClose={() => setEditingObject(null)}
        onSave={handleSaveEdit}
      />

      <MoneyModal
        isOpen={showMoneyModal}
        onClose={() => setShowMoneyModal(false)}
        onAdd={handleAddMoney}
        onWithdraw={handleWithdrawMoney}
        currentSavings={savings}
      />

      {/* Toast */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};