// file: app/components/DeletePeriodButton.tsx
"use client";

import { deletePeriod } from '../action';
import { FiTrash2 } from 'react-icons/fi';

type Props = {
  periodId: string;
  periodName: string;
};

export default function DeletePeriodButton({ periodId, periodName }: Props) {
  
  const handleDelete = () => {
    // 1. Tampilkan konfirmasi di sisi client (browser)
    const isConfirmed = confirm(`Yakin ingin menghapus periode "${periodName}"? Semua data utang dan absen di dalamnya juga akan terhapus.`);
    
    // 2. Jika pengguna menekan "OK", baru panggil Server Action
    if (isConfirmed) {
      deletePeriod(periodId);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-gray-500 hover:text-red-600 transition-colors"
    >
      <FiTrash2 size={16} />
    </button>
  );
}