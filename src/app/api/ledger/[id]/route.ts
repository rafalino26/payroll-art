import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// UPDATE: Untuk mengedit transaksi yang salah ketik (Nominal, Catatan, Jenis, Tanggal)
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { amount, note, type, date } = body;

    const updatedEntry = await prisma.ledgerEntry.update({
      where: { id: params.id },
      data: {
        amount: amount !== undefined ? Number(amount) : undefined,
        note: note !== undefined ? note : undefined,
        type: type !== undefined ? type : undefined,
        date: date ? new Date(date) : undefined,
      },
    });

    return NextResponse.json(updatedEntry);
  } catch (error) {
    console.error("Error updating ledger entry:", error);
    return NextResponse.json({ error: "Gagal mengubah data" }, { status: 500 });
  }
}

// DELETE: Untuk menghapus transaksi
export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.ledgerEntry.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Gagal menghapus data" }, { status: 500 });
  }
}