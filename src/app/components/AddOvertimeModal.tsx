// file: app/components/AddOvertimeModal.tsx
"use client";

import { useState, useRef } from 'react';
import { FiPlus } from 'react-icons/fi';
import { addOvertime } from '@/app/action';
import SubmitButton from './SubmitButton';
import CurrencyInput from './CurrencyInput';

export default function AddOvertimeModal({ periodId }: { periodId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formKey, setFormKey] = useState(Date.now()); 

  const handleAction = async (formData: FormData) => {
    await addOvertime(formData);
    setFormKey(Date.now()); // Reset form
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-[#e799ff] text-white font-semibold text-xs px-3 py-2 rounded-lg shadow-sm hover:bg-purple-600 transition-colors"
      >
        <FiPlus size={14} /> Lembur
      </button>

     {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
          <div className="relative z-10 w-full max-w-sm p-6 bg-white rounded-2xl shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Tambah Lembur</h3>
            <form key={formKey} action={handleAction} className="space-y-4 text-black">
              <input type="hidden" name="id" value={periodId} />
              <div>
                <label htmlFor="overtime_date" className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lembur</label>
                <input name="date" id="overtime_date" type="date" className="w-full p-2 border rounded-md text-sm" required />
              </div>
              <div>
                <label htmlFor="overtime_desc" className="block text-sm font-medium text-gray-700 mb-1">Keterangan</label>
                <input name="description" id="overtime_desc" type="text" className="w-full p-2 border rounded-md text-sm" required placeholder="Contoh: Bantu acara" />
              </div>
              
              {/* --- INPUT DIUBAH DI SINI --- */}
              <div>
                <label htmlFor="overtime_amount" className="block text-sm font-medium text-gray-700 mb-1">Jumlah Uang Lembur</label>
                <CurrencyInput name="amount" id="overtime_amount" className="w-full p-2 border rounded-md text-sm" required />
              </div>
              <div>
                <label htmlFor="overtime_days" className="block text-sm font-medium text-gray-700 mb-1">Jumlah Hari (Opsional)</label>
                <input name="days" id="overtime_days" type="number" step="0.5" placeholder="Contoh: 1 atau 0.5" className="w-full p-2 border rounded-md text-sm" />
              </div>

              <div className="flex gap-4 pt-2">
                <button type="button" onClick={() => setIsOpen(false)} className="w-full py-2 border rounded-lg text-sm">Batal</button>
                <SubmitButton className="w-full py-2 bg-purple-500 text-white rounded-lg text-sm font-semibold">Simpan</SubmitButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}