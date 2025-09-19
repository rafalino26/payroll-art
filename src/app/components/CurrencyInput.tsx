// file: app/components/CurrencyInput.tsx
"use client";

import { useState } from 'react';

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'name'> & {
  name: string;
  defaultValue?: number;
};

// --- PERHATIKAN PERUBAHAN DI SINI ---
// Kita secara eksplisit mengambil 'name' dari props agar tidak ikut disebar ke input yang terlihat
export default function CurrencyInput({ defaultValue, name, ...props }: Props) {
  const initialDisplayValue = defaultValue 
    ? new Intl.NumberFormat('id-ID').format(defaultValue) 
    : '';
  
  const [displayValue, setDisplayValue] = useState(initialDisplayValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    if (rawValue === '') {
      setDisplayValue('');
      return;
    }
    const formattedValue = new Intl.NumberFormat('id-ID').format(Number(rawValue));
    setDisplayValue(formattedValue);
  };

  return (
    <>
      {/* Input yang dilihat pengguna. Perhatikan, tidak ada atribut 'name' di sini */}
      <input
        {...props} // 'name' sudah tidak ada di dalam 'props' ini
        type="text"
        inputMode="numeric"
        value={displayValue}
        onChange={handleChange}
      />
      {/* Input tersembunyi yang mengirim nilai angka bersih ke server */}
      <input
        type="hidden"
        name={name} // Atribut 'name' hanya digunakan di sini
        value={displayValue.replace(/\./g, '') || '0'}
      />
    </>
  );
}