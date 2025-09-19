// file: app/new-period/page.tsx

import CreatePeriodForm from "../components/CreatePeriodForm";

export default function NewPeriodPage() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <CreatePeriodForm />
    </main>
  );
}