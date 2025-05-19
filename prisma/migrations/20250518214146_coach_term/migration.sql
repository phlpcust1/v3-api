/*
  Warnings:

  - Added the required column `schoolTermId` to the `Coach` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Coach" ADD COLUMN     "schoolTermId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Coach" ADD CONSTRAINT "Coach_schoolTermId_fkey" FOREIGN KEY ("schoolTermId") REFERENCES "SchoolTerm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
