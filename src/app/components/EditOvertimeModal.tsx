// file: app/components/EditOvertimeModal.tsx
"use client";
import { useState } from 'react';
import { updateOvertimePay } from '../action';
import CurrencyInput from './CurrencyInput';
import { FiEdit, FiPlus, FiLoader } from 'react-icons/fi'; // <-- Tambahkan FiLoader
import ConfirmationModal from './ConfirmationModal';
import SubmitButton from './SubmitButton'; // <-- Import SubmitButton

type Props = { 
  periodId: string;
  currentOvertime: number;
};

export default function EditOvertimeModal({ periodId, currentOvertime }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); // <-- State loading untuk hapus

  const handleConfirmDelete = async () => {
    setIsDeleting(true); // Mulai loading hapus
    const formData = new FormData();
    formData.append('id', periodId);
    formData.append('overtimePay', '0');
    try {
      await updateOvertimePay(formData);
    } finally {
      setIsDeleting(false); // Selesai loading hapus
      setIsOpen(false); 
    }
  };
  
  const TriggerButton = currentOvertime > 0 
    ? <button onClick={() => setIsOpen(true)} className="text-gray-400 hover:text-blue-600"><FiEdit size={14} /></button>
    : <button onClick={() => setIsOpen(true)} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-md hover:bg-green-200">
        <FiPlus size={12}/>
      </button>;

  return (
    <>
      {TriggerButton}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center text-black p-4">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
          <div className="relative z-10 w-full max-w-xs p-6 bg-white rounded-2xl shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Uang Lembur</h3>
            <form action={async (formData) => { await updateOvertimePay(formData); setIsOpen(false); }} className="space-y-4">
              <input type="hidden" name="id" value={periodId} />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Uang Lembur</label>
                <CurrencyInput name="overtimePay" defaultValue={currentOvertime} className="w-full p-2 border rounded-md text-lg text-center" placeholder="0" />
              </div>
              <div className="flex gap-4 pt-2">
                <button type="button" onClick={() => setIsOpen(false)} className="w-full py-2 border rounded-lg text-sm">Batal</button>
                {currentOvertime > 0 && 
                  <button 
                    type="button"
                    onClick={() => setIsConfirmOpen(true)}
                    className="w-full py-2 bg-red-500 text-white rounded-lg text-sm font-semibold flex items-center justify-center"
                  >
                    {isDeleting ? <FiLoader className="animate-spin" /> : 'Hapus'}
                  </button>
                }
                <SubmitButton className="w-full py-2 bg-purple-500 text-white rounded-lg text-sm font-semibold">
                  Simpan
                </SubmitButton>
              </div>
            </form>
          </div>
        </div>
      )}
      <ConfirmationModal 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Hapus Uang Lembur"
        message="Anda yakin ingin menghapus (mengatur ke nol) semua uang lembur untuk periode ini?"
      />
    </>
  );
}