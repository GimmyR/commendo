import { cmdFetch } from "@/libs/utils/fetch";

// ================================ TYPES, INTERFACES, CLASSES =====================================

export interface FilterDish {
    name: string | undefined;
    minPrice: number | undefined;
    maxPrice: number | undefined;
}

export interface DishNameDTO {
    langId: number;
    name: string;
}

export interface IngredientNameDTO {
    langId: number;
    name: string;
}

export interface IngredientDTO {
    id: number;
    unit: string;
    active: boolean;
    names: IngredientNameDTO[];
}

export interface DishIngredientDTO {
    ingredient: IngredientDTO;
    quantity: number;
}

export interface Dish {
    id: number;
    price: number;
    names: DishNameDTO[];
    active: boolean;
}

export interface DishWithIngredients extends Dish {
    ingredients: DishIngredientDTO[];
}

// ========================================= FUNCTIONS ==============================================

export async function fetchAllDishesWithIngredients(language: string, page: number, limit: number, filter: FilterDish) {
    const params = new URLSearchParams();
    params.append("lang", language);
    params.append("page", page.toString());
    params.append("limit", limit.toString());

    const filters: string[] = [];

    if(filter.name) filters.push(`name:contains:${filter.name}`);
    if(filter.minPrice) filters.push(`price:gte:${filter.minPrice}`);
    if(filter.maxPrice) filters.push(`price:lte:${filter.maxPrice}`);

    params.append("filter", filters.join(";"));

    return await cmdFetch(`/dish?${params.toString()}`);
}