"use client";

import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { addDebt } from "../action"; // sesuaikan ke "../actions" kalau file-mu plural
import CurrencyInput from "./CurrencyInput";
import SubmitButton from "./SubmitButton";

function toDateInputValue(d: Date) {
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

export default function AddDebtModal({ periodId }: { periodId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formKey, setFormKey] = useState(Date.now());

  const todayStr = toDateInputValue(new Date());

  const handleAction = async (formData: FormData) => {
    await addDebt(formData);
    setFormKey(Date.now()); // reset form
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-[#e799ff] text-white font-semibold text-xs px-3 py-2 rounded-lg shadow-sm hover:bg-purple-600 transition-colors"
      >
        <FiPlus size={14} /> Utang
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative z-10 w-full max-w-sm p-6 bg-white rounded-2xl shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Tambah Utang Baru
            </h3>

            <form key={formKey} action={handleAction} className="space-y-4 text-black">
              <input type="hidden" name="periodId" value={periodId} />

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Keterangan
                </label>
                <input
                  name="description"
                  id="description"
                  type="text"
                  className="w-full p-2 border rounded-md text-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Tanggal
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    defaultValue={todayStr}
                    className="w-full p-2 border rounded-md text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Jumlah
                  </label>
                  <CurrencyInput
                    name="amount"
                    id="amount"
                    className="w-full p-2 border rounded-md text-sm"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2 border rounded-lg text-sm"
                >
                  Batal
                </button>

                <SubmitButton className="w-full py-2 bg-purple-500 text-white rounded-lg text-sm font-semibold">
                  Simpan
                </SubmitButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
