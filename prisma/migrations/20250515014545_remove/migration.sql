/*
  Warnings:

  - You are about to drop the column `schoolTermId` on the `Course` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_schoolTermId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "schoolTermId";
