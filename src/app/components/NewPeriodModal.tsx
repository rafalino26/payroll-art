// file: app/components/NewPeriodModal.tsx
"use client";

import { useState } from 'react';
import CreatePeriodForm from './CreatePeriodForm';

export default function NewPeriodModal() {
  const [isOpen, setIsOpen] = useState(false);

  // Fungsi yang dipanggil setelah form berhasil disubmit
  const handleFormSuccess = () => {
    setIsOpen(false); // Tutup modal
  };

  return (
    <>
      {/* Tombol Pemicu Modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-[#e799ff] text-white font-semibold text-sm px-4 py-2 rounded-lg shadow-sm hover:opacity-90 transition-opacity"
      >
        + Periode Baru
      </button>

      {/* Tampilan Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Latar Belakang Overlay */}
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Konten Modal */}
          <div className="relative z-10 text-black w-full max-w-md">
            {/* Kita akan meneruskan fungsi handleFormSuccess ke komponen form */}
            <CreatePeriodForm onFormSubmitSuccess={handleFormSuccess} />
          </div>
        </div>
      )}
    </>
  );
}