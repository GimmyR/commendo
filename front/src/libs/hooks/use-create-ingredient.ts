import { createIngredient, type CreateIngredient } from "@/libs/actions/ingredients";
import type { Language } from "@/libs/actions/language";
import { useEffect, useState, type ChangeEvent } from "react";

export default function useCreateIngredient(languages: Language[]) {
    const [ingredient, setIngredient] = useState<CreateIngredient>({
        unit: "",
        names: []
    });

    const changeUnit = (e: ChangeEvent<HTMLInputElement>) => {
        setIngredient({ ...ingredient, unit: e.target.value });
    };

    const changeName = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, language: string) => {
        const index = ingredient.names.findIndex(ingrName => ingrName.lang == language);
        ingredient.names[index].name = e.target.value;
        setIngredient({...ingredient});
    };

    const create = async () => {
        await createIngredient(ingredient);
    };

    const reset = () => {
        ingredient.unit = "";
        ingredient.names = languages.map(language => ({ 
            lang: language.abbrev, 
            name: "" 
        }));

        setIngredient({...ingredient});
    };

    useEffect(() => {
        reset();
    }, [languages]);

    return {ingredient, changeUnit, changeName, create, reset};
}