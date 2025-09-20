// file: app/components/EditCashAdvanceModal.tsx
"use client";
import { useState } from 'react';
import { updateCashAdvance } from '../action';
import CurrencyInput from './CurrencyInput';
import { FiEdit, FiPlus } from 'react-icons/fi';
import ConfirmationModal from './ConfirmationModal';

type Props = { 
  periodId: string;
  currentCashAdvance: number;
};

export default function EditCashAdvanceModal({ periodId, currentCashAdvance }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleConfirmDelete = async () => {
    const formData = new FormData();
    formData.append('id', periodId);
    formData.append('cashAdvance', '0');
    await updateCashAdvance(formData);
    setIsOpen(false);
  };
  
  const TriggerButton = currentCashAdvance > 0 
    ? <button onClick={() => setIsOpen(true)} className="text-gray-400 hover:text-blue-600"><FiEdit size={14} /></button>
    : <button onClick={() => setIsOpen(true)} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-md hover:bg-orange-200">
        <FiPlus size={12}/>
      </button>;

  return (
    <>
      {TriggerButton}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
          <div className="relative z-10 w-full max-w-xs p-6 bg-white rounded-2xl shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Uang Diambil</h3>
            <form action={async (formData) => { await updateCashAdvance(formData); setIsOpen(false); }} className="space-y-4">
              <input type="hidden" name="id" value={periodId} />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Uang Diambil</label>
                <CurrencyInput name="cashAdvance" defaultValue={currentCashAdvance} className="w-full p-2 border rounded-md text-lg text-center" placeholder="0" />
              </div>
              <div className="flex gap-4 pt-2">
                <button type="button" onClick={() => setIsOpen(false)} className="w-full py-2 border rounded-lg text-sm">Batal</button>
                {currentCashAdvance > 0 && 
                  <button type="button" onClick={() => setIsConfirmOpen(true)} className="w-full py-2 bg-red-500 text-white rounded-lg text-sm font-semibold">Hapus</button>
                }
                <button type="submit" className="w-full py-2 bg-purple-500 text-white rounded-lg text-sm font-semibold">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ConfirmationModal 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Hapus Uang Diambil"
        message="Anda yakin ingin menghapus (mengatur ke nol) semua uang yang diambil untuk periode ini?"
      />
    </>
  );
}