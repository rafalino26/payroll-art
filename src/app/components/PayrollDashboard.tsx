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
import AddOvertimeModal from './AddOvertimeModal';
import AddBonusModal from './AddBonusModal';

type PeriodData = {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  dailyRate: number;
  workdayAdjustment: number;
  adjustmentReason: string | null;
  // --- UBAH TIPE DATA DI SINI ---
  overtimes: { id: string; date: Date; description: string; days: number; amount: number; }[];
  bonuses: { id: string; date: Date; description: string; amount: number; }[];
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
  totalOvertime: number;
  totalBonus: number; 
};

type PayrollDashboardProps = {
  data: PeriodData;
  allPeriods: AllPeriods;
  calculations: Calculations;
};

export default function PayrollDashboard({ data, allPeriods, calculations }: PayrollDashboardProps) {
  const { totalWorkDays, totalAbsences, adjustedWorkDays, totalDaysPresent, totalSalary, totalDebt, totalOvertime, totalBonus, netSalary } = calculations;

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
            <AddOvertimeModal periodId={data.id} />
            <AddBonusModal periodId={data.id} />
          </div>

          <SummaryCard netSalary={netSalary} />
          <TabManager
            strukView={
              <div className="space-y-4">
                <SalaryCard
                  periodId={data.id}
                  totalWorkDays={totalWorkDays}
                  totalAbsences={totalAbsences}
                  totalDaysPresent={totalDaysPresent}
                  dailyRate={data.dailyRate}
                  debts={data.debts}
                  adjustment={data.workdayAdjustment}
                  adjustmentReason={data.adjustmentReason}
                  overtimes={data.overtimes}
                  bonuses={data.bonuses} 
                  cashAdvance={data.cashAdvance}
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
                  totalOvertime,
                  totalBonus, 
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