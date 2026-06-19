/*
  Warnings:

  - You are about to drop the `_AccountToRole` table. If the table is not empty, all the data it contains will be lost.
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
DROP TABLE "_AccountToRole";

-- DropTable
DROP TABLE "role";

-- DropTable
DROP TABLE "role_name";
