/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `lang` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "lang_name_key" ON "lang"("name");
