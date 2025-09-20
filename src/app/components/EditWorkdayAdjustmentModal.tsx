// file: app/components/EditWorkdayAdjustmentModal.tsx
"use client";
import { useState } from 'react';
import { updateWorkdayAdjustment } from '../action';
import { FiEdit, FiLoader } from 'react-icons/fi'; // <-- 1. Import FiLoader

type Props = { 
  periodId: string; 
  totalWorkDays: number;
  currentAdjustment: number; 
  currentReason: string | null; 
};

export default function EditWorkdayAdjustmentModal({ periodId, totalWorkDays, currentAdjustment, currentReason }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false); // <-- 2. State untuk loading

  const [finalWorkDays, setFinalWorkDays] = useState(totalWorkDays + currentAdjustment);
  const [reason, setReason] = useState(currentReason ?? '');

  // 3. Update fungsi handleSubmit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true); // Mulai loading

    try {
      const newAdjustment = finalWorkDays - totalWorkDays;
      const formData = new FormData();
      formData.append('id', periodId);
      formData.append('adjustment', String(newAdjustment));
      formData.append('reason', reason);
      
      await updateWorkdayAdjustment(formData);
      
      setIsOpen(false); // Tutup modal setelah berhasil
    } finally {
      setIsPending(false); // Selesai loading
    }
  };
  
  return (
    <>
      <button onClick={() => setIsOpen(true)} className="text-gray-400 hover:text-blue-600"><FiEdit size={14} /></button>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center text-black p-4">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={() => !isPending && setIsOpen(false)}></div>
          <div className="relative z-10 w-full max-w-sm p-6 bg-white rounded-2xl shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Edit Total Hari Kerja</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Hari Kerja Final</label>
                <input 
                  type="number" 
                  name="final_days"
                  value={finalWorkDays}
                  onChange={(e) => setFinalWorkDays(Number(e.target.value))}
                  className="w-full p-2 border rounded-md text-sm" 
                  disabled={isPending}
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
                  disabled={isPending}
                />
              </div>
              <div className="flex gap-4 pt-2">
                <button type="button" onClick={() => setIsOpen(false)} className="w-full py-2 border rounded-lg text-sm disabled:opacity-50" disabled={isPending}>Batal</button>
                
                {/* --- 4. Ganti tombol Simpan --- */}
                <button type="submit" className="w-full py-2 bg-purple-500 text-white rounded-lg text-sm font-semibold flex items-center justify-center disabled:opacity-75" disabled={isPending}>
                  {isPending ? <FiLoader className="animate-spin"/> : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}