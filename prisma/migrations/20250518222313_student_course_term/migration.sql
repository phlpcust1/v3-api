/*
  Warnings:

  - Added the required column `schoolTermId` to the `StudentCourse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StudentCourse" ADD COLUMN     "schoolTermId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "StudentCourse" ADD CONSTRAINT "StudentCourse_schoolTermId_fkey" FOREIGN KEY ("schoolTermId") REFERENCES "SchoolTerm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
