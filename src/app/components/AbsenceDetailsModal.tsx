// file: app/components/AbsenceDetailsModal.tsx
"use client";

import { useState } from 'react';
import { FiInfo, FiEdit, FiTrash2, FiSave, FiXCircle } from 'react-icons/fi';
import { updateAbsence, deleteAbsence } from '../action';
import ClientOnlyDate from './ClientOnlyDate';

type Absence = {
  id: string;
  date: Date;
};

// Komponen untuk setiap baris absen di dalam modal
function AbsenceDetailItem({ absence }: { absence: Absence }) {
  const [isEditing, setIsEditing] = useState(false);

  const formatDateForInput = (date: Date) => {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  if (isEditing) {
    return (
      <li className="border-b pb-2">
        <form
          action={async (formData) => {
            await updateAbsence(formData);
            setIsEditing(false);
          }}
          className="flex items-center gap-2 bg-purple-50 p-2 rounded-lg text-black"
        >
          <input type="hidden" name="id" value={absence.id} />
          <input type="date" name="date" defaultValue={formatDateForInput(absence.date)} className="flex-1 w-full p-2 border rounded-md text-sm" required />
          <button type="submit" className="text-green-600 hover:text-green-800"><FiSave size={20} /></button>
          <button type="button" onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-gray-700"><FiXCircle size={20} /></button>
        </form>
      </li>
    );
  }

  return (
    <li className="flex justify-between items-center text-sm text-black border-b py-2">
      <ClientOnlyDate date={absence.date} options={{ weekday: 'long', day: 'numeric', month: 'long' }} />
      <div className="flex items-center gap-3">
        <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:text-blue-700"><FiEdit size={16} /></button>
        <button onClick={() => { if (confirm('Yakin hapus?')) { deleteAbsence(absence.id); }}} className="text-red-500 hover:text-red-700">
          <FiTrash2 size={16} />
        </button>
      </div>
    </li>
  );
}

// Komponen utama modal
export default function AbsenceDetailsModal({ absences }: { absences: Absence[] }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)} className="ml-2 text-blue-500 hover:text-blue-700" title="Lihat Detail Absen">
        <FiInfo size={16} />
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-50 text-black flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
          <div className="relative z-10 w-full max-w-sm p-6 bg-white rounded-2xl shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Detail Tanggal Absen</h3>
            <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {absences.map((absence) => <AbsenceDetailItem key={absence.id} absence={absence} />)}
            </ul>
            <button onClick={() => setIsOpen(false)} className="mt-6 w-full py-2 border rounded-lg text-sm">Tutup</button>
          </div>
        </div>
      )}
    </>
  );
}