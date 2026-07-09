/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `cmd_role` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `cmd_role` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cmd_role" ADD COLUMN     "type" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "cmd_role_type_key" ON "cmd_role"("type");
