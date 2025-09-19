// file: app/components/DebtCard.tsx
"use client";

import { useRef, useState } from 'react';
import { addDebt, updateDebt, deleteDebt } from '../action';
import { formatCurrency } from '../lib/utils';
import CurrencyInput from './CurrencyInput';
import { FiEdit, FiTrash2, FiSave, FiXCircle } from 'react-icons/fi'; // Import ikon

// Tipe data tidak berubah
type Debt = { id: string; description: string; amount: number; };
type DebtCardProps = { debts: Debt[]; totalDebt: number; periodId: string; };

// --- Komponen Baris Utang yang Diperbarui ---
function DebtItem({ debt }: { debt: Debt }) {
  const [isEditing, setIsEditing] = useState(false);

  // Tampilan saat mode EDIT
  if (isEditing) {
    return (
      <form
        action={async (formData) => {
          await updateDebt(formData);
          setIsEditing(false);
        }}
        className="flex items-center gap-2 bg-purple-50 p-2 rounded-lg text-black"
      >
        <input type="hidden" name="id" value={debt.id} />
        <input
          type="text"
          name="description"
          defaultValue={debt.description}
          className="flex-1 p-2 border rounded-md text-sm"
          required
        />
        <CurrencyInput
          name="amount"
          defaultValue={debt.amount} // <-- Nilai awal untuk input jumlah
          className="w-28 p-2 border rounded-md text-sm"
          required
        />
        <div className="flex items-center gap-2">
          <button type="submit" className="text-green-600 hover:text-green-800"><FiSave size={20} /></button>
          <button type="button" onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-gray-700"><FiXCircle size={20} /></button>
        </div>
      </form>
    );
  }

  // Tampilan Normal
  return (
    <li className="flex justify-between items-center text-sm text-gray-700 p-2 rounded transition-colors hover:bg-gray-100">
      <span className="flex-1 truncate pr-4">{debt.description}</span>
      <div className="flex items-center gap-4">
        <span className="font-medium w-20 text-right">{formatCurrency(debt.amount)}</span>
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

// --- Komponen Utama DebtCard yang Diperbarui ---
export default function DebtCard({ debts, totalDebt, periodId }: DebtCardProps) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-black">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-bold text-lg">Rincian Utang</h2>
        <span className="font-bold text-lg text-red-600">{formatCurrency(totalDebt)}</span>
      </div>
      
      <ul className="space-y-1 mb-4">
        {debts.length > 0 ? (
          debts.map(debt => <DebtItem key={debt.id} debt={debt} />)
        ) : (
          <p className="text-sm text-center text-gray-400 py-4">Belum ada utang.</p>
        )}
      </ul>

      {/* Form Tambah Utang yang Responsif */}
      <form 
        ref={formRef} 
        action={async (formData) => { 
          await addDebt(formData); 
          formRef.current?.reset(); 
        }} 
        className="flex flex-wrap sm:flex-nowrap gap-2 items-center"
      >
        <input type="hidden" name="periodId" value={periodId} />
        <input 
          name="description" 
          type="text" 
          placeholder="Keterangan baru..." 
          className="w-full sm:flex-1 p-2 border rounded-md text-sm focus:ring-2 focus:ring-[#e799ff] focus:border-transparent" 
          required 
        />
        <div className="w-full sm:w-auto flex gap-2">
          <CurrencyInput
            name="amount"
            placeholder="Jumlah"
            className="flex-1 sm:w-28 p-2 border rounded-md text-sm focus:ring-2 focus:ring-[#e799ff] focus:border-transparent"
            required
          />
          <button 
            type="submit" 
            className="bg-[#e799ff] text-white px-4 rounded-md font-bold hover:opacity-80 transition-opacity"
          >
            +
          </button>
        </div>
      </form>
    </div>
  );
}