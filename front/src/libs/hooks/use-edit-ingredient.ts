import { editIngredient, type Ingredient } from "@/libs/actions/ingredients";
import { useState, type SubmitEvent } from "react";

export default function useEditIngredient() {
    const [toToggleStatus, setToToggleStatus] = useState<Ingredient>();

    const toggleStatus = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(toToggleStatus) {
            await editIngredient({
                id: toToggleStatus.id,
                active: !toToggleStatus.active
            });
            
            setToToggleStatus(undefined);
        }
    };

    return {toToggleStatus, setToToggleStatus, toggleStatus};
}