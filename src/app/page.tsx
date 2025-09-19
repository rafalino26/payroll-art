// file: app/page.tsx
import { getLatestPayrollData, getPeriodById, getAllPeriods} from './action';
import { calculateWorkDays } from '../app/lib/utils';
import NewPeriodModal from './components/NewPeriodModal'; 
import PeriodSelector from './components/PeriodSelector';
import CreatePeriodForm from './components/CreatePeriodForm';
import SummaryCard from './components/SummaryCard';
import SalaryCard from './components/SalaryCard';
import DebtCard from './components/DebtCard';
import AbsenceCard from './components/AbsenceCard';
import ClientOnlyDate from './components/ClientOnlyDate';
import EditPeriodModal from './components/EditPeriodModal';
import DeletePeriodButton from './components/DeletePeriodButton'; 
import TabManager from './components/TabManager';         
import DataTableView from './components/DataTableView'; 
import AddDebtModal from './components/AddDebtModal';     // <-- IMPORT BARU
import AddAbsenceModal from './components/AddAbsenceModal';

export default async function HomePage({ searchParams }: { searchParams: { periodId?: string } }) {
  const periodId = searchParams.periodId;
  let data;
  if (periodId) {
    data = await getPeriodById(periodId);
  } else {
    data = await getLatestPayrollData();
  }

  const allPeriods = await getAllPeriods();

  if (!data) {
    return (
      // --- PERUBAHAN DI SINI ---
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
  const totalDebt = data.debts.reduce((sum, debt) => sum + debt.amount, 0);
  // Net Salary sekarang memperhitungkan lembur
  const netSalary = (totalSalary + data.overtimePay) - totalDebt;

  return (
    // --- PERUBAHAN DI SINI ---
    <main className="bg-white min-h-screen">
      {/* Aksen Ungu Baru */}
      <div className="bg-purple-100 py-2 text-center text-sm font-semibold text-purple-800 shadow-sm">
        Payroll Gaji
      </div>
      
      {/* Wrapper Konten Utama */}
      <div className="p-4 sm:p-6 md:p-8">
        <div className="max-w-md mx-auto space-y-6">
          <header className="text-center space-y-3">
            
            <div className="flex justify-center items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-800">{data.name}</h1>
              <EditPeriodModal period={data} />
               <DeletePeriodButton periodId={data.id} periodName={data.name} />
            </div>
            
            <p className="text-gray-500">
              Periode: <ClientOnlyDate date={data.startDate} options={{ day: 'numeric', month: 'long' }} /> - <ClientOnlyDate date={data.endDate} options={{ day: 'numeric', month: 'long', year: 'numeric' }} />
            </p>

            <div className="flex justify-between items-center">
              <PeriodSelector periods={allPeriods} currentPeriodId={data.id} />
              <NewPeriodModal />
            </div>
          </header>

          <SummaryCard netSalary={netSalary} />
          <TabManager
            strukView={
              <div className="space-y-4">
                 <div className="flex justify-center gap-3">
            <AddDebtModal periodId={data.id} />
            <AddAbsenceModal periodId={data.id} />
          </div>
                <SalaryCard
                  periodId={data.id}
                  totalWorkDays={totalWorkDays}
                  totalAbsences={totalAbsences}
                  dailyRate={data.dailyRate}
                  debts={data.debts}
                  adjustment={data.workdayAdjustment}
                  adjustmentReason={data.adjustmentReason}
                  overtimePay={data.overtimePay}
                  netSalary={netSalary} // <-- Tambahkan baris ini
                />
                <DebtCard debts={data.debts} totalDebt={totalDebt} periodId={data.id} />
                <AbsenceCard absences={data.absences} periodId={data.id} />
              </div>
            }
            tableView={
              <div className="space-y-4">
                 <div className="flex justify-center gap-3">
            <AddDebtModal periodId={data.id} />
            <AddAbsenceModal periodId={data.id} />
          </div>
              <DataTableView 
                period={data} // Kirim seluruh data periode
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
              </div>
            }
          />
        </div>
      </div>
    </main>
  );
}