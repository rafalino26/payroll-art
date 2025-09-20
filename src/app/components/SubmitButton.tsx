// file: app/components/SubmitButton.tsx
"use client";

import { useFormStatus } from 'react-dom';
import { FiLoader } from 'react-icons/fi';

// Terima semua props dari button standar
type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function SubmitButton({ children, className, ...props }: Props) {
  // Hook ini memberikan status 'pending' dari form induknya
  const { pending } = useFormStatus();

  return (
    <button
      {...props}
      type="submit"
      // Tambahkan kelas & nonaktifkan tombol saat loading
      className={`${className} flex items-center justify-center`}
      disabled={pending}
    >
      {pending ? (
        // Tampilkan spinner jika pending
        <FiLoader className="animate-spin" />
      ) : (
        // Tampilkan teks tombol jika tidak
        children
      )}
    </button>
  );
}