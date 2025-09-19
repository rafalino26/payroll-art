-- AlterTable
ALTER TABLE "public"."PayrollPeriod" ADD COLUMN     "adjustmentReason" TEXT,
ADD COLUMN     "workdayAdjustment" INTEGER NOT NULL DEFAULT 0;
