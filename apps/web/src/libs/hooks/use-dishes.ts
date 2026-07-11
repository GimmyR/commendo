import { fetchAllDishesWithIngredients } from "@/libs/actions/dish";
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
    
    useEffect(() => {
        fetchAllDishesWithIngredients(language, currPage, limit)
            .then(dishes => {
                setDishes(dishes.data);
                setPages(dishes.pages);
                setLoadingDishes(false);
            })
            .catch(err => console.error(err));
    }, [language, currPage]);

    return {dishes, pages, currPage, loadingDishes, setCurrPage};
}