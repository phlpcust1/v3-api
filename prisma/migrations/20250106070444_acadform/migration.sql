-- CreateTable
CREATE TABLE "AcadForm" (
    "id" SERIAL NOT NULL,
    "recommendation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "studentId" INTEGER NOT NULL,

    CONSTRAINT "AcadForm_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AcadForm" ADD CONSTRAINT "AcadForm_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
