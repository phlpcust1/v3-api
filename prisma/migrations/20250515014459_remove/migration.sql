-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_schoolTermId_fkey";

-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "schoolTermId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_schoolTermId_fkey" FOREIGN KEY ("schoolTermId") REFERENCES "SchoolTerm"("id") ON DELETE SET NULL ON UPDATE CASCADE;
