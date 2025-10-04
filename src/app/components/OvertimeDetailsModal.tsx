// file: app/components/OvertimeDetailsModal.tsx
"use client";

import { useState } from 'react';
import { FiInfo, FiTrash2 } from 'react-icons/fi';
import { formatCurrency } from '@/app/lib/utils';
import { deleteOvertime } from '@/app/action';
import ClientOnlyDate from './ClientOnlyDate';
import ConfirmationModal from './ConfirmationModal';


// --- UBAH TIPE DATA DI SINI ---
type Overtime = {
  id: string;
  date: Date;
  description: string;
  days: number;
  amount: number; // Ganti dari calculatedAmount
};

function OvertimeDetailItem({ overtime }: { overtime: Overtime }) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  return (
    <>
      <li className="flex justify-between items-center text-sm border-b py-2">
        <div>
          <p className="text-gray-700">{overtime.description}</p>
          <p className="text-xs text-gray-500">
            <ClientOnlyDate date={overtime.date} options={{ day: 'numeric', month: 'short' }} />
            {overtime.days > 0 ? ` • ${overtime.days} hari` : ''}
          </p>
        </div>
        <div className="flex items-center gap-3 ml-4">
          {/* --- UBAH VARIABEL DI SINI --- */}
          <span className="font-medium text-green-600 whitespace-nowrap">+{formatCurrency(overtime.amount)}</span>
          <button onClick={() => setIsConfirmOpen(true)} className="text-red-500 hover:text-red-700">
            <FiTrash2 size={16} />
          </button>
        </div>
      </li>
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => deleteOvertime(overtime.id)}
        title="Hapus Lembur"
        message={`Hapus lembur "${overtime.description}"?`}
      />
    </>
  );
}

export default function OvertimeDetailsModal({ overtimes }: { overtimes: Overtime[] }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)} className="text-gray-400 hover:text-blue-600" title="Lihat Detail Lembur">
        <FiInfo size={14} />
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
          <div className="relative z-10 w-full max-w-sm p-6 bg-white rounded-2xl shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Detail Lembur</h3>
            <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {overtimes.map((ot) => <OvertimeDetailItem key={ot.id} overtime={ot} />)}
            </ul>
            <button onClick={() => setIsOpen(false)} className="mt-6 w-full py-2 border rounded-lg text-sm">Tutup</button>
          </div>
        </div>
      )}
    </>
  );
}