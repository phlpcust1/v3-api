/*
  Warnings:

  - You are about to drop the column `schoolTermId` on the `AcadForm` table. All the data in the column will be lost.
  - You are about to drop the column `schoolTermId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `semester` on the `SchoolTerm` table. All the data in the column will be lost.
  - You are about to drop the column `sy` on the `SchoolTerm` table. All the data in the column will be lost.
  - You are about to drop the column `schoolTermId` on the `StudentCourse` table. All the data in the column will be lost.
  - Added the required column `name` to the `SchoolTerm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolTermId` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AcadForm" DROP CONSTRAINT "AcadForm_schoolTermId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_schoolTermId_fkey";

-- DropForeignKey
ALTER TABLE "StudentCourse" DROP CONSTRAINT "StudentCourse_schoolTermId_fkey";

-- AlterTable
ALTER TABLE "AcadForm" DROP COLUMN "schoolTermId";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "schoolTermId";

-- AlterTable
ALTER TABLE "SchoolTerm" DROP COLUMN "semester",
DROP COLUMN "sy",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "schoolTermId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "StudentCourse" DROP COLUMN "schoolTermId";

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_schoolTermId_fkey" FOREIGN KEY ("schoolTermId") REFERENCES "SchoolTerm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
