/*
  Warnings:

  - You are about to alter the column `name` on the `role_name` table. The data in that column could be lost. The data in that column will be cast from `VarChar(30)` to `VarChar(20)`.

*/
-- DropIndex
DROP INDEX "role_name_name_key";

-- AlterTable
ALTER TABLE "role_name" ALTER COLUMN "name" SET DATA TYPE VARCHAR(20);
