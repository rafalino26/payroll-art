// file: app/actions.ts
'use server';

import { prisma } from '@/app/lib/prisma'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Mengambil periode terbaru
export async function getLatestPayrollData() {
  return await prisma.payrollPeriod.findFirst({
    orderBy: { createdAt: 'desc' },
    include: { 
      absences: true, 
      debts: true,
      overtimes: true, // <-- Tambahkan ini
      bonuses: true    // <-- Tambahkan ini
    },
  });
}

// Mengambil periode berdasarkan ID-nya
export async function getPeriodById(id: string) {
  return await prisma.payrollPeriod.findUnique({
    where: { id },
    include: { 
      absences: true, 
      debts: true,
      overtimes: true, // <-- Tambahkan ini
      bonuses: true    // <-- Tambahkan ini
    },
  });
}

// Mengambil daftar semua periode untuk dropdown
export async function getAllPeriods() {
  return await prisma.payrollPeriod.findMany({
    orderBy: { startDate: 'desc' },
    select: { id: true, name: true },
  });
}

// Membuat periode baru
export async function createPayrollPeriod(formData: FormData) {
  const name = formData.get('name') as string;
  const startDateValue = formData.get('startDate') as string;
  const endDateValue = formData.get('endDate') as string;

  if (!name || !startDateValue || !endDateValue) return;

  const startDate = new Date(startDateValue + 'T00:00:00.000Z');
  const endDate = new Date(endDateValue + 'T00:00:00.000Z');

  await prisma.payrollPeriod.create({
    data: { name, startDate, endDate, dailyRate: 75000 },
  });

  revalidatePath('/');
}

export async function updateDailyRate(formData: FormData) {
  const id = formData.get('id') as string;
  const newRate = Number(formData.get('dailyRate'));

  if (!id || !newRate) return;

  await prisma.payrollPeriod.update({
    where: { id },
    data: { dailyRate: newRate },
  });
  revalidatePath('/');
}

// FUNGSI BARU UNTUK PENYESUAIAN HARI KERJA
export async function updateWorkdayAdjustment(formData: FormData) {
  const id = formData.get('id') as string;
  const adjustment = Number(formData.get('adjustment'));
  const reason = formData.get('reason') as string;

  if (!id) return;

  await prisma.payrollPeriod.update({
    where: { id },
    data: { workdayAdjustment: adjustment, adjustmentReason: reason },
  });
  revalidatePath('/');
}

// --- FUNGSI BARU UNTUK LEMBUR ---
export async function addOvertime(formData: FormData) {
  const periodId = formData.get('id') as string;
  const date = new Date((formData.get('date') as string) + 'T00:00:00.000Z');
  const description = formData.get('description') as string;
  const days = Number(formData.get('days'));
  const amount = Number(formData.get('amount'));

  const period = await prisma.payrollPeriod.findUnique({ where: { id: periodId } });
  if (!period) return;

  const calculatedAmount = days * period.dailyRate;

  await prisma.overtime.create({
    data: { payrollPeriodId: periodId, date, description, days, amount },
  });
  revalidatePath('/');
}
export async function deleteOvertime(id: string) {
  await prisma.overtime.delete({ where: { id } });
  revalidatePath('/');
}

// --- FUNGSI BARU UNTUK BONUS ---
export async function addBonus(formData: FormData) {
  const periodId = formData.get('id') as string;
  const date = new Date((formData.get('date') as string) + 'T00:00:00.000Z');
  const description = formData.get('description') as string;
  const amount = Number(formData.get('amount'));

  await prisma.bonus.create({
    data: { payrollPeriodId: periodId, date, description, amount },
  });
  revalidatePath('/');
}
export async function deleteBonus(id: string) {
  await prisma.bonus.delete({ where: { id } });
  revalidatePath('/');
}


// Menambah utang baru
  export async function addDebt(formData: FormData) {
    const periodId = formData.get('periodId') as string;
    const description = formData.get('description') as string;
    // Pastikan konversi ke Number sudah benar
    const amount = Number(formData.get('amount')); 

    if (!periodId || !description || !amount) return;

    await prisma.debt.create({
      data: { payrollPeriodId: periodId, description, amount },
    });
    revalidatePath('/');
  }

// Menambah absen baru
export async function addAbsence(formData: FormData) {
  const periodId = formData.get('periodId') as string;
  const dateString = formData.get('date') as string;

  if (!periodId || !dateString) return;

  await prisma.absence.create({
    data: { payrollPeriodId: periodId, date: new Date(dateString) },
  });
  revalidatePath('/');
}

// --- FUNGSI-FUNGSI BARU UNTUK DELETE ---

export async function deleteDebt(debtId: string) {
  await prisma.debt.delete({
    where: { id: debtId },
  });
  revalidatePath('/');
}

export async function deleteAbsence(absenceId: string) {
  await prisma.absence.delete({
    where: { id: absenceId },
  });
  revalidatePath('/');
}

export async function deletePeriod(periodId: string) {
  // Hati-hati: Menghapus periode akan menghapus semua utang dan absen di dalamnya
  // Kita gunakan transaction untuk memastikan semua terhapus bersamaan
  await prisma.$transaction([
    prisma.debt.deleteMany({ where: { payrollPeriodId: periodId } }),
    prisma.absence.deleteMany({ where: { payrollPeriodId: periodId } }),
    prisma.payrollPeriod.delete({ where: { id: periodId } }),
  ]);
  
  revalidatePath('/');
  redirect('/'); // Arahkan kembali ke homepage setelah menghapus
}

// --- FUNGSI-FUNGSI BARU UNTUK UPDATE ---

export async function updateDebt(formData: FormData) {
  const id = formData.get('id') as string;
  const description = formData.get('description') as string;
  // Pastikan konversi ke Number sudah benar
  const amount = Number(formData.get('amount'));
  
  if (!id || !description || !amount) return;

  await prisma.debt.update({
    where: { id },
    data: { description, amount },
  });
  revalidatePath('/');
}

export async function updateCashAdvance(formData: FormData) {
  const id = formData.get('id') as string;
  const amount = Number(formData.get('cashAdvance') || '0');

  if (!id) return;

  await prisma.payrollPeriod.update({
    where: { id },
    data: { cashAdvance: amount },
  });

  revalidatePath('/');
}

export async function updateAbsence(formData: FormData) {
  const id = formData.get('id') as string;
  const date = new Date((formData.get('date') as string) + 'T00:00:00.000Z');

  if (!id || !date) return;
  
  await prisma.absence.update({
    where: { id },
    data: { date },
  });
  revalidatePath('/');
}

export async function updatePeriod(formData: FormData) {
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const startDateValue = formData.get('startDate') as string;
  const endDateValue = formData.get('endDate') as string;

  if (!id || !name || !startDateValue || !endDateValue) return;
  
  const startDate = new Date(startDateValue + 'T00:00:00.000Z');
  const endDate = new Date(endDateValue + 'T00:00:00.000Z');

  await prisma.payrollPeriod.update({
    where: { id },
    data: { name, startDate, endDate },
  });

  revalidatePath('/');
}