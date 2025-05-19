-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "schoolTermId" INTEGER;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_schoolTermId_fkey" FOREIGN KEY ("schoolTermId") REFERENCES "SchoolTerm"("id") ON DELETE SET NULL ON UPDATE CASCADE;
