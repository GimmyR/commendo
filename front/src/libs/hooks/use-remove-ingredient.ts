import { removeIngredient, type Ingredient } from "@/libs/actions/ingredients";
import { useState, type SubmitEvent } from "react";

export default function useRemoveIngredient() {
    const [toDelete, setToDelete] = useState<Ingredient>();

    const remove = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(toDelete) {
            await removeIngredient(toDelete.id);
            setToDelete(undefined);
        }
    };

    return {toDelete, setToDelete, remove};
}