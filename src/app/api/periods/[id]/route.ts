import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// UPDATE: Mengganti Nama / Tanggal Periode
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { name, startDate, endDate } = body;

    const updatedPeriod = await prisma.payrollPeriod.update({
      where: { id: params.id },
      data: {
        name: name !== undefined ? name : undefined,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
      },
    });

    return NextResponse.json(updatedPeriod);
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengubah periode" }, { status: 500 });
  }
}

// DELETE: Menghapus Periode beserta SEMUA isinya
export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 1. Hapus SEMUA catatan kas/ledger di dalam periode ini terlebih dahulu
    await prisma.ledgerEntry.deleteMany({
      where: { payrollPeriodId: params.id },
    });

    // 2. Baru hapus map periodenya
    await prisma.payrollPeriod.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Gagal menghapus periode" }, { status: 500 });
  }
}