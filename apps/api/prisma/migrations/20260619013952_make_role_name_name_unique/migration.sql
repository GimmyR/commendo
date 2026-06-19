/*
  Warnings:

  - You are about to alter the column `name` on the `role_name` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - A unique constraint covering the columns `[name]` on the table `role_name` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "role_name" ALTER COLUMN "name" SET DATA TYPE VARCHAR(30);

-- CreateIndex
CREATE UNIQUE INDEX "role_name_name_key" ON "role_name"("name");
