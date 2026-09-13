import { type Ingredient } from "@/libs/actions/ingredients";
import { useAuth } from "@/libs/hooks/use-auth";
import { cmdFetch } from "@/libs/utils/fetch";

// ================================ TYPES, INTERFACES, CLASSES =====================================

export interface IngredientMovement {
    id: number;
    ingredientId: number;
    ingredient: Ingredient;
    type: number;
    quantity: number;
    purchasePrice: number;
}

// ======================================== FUNCTIONS ==============================================

export async function fetchAllMovements(language: string) {
    const token = useAuth.getState().token;

    return await cmdFetch(`/inventory?lang=${language}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export async function createMovement(movement: Partial<IngredientMovement>) {
    const token = useAuth.getState().token;

    return await cmdFetch(`/inventory`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(movement)
    });
}