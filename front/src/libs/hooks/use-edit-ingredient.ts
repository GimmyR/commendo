import { editIngredient, fetchUniqueIngredient, type Ingredient } from "@/libs/actions/ingredients";
import { useEffect, useState, type ChangeEvent, type SubmitEvent } from "react";

export default function useEditIngredient(id?: number) {
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
        if(toEdit)
            await editIngredient(toEdit);
    };

    const toggleStatus = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(toToggleStatus) {
            await editIngredient({
                id: toToggleStatus.id,
                active: !toToggleStatus.active
            });
            
            setToToggleStatus(undefined);
        }
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