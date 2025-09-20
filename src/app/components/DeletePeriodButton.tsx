// file: app/components/DeletePeriodButton.tsx
"use client";

import { useState } from 'react'; 
import { deletePeriod } from '../action';
import { FiTrash2 } from 'react-icons/fi';
import ConfirmationModal from './ConfirmationModal';

type Props = {
  periodId: string;
  periodName: string;
};

export default function DeletePeriodButton({ periodId, periodName }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleConfirmDelete = () => {
    // Panggil server action untuk menghapus
    deletePeriod(periodId);
  };

  return (
    <>
      {/* Tombol ini sekarang hanya membuka modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-gray-500 hover:text-red-600 transition-colors"
      >
        <FiTrash2 size={16} />
      </button>

      {/* Komponen Modal Konfirmasi */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Hapus Periode"
        message={`Anda yakin ingin menghapus periode "${periodName}"? Semua data utang dan absen di dalamnya akan ikut terhapus secara permanen.`}
      />
    </>
  );
}