// file: app/components/SummaryCard.tsx

import { formatCurrency } from '../lib/utils';

type SummaryCardProps = {
  netSalary: number;
};

export default function SummaryCard({ netSalary }: SummaryCardProps) {
  return (
    <div className="bg-[#e799ff] text-white p-6 rounded-xl shadow-lg text-center">
      <p className="text-sm font-medium opacity-90">TOTAL DITERIMA</p>
      <p className="text-4xl font-bold mt-1">{formatCurrency(netSalary)}</p>
    </div>
  );
}