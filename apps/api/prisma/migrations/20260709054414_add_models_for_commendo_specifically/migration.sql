/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `cmd_account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phoneNumber]` on the table `cmd_account` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "cmd_account" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "address" TEXT,
ADD COLUMN     "email" VARCHAR(254),
ADD COLUMN     "firstname" VARCHAR(30),
ADD COLUMN     "lastname" VARCHAR(20),
ADD COLUMN     "phoneNumber" VARCHAR(30);

-- AlterTable
ALTER TABLE "cmd_lang" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "cmd_role" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "cmd_dish" (
    "id" SERIAL NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "cmd_dish_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cmd_dish_name" (
    "dishId" INTEGER NOT NULL,
    "langId" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "cmd_dish_name_pkey" PRIMARY KEY ("dishId","langId")
);

-- CreateTable
CREATE TABLE "cmd_ingredient" (
    "id" SERIAL NOT NULL,
    "unit" VARCHAR(10) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "cmd_ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cmd_ingredient_name" (
    "ingredientId" INTEGER NOT NULL,
    "langId" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "cmd_ingredient_name_pkey" PRIMARY KEY ("ingredientId","langId")
);

-- CreateTable
CREATE TABLE "cmd_table" (
    "id" SERIAL NOT NULL,
    "tableRef" CHAR(2) NOT NULL,
    "availability" INTEGER NOT NULL,

    CONSTRAINT "cmd_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cmd_order" (
    "id" SERIAL NOT NULL,
    "dishId" INTEGER NOT NULL,
    "tableId" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,

    CONSTRAINT "cmd_order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cmd_ingredient_movement" (
    "id" SERIAL NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "purchasePrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "cmd_ingredient_movement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DishToIngredient" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_DishToIngredient_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "cmd_dish_name_name_key" ON "cmd_dish_name"("name");

-- CreateIndex
CREATE UNIQUE INDEX "cmd_ingredient_name_name_key" ON "cmd_ingredient_name"("name");

-- CreateIndex
CREATE UNIQUE INDEX "cmd_table_tableRef_key" ON "cmd_table"("tableRef");

-- CreateIndex
CREATE INDEX "_DishToIngredient_B_index" ON "_DishToIngredient"("B");

-- CreateIndex
CREATE UNIQUE INDEX "cmd_account_email_key" ON "cmd_account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "cmd_account_phoneNumber_key" ON "cmd_account"("phoneNumber");

-- AddForeignKey
ALTER TABLE "cmd_dish_name" ADD CONSTRAINT "cmd_dish_name_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "cmd_dish"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cmd_dish_name" ADD CONSTRAINT "cmd_dish_name_langId_fkey" FOREIGN KEY ("langId") REFERENCES "cmd_lang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cmd_ingredient_name" ADD CONSTRAINT "cmd_ingredient_name_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "cmd_ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cmd_ingredient_name" ADD CONSTRAINT "cmd_ingredient_name_langId_fkey" FOREIGN KEY ("langId") REFERENCES "cmd_lang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cmd_order" ADD CONSTRAINT "cmd_order_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "cmd_dish"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cmd_order" ADD CONSTRAINT "cmd_order_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "cmd_table"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cmd_ingredient_movement" ADD CONSTRAINT "cmd_ingredient_movement_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "cmd_ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DishToIngredient" ADD CONSTRAINT "_DishToIngredient_A_fkey" FOREIGN KEY ("A") REFERENCES "cmd_dish"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DishToIngredient" ADD CONSTRAINT "_DishToIngredient_B_fkey" FOREIGN KEY ("B") REFERENCES "cmd_ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
