/*
  Warnings:

  - You are about to drop the column `calculatedAmount` on the `Overtime` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Overtime` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Overtime" DROP COLUMN "calculatedAmount",
ADD COLUMN     "amount" INTEGER NOT NULL,
ALTER COLUMN "days" SET DATA TYPE DOUBLE PRECISION;
