import type { Language } from "@/libs/actions/language";
import { useAuth } from "@/libs/hooks/use-auth";
import { cmdFetch } from "@/libs/utils/fetch";

// ================================ TYPES, INTERFACES, CLASSES =====================================

export interface IngredientName {
    ingredientId: number;
    langId: number;
    lang: Language;
    name: string;
}

export interface Ingredient {
    id: number;
    unit: string;
    active: boolean;
    names: IngredientName[];
}

export interface CreateIngredientName {
    lang: string;
    name: string;
}

export interface CreateIngredient {
    unit: string;
    names: CreateIngredientName[];
}

// ======================================== FUNCTIONS ==============================================

export async function fetchAllIngredients(language: string): Promise<Ingredient[]> {
    const params = new URLSearchParams();
    params.append("lang", language);
    return await cmdFetch(`/ingredient?${params.toString()}`);
}

export async function createIngredient(ingredient: CreateIngredient) {
    const token = useAuth.getState().token;
    
    return await cmdFetch("/ingredient", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ingredient)
    });
}

export async function removeIngredient(id: number) {
    const token = useAuth.getState().token;

    return await cmdFetch(`/ingredient/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}