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