import { removeIngredient, type Ingredient } from "@/libs/actions/ingredients";
import { useState } from "react";

export default function useRemoveIngredient() {
    const [toDelete, setToDelete] = useState<Ingredient>();

    const remove = async () => {
        if(toDelete) {
            const ingredient: Ingredient = await removeIngredient(toDelete.id);
            setToDelete(undefined);
            return ingredient;
        }

        return undefined;
    };

    return {toDelete, setToDelete, remove};
}