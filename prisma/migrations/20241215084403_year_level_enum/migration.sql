/*
  Warnings:

  - Changed the type of `year` on the `Course` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "year",
ADD COLUMN     "year" "YearLevel" NOT NULL;
