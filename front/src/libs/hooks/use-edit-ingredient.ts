import { editIngredient, fetchUniqueIngredient, type Ingredient } from "@/libs/actions/ingredients";
import { useLanguage } from "@/libs/hooks/use-language";
import { useEffect, useState, type ChangeEvent } from "react";

export default function useEditIngredient(id?: number) {
    const language = useLanguage((state) => state.lang);
    const [toEdit, setToEdit] = useState<Ingredient>();
    const [toToggleStatus, setToToggleStatus] = useState<Ingredient>();
    
    const changeUnit = (e: ChangeEvent<HTMLInputElement>) => {
        if(toEdit)
            setToEdit({ ...toEdit, unit: e.target.value });
    };

    const changeName = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, language: string) => {
        if(toEdit) {
            const index = toEdit.names.findIndex(ingrName => ingrName.lang.abbrev == language);
            toEdit.names[index].name = e.target.value;
            setToEdit({...toEdit});
        }
    };

    const reset = () => setToEdit(undefined);

    const edit = async () => {
        if(toEdit) {
            const ingredient: Ingredient = await editIngredient(toEdit);
            const ingr: Ingredient = {
                ...ingredient,
                names: ingredient.names.filter(name => name.lang.abbrev == language)
            };

            return ingr;
        }

        return undefined;
    };

    const toggleStatus = async () => {
        if(toToggleStatus) {
            const ingredient: Ingredient = await editIngredient({
                id: toToggleStatus.id,
                active: !toToggleStatus.active
            });

            const ingr: Ingredient = {
                ...ingredient,
                names: ingredient.names.filter(name => name.lang.abbrev == language)
            };
            
            setToToggleStatus(undefined);
            return ingr;
        }

        return undefined;
    };

    useEffect(() => {
        if(id) {
            fetchUniqueIngredient(id)
                .then(data => {
                    setToEdit(data);
                })
                .catch(err => console.warn(err));
        }
    }, [id]);

    return {toEdit, changeUnit, changeName, edit, reset, toToggleStatus, setToToggleStatus, toggleStatus};
}