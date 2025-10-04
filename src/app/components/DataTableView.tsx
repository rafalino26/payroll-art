// file: app/components/DataTableView.tsx

import { formatCurrency } from '../lib/utils';
import DebtDetailsModal from './DebtDetailsModal';
import AbsenceDetailsModal from './AbsenceDetailsModal';
import EditDailyRateModal from './EditDailyRateModal';
import EditWorkdayAdjustmentModal from './EditWorkdayAdjustmentModal';

import EditCashAdvanceModal from './EditCashAdvanceModal';
import OvertimeDetailsModal from './OvertimeDetailsModal';
import BonusDetailsModal from './BonusDetailsModal';

// Tipe data yang diterima dari page.tsx
type PeriodData = {
  id: string;
  dailyRate: number;
  workdayAdjustment: number;
  adjustmentReason: string | null;
  cashAdvance: number;
  debts: { id: string, description: string, amount: number }[];
  absences: { id: string, date: Date }[];
  // --- UBAH TIPE DATA DI SINI ---
  overtimes: { id: string; date: Date; description: string; days: number; amount: number; }[];
  bonuses: { id: string; date: Date; description: string; amount: number; }[];
};

type SalaryCalculations = {
  totalWorkDays: number;
  adjustedWorkDays: number;
  totalAbsences: number;
  totalDaysPresent: number;
  totalSalary: number;
  totalDebt: number;
  totalOvertime: number;
  totalBonus: number;
  netSalary: number;
};

type Props = { period: PeriodData; salaryData: SalaryCalculations; };

export default function DataTableView({ period, salaryData }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rincian</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Hari Kerja</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Hari Masuk</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Absen</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Utang</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Uang Diambil</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Lembur</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Bonus</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diterima</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr className="hover:bg-gray-50">
            {/* Kolom Rincian */}
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="font-medium text-gray-900">Gaji Pokok</div>
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <span>{formatCurrency(period.dailyRate)} / hari</span>
                <EditDailyRateModal periodId={period.id} currentRate={period.dailyRate} />
              </div>
            </td>
            {/* Kolom Hari Kerja */}
            <td className="px-6 py-4 whitespace-nowrap text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="font-bold text-gray-800">{salaryData.adjustedWorkDays}</span>
                <EditWorkdayAdjustmentModal 
                  periodId={period.id}
                  totalWorkDays={salaryData.totalWorkDays}
                  currentAdjustment={period.workdayAdjustment}
                  currentReason={period.adjustmentReason}
                />
              </div>
            </td>
            {/* Kolom Hari Masuk */}
            <td className="px-6 py-4 whitespace-nowrap text-center">
              <span className="font-bold text-blue-600">{salaryData.totalDaysPresent}</span>
            </td>
            {/* Kolom Absen */}
            <td className="px-6 py-4 whitespace-nowrap text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="font-bold text-yellow-600">{salaryData.totalAbsences}</span>
                {period.absences.length > 0 && <AbsenceDetailsModal absences={period.absences} />}
              </div>
            </td>
            {/* Kolom Total Utang */}
            <td className="px-6 py-4 whitespace-nowrap text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="font-bold text-red-600">{formatCurrency(salaryData.totalDebt)}</span>
                {period.debts.length > 0 && <DebtDetailsModal debts={period.debts} />}
              </div>
            </td>
            {/* Kolom Uang Diambil */}
            <td className="px-6 py-4 whitespace-nowrap text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="font-bold text-red-600">{formatCurrency(period.cashAdvance)}</span>
                <EditCashAdvanceModal periodId={period.id} currentCashAdvance={period.cashAdvance} />
              </div>
            </td>
            {/* Kolom Lembur */}
            <td className="px-6 py-4 whitespace-nowrap text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="font-bold text-green-600">{formatCurrency(salaryData.totalOvertime)}</span>
                {period.overtimes.length > 0 && <OvertimeDetailsModal overtimes={period.overtimes} />}
              </div>
            </td>
            {/* Kolom Bonus */}
            <td className="px-6 py-4 whitespace-nowrap text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="font-bold text-green-600">{formatCurrency(salaryData.totalBonus)}</span>
                {period.bonuses.length > 0 && <BonusDetailsModal bonuses={period.bonuses} />}
              </div>
            </td>
            {/* Kolom Gaji Diterima */}
            <td className="px-6 py-4 whitespace-nowrap font-bold text-lg text-gray-900">
              {formatCurrency(salaryData.netSalary)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}