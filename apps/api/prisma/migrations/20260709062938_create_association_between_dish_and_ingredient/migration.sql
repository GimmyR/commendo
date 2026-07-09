/*
  Warnings:

  - You are about to drop the `_DishToIngredient` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_DishToIngredient" DROP CONSTRAINT "_DishToIngredient_A_fkey";

-- DropForeignKey
ALTER TABLE "_DishToIngredient" DROP CONSTRAINT "_DishToIngredient_B_fkey";

-- DropTable
DROP TABLE "_DishToIngredient";

-- CreateTable
CREATE TABLE "cmd_dish_ingredient" (
    "dishId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "cmd_dish_ingredient_pkey" PRIMARY KEY ("dishId","ingredientId")
);

-- AddForeignKey
ALTER TABLE "cmd_dish_ingredient" ADD CONSTRAINT "cmd_dish_ingredient_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "cmd_dish"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cmd_dish_ingredient" ADD CONSTRAINT "cmd_dish_ingredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "cmd_ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
