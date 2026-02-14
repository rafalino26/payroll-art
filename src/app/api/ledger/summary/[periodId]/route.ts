import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { LedgerType } from "@prisma/client";

export async function GET(
  req: Request,
  { params }: { params: { periodId: string } }
) {
  const entries = await prisma.ledgerEntry.findMany({
    where: { payrollPeriodId: params.periodId },
  });

  let totalDebt = 0;
  let debtPayment = 0;
  let salary = 0;
  let cashTaken = 0;

  for (const e of entries) {
    switch (e.type) {
      case LedgerType.DEBT_ADD:
        totalDebt += e.amount;
        break;
      case LedgerType.DEBT_PAYMENT:
        debtPayment += e.amount;
        break;
      case LedgerType.SALARY:
        salary += e.amount;
        break;
      case LedgerType.CASH_TAKEN:
        cashTaken += e.amount;
        break;
    }
  }

  const remainingDebt = totalDebt - debtPayment;
  const salaryReceived = salary - cashTaken - debtPayment;

  return NextResponse.json({
    totalDebt,
    debtPayment,
    salary,
    cashTaken,
    salaryReceived,
    remainingDebt,
  });
}