import { fetchAllDishesWithIngredients, type DishWithIngredients, type FilterDish } from "@/libs/actions/dishes";
import { useLanguage } from "@/libs/hooks/use-language";
import { useEffect, useState } from "react";

export default function useDishes(page?: number, limit?: number) {
    const [loadingDishes, setLoadingDishes] = useState<boolean>(true);
    const [dishes, setDishes] = useState<DishWithIngredients[]>([]);
    const [pages, setPages] = useState<number>(1);
    const [currPage, setCurrPage] = useState<number | undefined>(page);
    const language = useLanguage((state) => state.lang);
    const [filter, setFilter] = useState<FilterDish>({
        name: undefined,
        minPrice: undefined,
        maxPrice: undefined
    });
    
    useEffect(() => {
        fetchAllDishesWithIngredients(language, filter, currPage, limit)
            .then(dishes => {
                setDishes(dishes.data);
                setPages(dishes.pages);
                setLoadingDishes(false);
            })
            .catch(err => console.error(err));
    }, [language, currPage, filter]);

    return {dishes, pages, currPage, loadingDishes, filter, setCurrPage, setFilter};
}