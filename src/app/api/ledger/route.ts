import { NextResponse } from "next/server";
import { createLedgerEntry, getLedgerByPeriod } from "@/app/lib/ledger";
import { LedgerType } from "@prisma/client";


// POST /api/ledger
export async function POST(req: Request) {
  const body = await req.json();

  const { payrollPeriodId, type, amount, note, date } = body;

  if (!payrollPeriodId || !type || !amount) {
    return NextResponse.json(
      { error: "payrollPeriodId, type, amount are required" },
      { status: 400 }
    );
  }

  if (amount <= 0) {
    return NextResponse.json(
      { error: "amount must be greater than 0" },
      { status: 400 }
    );
  }

  if (!Object.values(LedgerType).includes(type)) {
    return NextResponse.json(
      { error: "invalid ledger type" },
      { status: 400 }
    );
  }

  const entry = await createLedgerEntry({
    payrollPeriodId,
    type,
    amount,
    note,
    date: date ? new Date(date) : undefined,
  });

  return NextResponse.json(entry, { status: 201 });
}