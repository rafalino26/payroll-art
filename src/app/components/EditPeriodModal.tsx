// file: app/components/EditPeriodModal.tsx
"use client";

import { useState } from 'react';
import { updatePeriod } from '../action';
import { FiEdit } from 'react-icons/fi';
import SubmitButton from './SubmitButton'; // <-- 1. Import SubmitButton

// Tipe data untuk periode yang akan di-edit
type PeriodData = {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
};

export default function EditPeriodModal({ period }: { period: PeriodData }) {
  const [isOpen, setIsOpen] = useState(false);

  // Fungsi untuk format tanggal YYYY-MM-DD untuk input
  const formatDateForInput = (date: Date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      {/* Tombol Ikon Pemicu Modal */}
      <button onClick={() => setIsOpen(true)} className="text-gray-500 hover:text-blue-600 transition-colors">
        <FiEdit size={16} />
      </button>

      {/* Tampilan Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex text-black items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
          <div className="relative z-10 w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-center text-gray-900">Edit Periode</h2>
            <form
              action={async (formData) => {
                await updatePeriod(formData);
                setIsOpen(false);
              }}
              className="space-y-6"
            >
              <input type="hidden" name="id" value={period.id} />
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nama Periode</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  defaultValue={period.name}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
                />
              </div>
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Tanggal Mulai</label>
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  required
                  defaultValue={formatDateForInput(period.startDate)}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
                />
              </div>
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">Tanggal Selesai</label>
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  required
                  defaultValue={formatDateForInput(period.endDate)}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Batal
                </button>
                
                {/* --- 2. Ganti <button> dengan <SubmitButton> --- */}
                <SubmitButton
                  className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-[#e799ff]"
                >
                  Simpan Perubahan
                </SubmitButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}