// file: app/components/EditDailyRateModal.tsx
"use client";
import { useState } from 'react';
import { updateDailyRate } from '../action';
import CurrencyInput from './CurrencyInput';
import { FiEdit } from 'react-icons/fi';
import SubmitButton from './SubmitButton'; // <-- 1. Import SubmitButton

export default function EditDailyRateModal({ periodId, currentRate }: { periodId: string, currentRate: number }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setIsOpen(true)} className="text-gray-400 hover:text-blue-600"><FiEdit size={14} /></button>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
          <div className="relative z-10 w-full max-w-xs p-6 bg-white rounded-2xl shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Edit Gaji per Hari</h3>
            <form action={async (formData) => { await updateDailyRate(formData); setIsOpen(false); }} className="space-y-4">
              <input type="hidden" name="id" value={periodId} />
              <div>
                <CurrencyInput name="dailyRate" defaultValue={currentRate} className="w-full p-2 border rounded-md text-lg text-center" required />
              </div>
              <div className="flex gap-4 pt-2">
                <button type="button" onClick={() => setIsOpen(false)} className="w-full py-2 border rounded-lg text-sm">Batal</button>
                
                {/* --- 2. Ganti <button> dengan <SubmitButton> --- */}
                <SubmitButton className="w-full py-2 bg-purple-500 text-white rounded-lg text-sm font-semibold">
                  Simpan
                </SubmitButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}