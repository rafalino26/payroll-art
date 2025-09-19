// file: app/components/TabManager.tsx
"use client";

import { useState } from 'react';

// Terima semua komponen view sebagai children
type Props = {
  strukView: React.ReactNode;
  tableView: React.ReactNode;
};

export default function TabManager({ strukView, tableView }: Props) {
  const [activeTab, setActiveTab] = useState<'struk' | 'tabel'>('struk');

  const getTabClass = (tabName: 'struk' | 'tabel') => {
    return activeTab === tabName
      ? 'bg-purple-500 text-white' // Kelas untuk tab aktif
      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'; // Kelas untuk tab non-aktif
  };

  return (
    <div>
      {/* Tombol Tab */}
      <div className="flex justify-center mb-6">
        <div className="flex p-1 bg-gray-100 rounded-lg">
          <button
            onClick={() => setActiveTab('struk')}
            className={`px-6 py-2 text-sm font-semibold rounded-md transition-colors ${getTabClass('struk')}`}
          >
            Struk
          </button>
          <button
            onClick={() => setActiveTab('tabel')}
            className={`px-6 py-2 text-sm font-semibold rounded-md transition-colors ${getTabClass('tabel')}`}
          >
            Tabel
          </button>
        </div>
      </div>

      {/* Konten Tab */}
      <div>
        {activeTab === 'struk' ? strukView : tableView}
      </div>
    </div>
  );
}