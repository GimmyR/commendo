import type { Language } from "@/libs/actions/language";
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

// ======================================== FUNCTIONS ==============================================

export async function fetchAllIngredients(language: string): Promise<Ingredient[]> {
    const params = new URLSearchParams();
    params.append("lang", language);
    return await cmdFetch(`/ingredient?${params.toString()}`);
}