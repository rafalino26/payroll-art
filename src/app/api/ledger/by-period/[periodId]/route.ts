import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { periodId: string } }
) {
  const data = await prisma.ledgerEntry.findMany({
    where: { payrollPeriodId: params.periodId },
    orderBy: { date: "asc" },
  });

  return NextResponse.json(data);
}