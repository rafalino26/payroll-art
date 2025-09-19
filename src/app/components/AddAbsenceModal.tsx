// file: app/components/AddAbsenceModal.tsx
"use client";

import { useState, useRef } from 'react';
import { FiPlus } from 'react-icons/fi';
import { addAbsence } from '../action';

export default function AddAbsenceModal({ periodId }: { periodId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleAction = async (formData: FormData) => {
    await addAbsence(formData);
    formRef.current?.reset();
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-[#e799ff] text-white font-semibold text-xs px-3 py-2 rounded-lg shadow-sm hover:bg-purple-600 transition-colors"
      >
        <FiPlus size={14} /> Absen
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
          <div className="relative z-10 w-full max-w-sm p-6 bg-white rounded-2xl shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Tambah Tanggal Absen</h3>
            <form ref={formRef} action={handleAction} className="space-y-4 text-black">
              <input type="hidden" name="periodId" value={periodId} />
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
                <input name="date" id="date" type="date" className="w-full p-2 border rounded-md text-sm" required />
              </div>
              <div className="flex gap-4 pt-2">
                <button type="button" onClick={() => setIsOpen(false)} className="w-full py-2 border rounded-lg text-sm">Batal</button>
                <button type="submit" className="w-full py-2 bg-purple-500 text-white rounded-lg text-sm font-semibold">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}