// src/app/lib/ledger.ts
import { PrismaClient, LedgerType } from "@prisma/client";

const prisma = new PrismaClient();

export async function createLedgerEntry(data: {
  payrollPeriodId?: string;
  type: LedgerType;
  amount: number;
  note?: string;
  date?: Date;
}) {
  return prisma.ledgerEntry.create({
    data: {
      payrollPeriodId: data.payrollPeriodId,
      type: data.type,
      amount: data.amount,
      note: data.note,
      date: data.date,
    },
  });
}

export async function getLedgerByPeriod(payrollPeriodId: string) {
  return prisma.ledgerEntry.findMany({
    where: { payrollPeriodId },
    orderBy: { date: "asc" },
  });
}