// file: app/components/SalaryCard.tsx

import { formatCurrency } from '@/app/lib/utils';
import { FiAlertCircle, FiInfo } from 'react-icons/fi';
import EditDailyRateModal from './EditDailyRateModal';
import EditWorkdayAdjustmentModal from './EditWorkdayAdjustmentModal';
import OvertimeDetailsModal from './OvertimeDetailsModal'; // <-- Import modal baru
import BonusDetailsModal from './BonusDetailsModal';
import EditCashAdvanceModal from './EditCashAdvanceModal';


// Definisikan tipe Props yang lebih lengkap
type Props = {
  periodId: string;
  totalWorkDays: number;
  totalAbsences: number;
  totalDaysPresent: number; // Prop untuk total hari masuk
  dailyRate: number;
  debts: { amount: number }[];
  adjustment: number;
  adjustmentReason: string | null;
  overtimes: { id: string; date: Date; description: string; days: number; amount: number; }[];
  bonuses: { id: string; date: Date; description: string; amount: number; }[];
  cashAdvance: number; // Prop untuk uang diambil
  netSalary: number;
};

export default function SalaryCard({ 
  periodId, totalWorkDays, totalAbsences, totalDaysPresent, dailyRate, debts, 
  adjustment, adjustmentReason, cashAdvance, netSalary, overtimes, bonuses 
}: Props) {
  // Kalkulasi baru untuk total lembur dan bonus
  const totalDebt = debts.reduce((sum, debt) => sum + debt.amount, 0);
  const totalOvertime = overtimes.reduce((sum, ot) => sum + ot.amount, 0); 
  const totalBonus = bonuses.reduce((sum, b) => sum + b.amount, 0);
  const adjustedWorkDays = totalWorkDays + adjustment;

  // Komponen kecil untuk setiap baris agar kode tetap bersih
  const InfoRow = ({ label, children }: { label: React.ReactNode, children: React.ReactNode }) => (
    <div className="flex justify-between items-start py-2">
      <span className="text-gray-600">{label}</span>
      {children}
    </div>
  );

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-black">
      <h2 className="font-bold text-lg mb-2">Rincian Gaji</h2>
      <div className="text-sm">
        
        <InfoRow
          label={
            <div className="flex items-center gap-2">
              <span>Total Hari Kerja</span>
              {adjustment !== 0 && (
                <div className="tooltip" data-tip={adjustmentReason ?? 'Penyesuaian'}>
                  <FiAlertCircle size={14} className={adjustment > 0 ? "text-green-500" : "text-orange-500"} />
                </div>
              )}
            </div>
          }
        >
          <div className="flex items-start gap-2">
            <div className="text-right">
              <span className="font-semibold text-gray-800">{adjustedWorkDays} hari</span>
              <p className="text-xs text-gray-500">({formatCurrency(adjustedWorkDays * dailyRate)})</p>
            </div>
            <EditWorkdayAdjustmentModal periodId={periodId} totalWorkDays={totalWorkDays} currentAdjustment={adjustment} currentReason={adjustmentReason} />
          </div>
        </InfoRow>

        <InfoRow label="Absen">
          <div className="text-right font-semibold text-red-500">
            <span>{totalAbsences} hari</span>
            <p className="text-xs">(-{formatCurrency(totalAbsences * dailyRate)})</p>
          </div>
        </InfoRow>
        
        <InfoRow label="Utang">
          <div className="text-right font-semibold text-red-500">
            <span>{debts.length} catatan</span>
            <p className="text-xs">(-{formatCurrency(totalDebt)})</p>
          </div>
        </InfoRow>

        {/* --- BARIS BARU: UANG DIAMBIL --- */}
        <InfoRow label="Uang Diambil">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-red-500">
              -{formatCurrency(cashAdvance)}
            </span>
            <EditCashAdvanceModal periodId={periodId} currentCashAdvance={cashAdvance} />
          </div>
        </InfoRow>

        <InfoRow label="Lembur">
          <div className="flex items-center gap-2 justify-end">
            <span className="font-semibold text-green-600">
              +{formatCurrency(totalOvertime)}
            </span>
            {overtimes.length > 0 && <OvertimeDetailsModal overtimes={overtimes} />}
          </div>
        </InfoRow>

        <InfoRow label="Bonus">
          <div className="flex items-center gap-2 justify-end">
            <span className="font-semibold text-green-600">
              +{formatCurrency(totalBonus)}
            </span>
            {bonuses.length > 0 && <BonusDetailsModal bonuses={bonuses} />}
          </div>
        </InfoRow>

        <hr className="my-1 border-dashed" />

        <InfoRow label="Gaji per Hari">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-800">{formatCurrency(dailyRate)}</span>
            <EditDailyRateModal periodId={periodId} currentRate={dailyRate} />
          </div>
        </InfoRow>
        
        {/* --- BARIS BARU: TOTAL HARI MASUK --- */}
        <InfoRow label="Total Hari Masuk">
          <span className="font-semibold text-gray-800">{totalDaysPresent} hari</span>
        </InfoRow>
        
        <div className="flex justify-between items-center font-bold text-base mt-2 pt-2 border-t">
          <span>TOTAL DITERIMA</span>
          <span>{formatCurrency(netSalary)}</span>
        </div>
      </div>
    </div>
  );
}