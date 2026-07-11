import { cmdFetch } from "@/libs/utils/fetch";

export async function fetchAllDishesWithIngredients(language: string, page: number, limit: number) {
    const params = new URLSearchParams();
    params.append("lang", language);
    params.append("page", page.toString());
    params.append("limit", limit.toString());

    return await cmdFetch(`/dish?${params.toString()}`);
}