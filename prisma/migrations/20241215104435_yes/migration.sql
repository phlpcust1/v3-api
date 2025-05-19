-- CreateEnum
CREATE TYPE "Remark" AS ENUM ('PASSED', 'FAILED', 'IP', 'HOLD');

-- CreateTable
CREATE TABLE "StudentCourse" (
    "id" SERIAL NOT NULL,
    "noTake" INTEGER NOT NULL DEFAULT 1,
    "remark" "Remark" NOT NULL DEFAULT 'HOLD',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "studentId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "StudentCourse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StudentCourse" ADD CONSTRAINT "StudentCourse_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCourse" ADD CONSTRAINT "StudentCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
