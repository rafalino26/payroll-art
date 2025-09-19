// file: app/components/ClientOnlyDate.tsx

"use client";

import { useState, useEffect } from 'react';

type Props = {
  date: Date;
  options: Intl.DateTimeFormatOptions;
};

// Komponen ini akan me-render tanggal hanya di sisi client
// untuk menghindari hydration error akibat perbedaan timezone server/client.
export default function ClientOnlyDate({ date, options }: Props) {
  // Awalnya state kosong saat render di server
  const [formattedDate, setFormattedDate] = useState('');

  // useEffect hanya berjalan di client setelah komponen "terpasang"
  useEffect(() => {
    // Di sini kita aman untuk memformat tanggal sesuai browser pengguna
    setFormattedDate(new Date(date).toLocaleDateString('id-ID', options));
  }, [date, options]);

  // Jika state masih kosong (saat di server), jangan tampilkan apa-apa
  if (!formattedDate) {
    return null;
  }

  // Setelah di client, tampilkan tanggal yang sudah diformat
  return <>{formattedDate}</>;
}