// file: app/components/BonusDetailsModal.tsx
"use client";

import { useState } from 'react';
import { FiInfo, FiTrash2 } from 'react-icons/fi';
import { formatCurrency } from '@/app/lib/utils';
import { deleteBonus } from '@/app/action';
import ClientOnlyDate from './ClientOnlyDate';
import ConfirmationModal from './ConfirmationModal';

type Bonus = {
  id: string;
  date: Date;
  description: string;
  amount: number;
};

function BonusDetailItem({ bonus }: { bonus: Bonus }) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  return (
    <>
      <li className="flex justify-between items-center text-sm border-b py-2">
        <div>
          <p className="text-gray-700">{bonus.description}</p>
          <p className="text-xs text-gray-500">
            <ClientOnlyDate date={bonus.date} options={{ day: 'numeric', month: 'short' }} />
          </p>
        </div>
        <div className="flex items-center gap-3 ml-4">
          <span className="font-medium text-green-600 whitespace-nowrap">+{formatCurrency(bonus.amount)}</span>
          <button onClick={() => setIsConfirmOpen(true)} className="text-red-500 hover:text-red-700">
            <FiTrash2 size={16} />
          </button>
        </div>
      </li>
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => deleteBonus(bonus.id)}
        title="Hapus Bonus"
        message={`Hapus bonus "${bonus.description}"?`}
      />
    </>
  );
}

export default function BonusDetailsModal({ bonuses }: { bonuses: Bonus[] }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)} className="text-gray-400 hover:text-blue-600" title="Lihat Detail Bonus">
        <FiInfo size={14} />
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
          <div className="relative z-10 w-full max-w-sm p-6 bg-white rounded-2xl shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Detail Bonus</h3>
            <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {bonuses.map((b) => <BonusDetailItem key={b.id} bonus={b} />)}
            </ul>
            <button onClick={() => setIsOpen(false)} className="mt-6 w-full py-2 border rounded-lg text-sm">Tutup</button>
          </div>
        </div>
      )}
    </>
  );
}