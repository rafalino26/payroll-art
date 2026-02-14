export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { LedgerType } from "@prisma/client";

export async function GET() {
  try {
    // 1. Ambil SEMUA rincian catatan UTANG (DEBT_ADD) dari awal sampai akhir, urutkan dari yang terbaru
    const globalDebtEntries = await prisma.ledgerEntry.findMany({
      where: { type: LedgerType.DEBT_ADD },
      orderBy: { date: 'desc' },
    });

    // 2. Ambil SEMUA rincian catatan CICILAN (DEBT_PAYMENT)
    const globalPaymentEntries = await prisma.ledgerEntry.findMany({
      where: { type: LedgerType.DEBT_PAYMENT },
      orderBy: { date: 'desc' },
    });

    // 3. Hitung Totalnya
    const totalDebt = globalDebtEntries.reduce((sum, entry) => sum + entry.amount, 0);
    const totalPaid = globalPaymentEntries.reduce((sum, entry) => sum + entry.amount, 0);
    const remainingGlobalDebt = totalDebt - totalPaid;

    return NextResponse.json({
      totalDebt,
      totalPaid,
      remainingGlobalDebt,
      // Kita kirimkan rincian datanya ke Flutter
      globalDebtEntries,
      globalPaymentEntries,
    });
  } catch (error) {
    console.error("Error calculating global debt:", error);
    return NextResponse.json(
      { error: "Gagal menghitung hutang global" },
      { status: 500 }
    );
  }
}