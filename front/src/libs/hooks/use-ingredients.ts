import { fetchAllIngredients, type Ingredient } from "@/libs/actions/ingredients";
import { useLanguage } from "@/libs/hooks/use-language";
import { useEffect, useState } from "react";

export default function useIngredients() {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const language = useLanguage((state) => state.lang);

    useEffect(() => {
        fetchAllIngredients(language)
            .then((data) => {
                setIngredients(data);
            })
            .catch(err => console.warn(err));
    }, [language]);

    return {ingredients};
}