"use client";

import { useState } from "react";
import { addDebt, updateDebt, deleteDebt } from "../action"; // ganti ke "../actions" kalau file-mu plural
import { formatCurrency } from "@/app/lib/utils";
import { formatDateDMY2 } from "@/app/lib/utils";
import CurrencyInput from "./CurrencyInput";
import { FiEdit, FiTrash2, FiSave, FiXCircle, FiInfo } from "react-icons/fi";
import ConfirmationModal from "./ConfirmationModal";
import SubmitButton from "./SubmitButton";

type Debt = {
  id: string;
  description: string;
  amount: number;
  date?: string | Date;
};

type DebtCardProps = {
  debts: Debt[];
  totalDebt: number;
  periodId: string;
};

function toDateInputValue(d: Date) {
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

/** Modal ringan untuk menampilkan rincian utang lengkap */
function DetailsModal({
  isOpen,
  onClose,
  debt,
}: {
  isOpen: boolean;
  onClose: () => void;
  debt: Debt;
}) {
  if (!isOpen) return null;
  const dt = debt.date ? new Date(debt.date) : new Date();
  const longDate = dt.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Rincian Utang</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Tutup"
          >
            <FiXCircle size={20} />
          </button>
        </div>

        <div className="space-y-3 text-sm text-gray-800">
          <div className="flex gap-2">
            <span className="w-28 text-gray-500">Tanggal</span>
            <span className="font-medium">
              {formatDateDMY2(dt)} <span className="text-gray-500">({longDate})</span>
            </span>
          </div>
          <div className="flex gap-2">
            <span className="w-28 text-gray-500">Keterangan</span>
            <span className="font-medium break-words">{debt.description}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-28 text-gray-500">Jumlah</span>
            <span className="font-semibold">{formatCurrency(debt.amount)}</span>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-sm hover:bg-gray-50"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

function DebtItem({ debt }: { debt: Debt }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  if (isEditing) {
    const currentDate = debt.date ? new Date(debt.date) : new Date();
    const defaultDateStr = toDateInputValue(currentDate);

    return (
      <form
        action={async (formData) => {
          await updateDebt(formData);
          setIsEditing(false);
        }}
        className="flex flex-wrap sm:flex-nowrap items-center gap-2 bg-purple-50 p-2 rounded-lg text-black"
      >
        <input type="hidden" name="id" value={debt.id} />

        <input
          type="text"
          name="description"
          defaultValue={debt.description}
          className="flex-1 min-w-[180px] p-2 border rounded-md text-sm"
          required
        />

        <input
          type="date"
          name="date"
          defaultValue={defaultDateStr}
          className="p-2 border rounded-md text-sm"
        />

        <CurrencyInput
          name="amount"
          defaultValue={debt.amount}
          className="w-28 p-2 border rounded-md text-sm"
          required
        />

        <div className="flex items-center gap-2">
          <SubmitButton className="text-green-600 hover:text-green-800">
            <FiSave size={20} />
          </SubmitButton>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Batal edit"
          >
            <FiXCircle size={20} />
          </button>
        </div>
      </form>
    );
  }

  return (
    <>
      <li className="flex justify-between items-center text-sm text-gray-700 p-2 rounded transition-colors hover:bg-gray-100">
        <div className="flex items-center gap-1 flex-1 min-w-0">
          {/* Tanggal pendek, rata kiri */}
      
          {/* Tombol info (ikon "i") untuk buka modal rincian */}
          <button
            type="button"
            onClick={() => setIsInfoOpen(true)}
            className="shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
            aria-label="Lihat rincian utang"
            title="Rincian"
          >
            <FiInfo size={12} />
          </button>

          {/* Deskripsi (truncate) */}
          <span className="truncate pr-4">{debt.description}</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="font-medium w-20 text-right">
            {formatCurrency(debt.amount)}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500 hover:text-blue-700"
              aria-label="Edit utang"
              title="Edit"
            >
              <FiEdit size={16} />
            </button>
            <button
              onClick={() => setIsConfirmOpen(true)}
              className="text-red-500 hover:text-red-700"
              aria-label="Hapus utang"
              title="Hapus"
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        </div>
      </li>

      {/* Modal hapus */}
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => deleteDebt(debt.id)}
        title="Hapus Utang"
        message={`Anda yakin ingin menghapus utang "${debt.description}"?`}
      />

      {/* Modal rincian */}
      <DetailsModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        debt={debt}
      />
    </>
  );
}

export default function DebtCard({ debts, totalDebt, periodId }: DebtCardProps) {
  const [formKey, setFormKey] = useState(Date.now());
  const todayStr = toDateInputValue(new Date());

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-black">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-bold text-lg">Rincian Utang</h2>
        <span className="font-bold text-lg text-red-600">
          {formatCurrency(totalDebt)}
        </span>
      </div>

      <ul className="space-y-1 mb-4">
        {debts.length > 0 ? (
          debts.map((debt) => <DebtItem key={debt.id} debt={debt} />)
        ) : (
          <p className="text-sm text-center text-gray-400 py-4">
            Belum ada utang.
          </p>
        )}
      </ul>

      <form
        key={formKey}
        action={async (formData) => {
          await addDebt(formData);
          setFormKey(Date.now());
        }}
        className="flex flex-wrap sm:flex-nowrap gap-2 items-center"
      >
        <input type="hidden" name="periodId" value={periodId} />

        <input
          name="description"
          type="text"
          placeholder="Keterangan baru..."
          className="w-full sm:flex-1 p-2 border rounded-md text-sm focus:ring-2 focus:ring-[#e799ff] focus-border-transparent"
          required
        />

        <div className="w-full sm:w-auto flex gap-2">
          <input
            type="date"
            name="date"
            defaultValue={todayStr}
            className="p-2 border rounded-md text-sm"
            aria-label="Tanggal utang"
          />

          <CurrencyInput
            name="amount"
            placeholder="Jumlah"
            className="flex-1 sm:w-28 p-2 border rounded-md text-sm focus:ring-2 focus:ring-[#e799ff] focus-border-transparent"
            required
          />

          <SubmitButton className="bg-[#e799ff] text-white px-4 rounded-md font-bold hover:opacity-80 transition-opacity">
            +
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
