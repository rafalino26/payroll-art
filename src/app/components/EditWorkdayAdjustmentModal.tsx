// file: app/components/EditWorkdayAdjustmentModal.tsx
"use client";
import { useState } from 'react';
import { updateWorkdayAdjustment } from '../action';
import { FiEdit } from 'react-icons/fi';

type Props = { 
  periodId: string; 
  totalWorkDays: number; // Hari kerja asli (misal: 29)
  currentAdjustment: number; // Penyesuaian saat ini (misal: 0)
  currentReason: string | null; 
};

export default function EditWorkdayAdjustmentModal({ periodId, totalWorkDays, currentAdjustment, currentReason }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  
  // State untuk menyimpan nilai input TOTAL hari kerja
  const [finalWorkDays, setFinalWorkDays] = useState(totalWorkDays + currentAdjustment);
  // State untuk alasan
  const [reason, setReason] = useState(currentReason ?? '');

  // Fungsi yang dijalankan saat form disubmit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 1. Hitung nilai penyesuaian yang baru
    const newAdjustment = finalWorkDays - totalWorkDays;

    // 2. Buat FormData secara manual untuk dikirim ke Server Action
    const formData = new FormData();
    formData.append('id', periodId);
    formData.append('adjustment', String(newAdjustment));
    formData.append('reason', reason);

    // 3. Panggil Server Action
    await updateWorkdayAdjustment(formData);

    // 4. Tutup modal
    setIsOpen(false);
  };
  
  return (
    <>
      <button onClick={() => setIsOpen(true)} className="text-gray-400 hover:text-blue-600"><FiEdit size={14} /></button>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center text-black p-4">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
          <div className="relative z-10 w-full max-w-sm p-6 bg-white rounded-2xl shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Edit Total Hari Kerja</h3>
            
            {/* Ganti 'action' dengan 'onSubmit' untuk penanganan di client */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Hari Kerja Final</label>
                <input 
                  type="number" 
                  name="final_days" // Nama diubah agar tidak bentrok
                  value={finalWorkDays}
                  onChange={(e) => setFinalWorkDays(Number(e.target.value))}
                  className="w-full p-2 border rounded-md text-sm" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alasan Penyesuaian (Opsional)</label>
                <input 
                  type="text" 
                  name="reason" 
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Contoh: Bonus Lebaran" 
                  className="w-full p-2 border rounded-md text-sm" 
                />
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