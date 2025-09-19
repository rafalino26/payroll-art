// file: app/page.tsx
import { getLatestPayrollData, getPeriodById, getAllPeriods } from '@/app/action';
import { calculateWorkDays } from '@/app/lib/utils';
import CreatePeriodForm from './components/CreatePeriodForm';
import PayrollDashboard from './components/PayrollDashboard';

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const periodId = searchParams?.periodId as string | undefined;

  let data;
  if (periodId) {
    data = await getPeriodById(periodId);
  } else {
    data = await getLatestPayrollData();
  }

  const allPeriods = await getAllPeriods();

  if (!data) {
    return (
      <main className="min-h-screen bg-gray-100">
        <div className="bg-purple-100 py-2 text-center text-sm font-semibold text-purple-800 shadow-sm">
          Payroll Gaji
        </div>
        <div className="flex flex-col items-center justify-center p-4 pt-16">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Selamat Datang!</h1>
            <p className="text-gray-500">Mulai dengan membuat periode penggajian pertama Anda.</p>
          </div>
          <CreatePeriodForm />
        </div>
      </main>
    );
  }

  const totalWorkDays = calculateWorkDays(data.startDate, data.endDate);
  const totalAbsences = data.absences.length;
  const adjustedWorkDays = totalWorkDays + data.workdayAdjustment;
  const totalDaysPresent = adjustedWorkDays - totalAbsences;
  const totalSalary = totalDaysPresent * data.dailyRate;
  const totalDebt = data.debts.reduce(
    (sum: number, debt: { amount: number }) => sum + debt.amount,
    0
  );
  const netSalary = totalSalary + data.overtimePay - totalDebt;

  const calculations = {
    totalWorkDays,
    totalAbsences,
    adjustedWorkDays,
    totalDaysPresent,
    totalSalary,
    totalDebt,
    netSalary,
  };

  return (
    <PayrollDashboard
      data={data}
      allPeriods={allPeriods}
      calculations={calculations}
    />
  );
}
