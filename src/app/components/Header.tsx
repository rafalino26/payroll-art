// file: app/components/Header.tsx

import PeriodSelector from './PeriodSelector';
import NewPeriodModal from './NewPeriodModal';
import EditPeriodModal from './EditPeriodModal';
import DeletePeriodButton from './DeletePeriodButton';
import ClientOnlyDate from './ClientOnlyDate';

// --- DEFINISIKAN TIPE DATA UNTUK PROPS DI SINI ---
type PeriodData = {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
};

type AllPeriods = {
  id: string;
  name: string;
}[];

type HeaderProps = {
  data: PeriodData;
  allPeriods: AllPeriods;
};

// --- GUNAKAN TIPE DATA YANG BARU DI SINI ---
export default function Header({ data, allPeriods }: HeaderProps) {
  return (
    <header className="text-center space-y-3">
      <div className="flex justify-between items-center">
        <PeriodSelector periods={allPeriods} currentPeriodId={data.id} />
        <NewPeriodModal />
      </div>
      <div className="flex justify-center items-center gap-3">
        <h1 className="text-2xl font-bold text-gray-800">{data.name}</h1>
        <EditPeriodModal period={data} />
        <DeletePeriodButton periodId={data.id} periodName={data.name} />
      </div>
      <p className="text-gray-500">
        Periode: <ClientOnlyDate date={data.startDate} options={{ day: 'numeric', month: 'long' }} /> - <ClientOnlyDate date={data.endDate} options={{ day: 'numeric', month: 'long', year: 'numeric' }} />
      </p>
    </header>
  );
}