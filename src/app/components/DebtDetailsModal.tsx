// file: app/components/DebtDetailsModal.tsx
"use client";

import { useState } from 'react';
import { FiInfo, FiEdit, FiTrash2, FiSave, FiXCircle } from 'react-icons/fi';
import { formatCurrency } from '../lib/utils';
import { updateDebt, deleteDebt } from '../action';
import CurrencyInput from './CurrencyInput';

type Debt = {
  id: string;
  description: string;
  amount: number;
};

// --- Komponen untuk Setiap Baris Utang di Modal ---
function DebtDetailItem({ debt }: { debt: Debt }) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    // Tampilan mode EDIT (tidak ada perubahan)
    return (
      <li className="border-b pb-2">
        <form
          action={async (formData) => {
            await updateDebt(formData);
            setIsEditing(false);
          }}
          className="flex flex-col gap-2 bg-purple-50 p-2 rounded-lg text-black"
        >
          <input type="hidden" name="id" value={debt.id} />
          <input
            type="text"
            name="description"
            defaultValue={debt.description}
            className="w-full p-2 border rounded-md text-sm"
            required
          />
          <div className="flex items-center gap-2">
            <CurrencyInput
              name="amount"
              defaultValue={debt.amount}
              className="flex-1 w-full p-2 border rounded-md text-sm"
              required
            />
            <button type="submit" className="text-green-600 hover:text-green-800"><FiSave size={20} /></button>
            <button type="button" onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-gray-700"><FiXCircle size={20} /></button>
          </div>
        </form>
      </li>
    );
  }

  // --- PERUBAHAN DI SINI ---
  // Tampilan Normal (Tombol selalu terlihat)
  return (
    <li className="flex justify-between items-center text-sm border-b py-2">
      <div className="flex-1">
        <span className="text-gray-700">{debt.description}</span>
      </div>
      <div className="flex items-center gap-4 ml-4">
        <span className="font-medium text-red-600 whitespace-nowrap">{formatCurrency(debt.amount)}</span>
        {/* Kelas opacity dan group-hover dihilangkan agar tombol selalu muncul */}
        <div className="flex items-center gap-3">
          <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:text-blue-700"><FiEdit size={16} /></button>
          <button
            onClick={() => {
              if (confirm('Yakin ingin menghapus utang ini?')) {
                deleteDebt(debt.id);
              }
            }}
            className="text-red-500 hover:text-red-700"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>
    </li>
  );
}


// --- Komponen Utama Modal (tidak ada perubahan) ---
export default function DebtDetailsModal({ debts }: { debts: Debt[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        className="ml-2 text-blue-500 hover:text-blue-700 transition-colors"
        title="Lihat Detail Utang"
      >
        <FiInfo size={16} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
          <div className="relative z-10 w-full max-w-sm p-6 bg-white rounded-2xl shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Detail Rincian Utang</h3>
            <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {debts.map((debt) => (
                <DebtDetailItem key={debt.id} debt={debt} />
              ))}
            </ul>
            <button 
              onClick={() => setIsOpen(false)}
              className="mt-6 w-full py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
}