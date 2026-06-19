/*
  Warnings:

  - You are about to drop the `RoleName` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RoleName" DROP CONSTRAINT "RoleName_langId_fkey";

-- DropForeignKey
ALTER TABLE "RoleName" DROP CONSTRAINT "RoleName_roleId_fkey";

-- DropTable
DROP TABLE "RoleName";

-- CreateTable
CREATE TABLE "role_name" (
    "roleId" INTEGER NOT NULL,
    "langId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "role_name_pkey" PRIMARY KEY ("roleId","langId")
);

-- AddForeignKey
ALTER TABLE "role_name" ADD CONSTRAINT "role_name_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_name" ADD CONSTRAINT "role_name_langId_fkey" FOREIGN KEY ("langId") REFERENCES "lang"("id") ON DELETE CASCADE ON UPDATE CASCADE;
