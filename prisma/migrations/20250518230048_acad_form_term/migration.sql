/*
  Warnings:

  - Added the required column `schoolTermId` to the `AcadForm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AcadForm" ADD COLUMN     "schoolTermId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "AcadForm" ADD CONSTRAINT "AcadForm_schoolTermId_fkey" FOREIGN KEY ("schoolTermId") REFERENCES "SchoolTerm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
