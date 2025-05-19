/*
  Warnings:

  - Added the required column `schoolTermId` to the `AcadForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolTermId` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolTermId` to the `StudentCourse` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Semester" AS ENUM ('FIRST', 'SECOND');

-- AlterTable
ALTER TABLE "AcadForm" ADD COLUMN     "schoolTermId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "schoolTermId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "StudentCourse" ADD COLUMN     "schoolTermId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "SchoolTerm" (
    "id" SERIAL NOT NULL,
    "sy" TEXT NOT NULL,
    "semester" "Semester" NOT NULL,

    CONSTRAINT "SchoolTerm_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_schoolTermId_fkey" FOREIGN KEY ("schoolTermId") REFERENCES "SchoolTerm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCourse" ADD CONSTRAINT "StudentCourse_schoolTermId_fkey" FOREIGN KEY ("schoolTermId") REFERENCES "SchoolTerm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcadForm" ADD CONSTRAINT "AcadForm_schoolTermId_fkey" FOREIGN KEY ("schoolTermId") REFERENCES "SchoolTerm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
