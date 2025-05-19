-- CreateTable
CREATE TABLE "Head" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "headId" TEXT NOT NULL,
    "contact" TEXT,
    "address" TEXT,
    "role" "Role" NOT NULL DEFAULT 'HEAD',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "departmentId" INTEGER NOT NULL,

    CONSTRAINT "Head_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Head_username_key" ON "Head"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Head_email_key" ON "Head"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Head_headId_key" ON "Head"("headId");

-- CreateIndex
CREATE UNIQUE INDEX "Head_departmentId_key" ON "Head"("departmentId");

-- AddForeignKey
ALTER TABLE "Head" ADD CONSTRAINT "Head_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;
