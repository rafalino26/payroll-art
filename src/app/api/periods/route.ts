import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  const periods = await prisma.payrollPeriod.findMany({
    orderBy: { startDate: "desc" },
    select: {
      id: true,
      name: true,
      startDate: true,
      endDate: true,
    },
  });

  return NextResponse.json(periods);
}

// POST /api/periods (Untuk membuat periode baru dari Flutter)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, startDate, endDate } = body;

    if (!name || !startDate || !endDate) {
      return NextResponse.json({ error: "Nama dan tanggal wajib diisi" }, { status: 400 });
    }

    // DailyRate default disamakan dengan action.ts Anda (75000)
    const newPeriod = await prisma.payrollPeriod.create({
      data: {
        name,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        dailyRate: 75000, 
      },
    });

    return NextResponse.json(newPeriod, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Gagal membuat periode" }, { status: 500 });
  }
}