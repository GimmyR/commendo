/*
  Warnings:

  - You are about to drop the `account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lang` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `role_name` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AccountToRole" DROP CONSTRAINT "_AccountToRole_A_fkey";

-- DropForeignKey
ALTER TABLE "_AccountToRole" DROP CONSTRAINT "_AccountToRole_B_fkey";

-- DropForeignKey
ALTER TABLE "role_name" DROP CONSTRAINT "role_name_langId_fkey";

-- DropForeignKey
ALTER TABLE "role_name" DROP CONSTRAINT "role_name_roleId_fkey";

-- DropTable
DROP TABLE "account";

-- DropTable
DROP TABLE "lang";

-- DropTable
DROP TABLE "role";

-- DropTable
DROP TABLE "role_name";

-- CreateTable
CREATE TABLE "cmd_lang" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "abbrev" VARCHAR(10) NOT NULL,

    CONSTRAINT "cmd_lang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cmd_role" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "cmd_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cmd_role_name" (
    "roleId" INTEGER NOT NULL,
    "langId" INTEGER NOT NULL,
    "name" VARCHAR(20) NOT NULL,

    CONSTRAINT "cmd_role_name_pkey" PRIMARY KEY ("roleId","langId")
);

-- CreateTable
CREATE TABLE "cmd_account" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" CHAR(60) NOT NULL,

    CONSTRAINT "cmd_account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cmd_lang_name_key" ON "cmd_lang"("name");

-- CreateIndex
CREATE UNIQUE INDEX "cmd_lang_abbrev_key" ON "cmd_lang"("abbrev");

-- CreateIndex
CREATE UNIQUE INDEX "cmd_account_username_key" ON "cmd_account"("username");

-- AddForeignKey
ALTER TABLE "cmd_role_name" ADD CONSTRAINT "cmd_role_name_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "cmd_role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cmd_role_name" ADD CONSTRAINT "cmd_role_name_langId_fkey" FOREIGN KEY ("langId") REFERENCES "cmd_lang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToRole" ADD CONSTRAINT "_AccountToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "cmd_account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToRole" ADD CONSTRAINT "_AccountToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "cmd_role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
