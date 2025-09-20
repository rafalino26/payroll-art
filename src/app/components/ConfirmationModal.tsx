// file: app/components/ConfirmationModal.tsx
"use client";

import { FiAlertTriangle } from 'react-icons/fi';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
};

export default function ConfirmationModal({ isOpen, onClose, onConfirm, title, message }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Background overlay */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal content */}
      <div className="relative z-10 w-full max-w-sm p-6 bg-white rounded-2xl shadow-lg text-center">
        {/* Ikon Peringatan di Tengah */}
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <FiAlertTriangle className="h-6 w-6 text-red-600" aria-hidden="true" />
        </div>

        {/* Judul dan Pesan */}
        <div className="mt-3 text-center sm:mt-5">
          <h3 className="text-lg font-semibold text-gray-900 leading-6">{title}</h3>
          <div className="mt-2">
            <p className="text-sm text-gray-600">{message}</p>
          </div>
        </div>

        {/* Tombol Aksi - Rata Kanan dan Ukuran Sama */}
        <div className="mt-6 flex justify-end gap-3"> {/* Gunakan justify-end untuk meratakan ke kanan */}
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto flex-1 rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="w-full sm:w-auto flex-1 rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}