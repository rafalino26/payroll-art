// file: app/components/AbsenceCard.tsx

"use client";

import { useRef, useState } from 'react';
import { addAbsence, updateAbsence, deleteAbsence } from '../action';
import ClientOnlyDate from './ClientOnlyDate';
import { FiEdit, FiTrash2, FiSave, FiXCircle } from 'react-icons/fi';
import ConfirmationModal from './ConfirmationModal';
import SubmitButton from './SubmitButton'; // <-- 1. Import SubmitButton

type Absence = {
  id: string;
  date: Date;
};

type AbsenceCardProps = {
  absences: Absence[];
  periodId: string;
};

function AbsenceItem({ absence }: { absence: Absence }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const formatDateForInput = (date: Date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
  };

  if (isEditing) {
    return (
      <form
        action={async (formData) => {
          await updateAbsence(formData);
          setIsEditing(false);
        }}
        className="flex items-center gap-2 bg-purple-50 p-2 rounded-lg text-black"
      >
        <input type="hidden" name="id" value={absence.id} />
        <input
          type="date"
          name="date"
          defaultValue={formatDateForInput(absence.date)}
          className="flex-1 p-2 border rounded-md text-sm"
          required
        />
        <div className="flex items-center gap-2">
          {/* --- 2. Ganti tombol Simpan di form EDIT --- */}
          <SubmitButton className="text-green-600 hover:text-green-800">
            <FiSave size={20} />
          </SubmitButton>
          <button type="button" onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-gray-700"><FiXCircle size={20} /></button>
        </div>
      </form>
    );
  }

  return (
    <>
      <li className="flex justify-between items-center text-sm text-gray-700 p-2 rounded transition-colors hover:bg-gray-100">
        <ClientOnlyDate date={absence.date} options={{ weekday: 'long', day: 'numeric', month: 'long' }} />
        <div className="flex items-center gap-3">
          <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:text-blue-700"><FiEdit size={16} /></button>
          <button onClick={() => setIsConfirmOpen(true)} className="text-red-500 hover:text-red-700">
            <FiTrash2 size={16} />
          </button>
        </div>
      </li>
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => deleteAbsence(absence.id)}
        title="Hapus Absen"
        message="Anda yakin ingin menghapus tanggal absen ini?"
      />
    </>
  );
}

export default function AbsenceCard({ absences, periodId }: AbsenceCardProps) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-black">
      <h2 className="font-bold text-lg mb-3">Tanggal Absen</h2>
      <ul className="space-y-1 mb-4">
        {absences.length > 0 ? (
          absences.map(absence => <AbsenceItem key={absence.id} absence={absence} />)
        ) : (
          <p className="text-sm text-center text-gray-400 py-4">Tidak ada absen.</p>
        )}
      </ul>
      
      <form
        ref={formRef}
        action={async (formData) => {
          await addAbsence(formData);
          formRef.current?.reset();
        }}
        className="flex gap-2"
      >
        <input type="hidden" name="periodId" value={periodId} />
        <input
          name="date"
          type="date"
          className="flex-1 p-2 border rounded-md text-sm focus:ring-2 focus:ring-[#e799ff] focus:border-transparent"
          required
        />
        {/* --- 3. Ganti tombol Tambah di form TAMBAH --- */}
        <SubmitButton
          className="bg-[#e799ff] text-white px-4 rounded-md font-bold hover:opacity-80 transition-opacity"
        >
          +
        </SubmitButton>
      </form>
    </div>
  );
}