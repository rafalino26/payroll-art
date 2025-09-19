// file: app/components/CreatePeriodForm.tsx

"use client";

import { createPayrollPeriod } from '../action';

// Terima props baru
type Props = {
  onFormSubmitSuccess?: () => void;
}

export default function CreatePeriodForm({ onFormSubmitSuccess }: Props) {
  // Bungkus action dalam fungsi async
  const handleFormAction = async (formData: FormData) => {
    // Panggil server action seperti biasa
    await createPayrollPeriod(formData);
    
    // Jika ada fungsi callback, panggil fungsi tersebut
    if (onFormSubmitSuccess) {
      onFormSubmitSuccess();
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-gray-900">
        Buat Periode Gaji Baru
      </h2>
      {/* Gunakan fungsi pembungkus di sini */}
      <form action={handleFormAction} className="space-y-6">
        {/* ... (semua input field tidak berubah) ... */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nama Periode</label>
          <input type="text" name="name" id="name" required placeholder="Contoh: Gaji Oktober 2025" className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e799ff] focus:border-transparent sm:text-sm"/>
        </div>
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Tanggal Mulai</label>
          <input type="date" name="startDate" id="startDate" required className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e799ff] focus:border-transparent sm:text-sm"/>
        </div>
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">Tanggal Selesai</label>
          <input type="date" name="endDate" id="endDate" required className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e799ff] focus:border-transparent sm:text-sm"/>
        </div>
        <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-[#e799ff] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e799ff] transition-opacity">Buat & Mulai</button>
      </form>
    </div>
  );
}