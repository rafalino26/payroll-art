import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { LedgerType } from "@prisma/client";

export async function GET() {
  try {
    // 1. Jumlahkan SEMUA catatan berjenis DEBT_ADD (Utang) di seluruh database
    const allDebts = await prisma.ledgerEntry.aggregate({
      where: { type: LedgerType.DEBT_ADD },
      _sum: { amount: true },
    });

    // 2. Jumlahkan SEMUA catatan berjenis DEBT_PAYMENT (Cicilan) di seluruh database
    const allPayments = await prisma.ledgerEntry.aggregate({
      where: { type: LedgerType.DEBT_PAYMENT },
      _sum: { amount: true },
    });

    const totalDebt = allDebts._sum.amount ?? 0;
    const totalPaid = allPayments._sum.amount ?? 0;
    
    // 3. Kurangi untuk mendapatkan sisa hutang asli saat ini
    const remainingGlobalDebt = totalDebt - totalPaid;

    return NextResponse.json({
      totalDebt,
      totalPaid,
      remainingGlobalDebt,
    });
  } catch (error) {
    console.error("Error calculating global debt:", error);
    return NextResponse.json(
      { error: "Gagal menghitung hutang global" },
      { status: 500 }
    );
  }
}