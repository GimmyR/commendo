import type { IngredientName } from "@/libs/actions/ingredients";
import { createMovement, editMovement, fetchAllMovements, type IngredientMovement } from "@/libs/actions/inventory";
import { useLanguage } from "@/libs/hooks/use-language";
import { useEffect, useState } from "react";

export default function useMovements() {
    const language = useLanguage((state) => state.lang);
    const [movements, setMovements] = useState<IngredientMovement[]>([]);

    const create = (movement: Partial<IngredientMovement>) => {
        createMovement(movement)
            .then((newMovement: IngredientMovement) => {
                const ingrName: IngredientName | undefined = newMovement.ingredient.names.find(name => name.lang.abbrev == language);

                if(ingrName) {
                    movements.push({
                        ...newMovement,
                        ingredient: {
                            ...newMovement.ingredient,
                            names: [ingrName]
                        }
                    });

                    setMovements([...movements]);
                }
            })
            .catch(err => console.warn(err));
    };

    const edit = (movement: Partial<IngredientMovement>) => {
        editMovement(movement)
            .then((newMovement: IngredientMovement) => {
                const ingrName: IngredientName | undefined = newMovement.ingredient.names.find(name => name.lang.abbrev == language);

                if(ingrName) {
                    const edited: IngredientMovement = {
                        ...newMovement,
                        ingredient: {
                            ...newMovement.ingredient,
                            names: [ingrName]
                        }
                    };

                    const index = movements.findIndex(mvt => mvt.id == edited.id);

                    if(index >= 0) {
                        movements[index] = edited;
                        setMovements([...movements]);
                    }
                }
            })
            .catch(err => console.warn(err));
    };

    useEffect(() => {
        fetchAllMovements(language)
            .then(data => {
                setMovements(data);
            })
            .catch(err => console.warn(err));
    }, [language]);
    
    return {movements, create, edit};
}