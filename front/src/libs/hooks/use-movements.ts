import { fetchAllMovements, type IngredientMovement } from "@/libs/actions/inventory";
import { useLanguage } from "@/libs/hooks/use-language";
import { useEffect, useState } from "react";

export default function useMovements() {
    const language = useLanguage((state) => state.lang);
    const [movements, setMovements] = useState<IngredientMovement[]>([]);

    useEffect(() => {
        fetchAllMovements(language)
            .then(data => {
                setMovements(data);
            })
            .catch(err => console.warn(err));
    }, [language]);
    
    return {movements};
}