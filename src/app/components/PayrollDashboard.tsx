// file: app/components/PayrollDashboard.tsx

import SummaryCard from './SummaryCard';
import TabManager from './TabManager';
import SalaryCard from './SalaryCard';
import DebtCard from './DebtCard';
import AbsenceCard from './AbsenceCard';
import DataTableView from './DataTableView';
import AddDebtModal from './AddDebtModal';
import AddAbsenceModal from './AddAbsenceModal';
import Header from './Header';

// --- DEFINISIKAN TIPE DATA UNTUK PROPS DI SINI ---
type PeriodData = {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  dailyRate: number;
  workdayAdjustment: number;
  adjustmentReason: string | null;
  overtimePay: number;
  cashAdvance: number;
  debts: { id: string; description: string; amount: number; }[];
  absences: { id: string; date: Date; }[];
};

type AllPeriods = {
  id: string;
  name: string;
}[];

type Calculations = {
  totalWorkDays: number;
  totalAbsences: number;
  adjustedWorkDays: number;
  totalDaysPresent: number;
  totalSalary: number;
  totalDebt: number;
  netSalary: number;
};

type PayrollDashboardProps = {
  data: PeriodData;
  allPeriods: AllPeriods;
  calculations: Calculations;
};

// --- GUNAKAN TIPE DATA YANG BARU DI SINI ---
export default function PayrollDashboard({ data, allPeriods, calculations }: PayrollDashboardProps) {
  const { totalWorkDays, totalAbsences, adjustedWorkDays, totalDaysPresent, totalSalary, totalDebt, netSalary } = calculations;

  return (
    <main className="bg-white min-h-screen">
      <div className="bg-purple-100 py-2 text-center text-sm font-semibold text-purple-800 shadow-sm">
        Payroll Gaji
      </div>
      
      <div className="p-4 sm:p-6 md:p-8">
        <div className="max-w-md mx-auto space-y-6">
          <Header data={data} allPeriods={allPeriods} />

          <div className="flex justify-center gap-3">
            <AddDebtModal periodId={data.id} />
            <AddAbsenceModal periodId={data.id} />
          </div>

          <SummaryCard netSalary={netSalary} />
          <TabManager
        strukView={
          <div className="space-y-4">
            <SalaryCard
              periodId={data.id}
              totalWorkDays={totalWorkDays}
              totalAbsences={totalAbsences}
              totalDaysPresent={totalDaysPresent} // <-- Teruskan ini
              dailyRate={data.dailyRate}
              debts={data.debts}
              adjustment={data.workdayAdjustment}
              adjustmentReason={data.adjustmentReason}
              overtimePay={data.overtimePay}
              cashAdvance={data.cashAdvance}       // <-- Teruskan ini
              netSalary={netSalary}
            />
                <DebtCard debts={data.debts} totalDebt={totalDebt} periodId={data.id} />
                <AbsenceCard absences={data.absences} periodId={data.id} />
              </div>
            }
            tableView={
              <DataTableView 
                period={data}
                salaryData={{
                  totalWorkDays,
                  totalAbsences,
                  adjustedWorkDays,
                  totalDaysPresent,
                  totalSalary,
                  totalDebt,
                  netSalary
                }}
              />
            }
          />
        </div>
      </div>
    </main>
  );
}