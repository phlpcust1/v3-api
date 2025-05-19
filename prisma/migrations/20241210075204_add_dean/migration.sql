-- CreateTable
CREATE TABLE "Dean" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "deanId" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'DEAN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "departmentId" INTEGER NOT NULL,

    CONSTRAINT "Dean_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dean_username_key" ON "Dean"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Dean_email_key" ON "Dean"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Dean_deanId_key" ON "Dean"("deanId");

-- CreateIndex
CREATE UNIQUE INDEX "Dean_departmentId_key" ON "Dean"("departmentId");

-- AddForeignKey
ALTER TABLE "Dean" ADD CONSTRAINT "Dean_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
