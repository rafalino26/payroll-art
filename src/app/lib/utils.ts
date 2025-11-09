// file: lib/utils.ts
import { eachDayOfInterval, isSunday } from 'date-fns';

export function calculateWorkDays(startDate: Date, endDate: Date): number {
  if (!startDate || !endDate) return 0;

  const dates = eachDayOfInterval({ start: startDate, end: endDate });
  const workDays = dates.filter(date => !isSunday(date));
  
  return workDays.length;
}

// Format Angka ke Rupiah
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

export function formatDateDMY2(d: Date | string) {
  const dt = typeof d === 'string' ? new Date(d) : d;
  if (isNaN(dt.getTime())) return '-';
  const day = dt.getDate();              // 1..31 (tanpa leading zero)
  const month = dt.getMonth() + 1;       // 1..12 (tanpa leading zero)
  const yy = String(dt.getFullYear()).slice(-2).padStart(2, '0'); // 2 digit
  return `${day}/${month}/${yy}`;
}

