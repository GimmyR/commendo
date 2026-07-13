import { fetchAllDishesWithIngredients, type FilterDish } from "@/libs/actions/dish";
import { useLanguage } from "@/libs/hooks/use-language";
import type { DishWithIngredients } from "@repo/shared";
import { useEffect, useState } from "react";

export default function useDishes() {
    const [loadingDishes, setLoadingDishes] = useState<boolean>(true);
    const [dishes, setDishes] = useState<DishWithIngredients[]>([]);
    const [pages, setPages] = useState<number>(1);
    const [currPage, setCurrPage] = useState<number>(1);
    const limit = 8;
    const language = useLanguage((state) => state.lang);
    const [filter, setFilter] = useState<FilterDish>({
        name: undefined,
        minPrice: undefined,
        maxPrice: undefined
    });
    
    useEffect(() => {
        fetchAllDishesWithIngredients(language, currPage, limit, filter)
            .then(dishes => {
                setDishes(dishes.data);
                setPages(dishes.pages);
                setLoadingDishes(false);
            })
            .catch(err => console.error(err));
    }, [language, currPage, filter]);

    return {dishes, pages, currPage, loadingDishes, filter, setCurrPage, setFilter};
}