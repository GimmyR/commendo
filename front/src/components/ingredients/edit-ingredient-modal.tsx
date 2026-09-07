import IngredientNameInput from "@/components/ingredients/ingredient-name-input";
import type { Ingredient } from "@/libs/actions/ingredients";
import useEditIngredient from "@/libs/hooks/use-edit-ingredient";
import useLanguages from "@/libs/hooks/use-languages";
import { type SubmitEvent } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

type Props = {
    show: boolean;
    onHide: () => void;
    ingredientId?: number;
    ingredients: Ingredient[];
};

export default function EditIngredientModal({ show, onHide, ingredientId, ingredients } : Props) {
    const {t} = useTranslation("ingredients");
    const { languages } = useLanguages();
    const { toEdit, changeUnit, changeName, edit, reset } = useEditIngredient(ingredientId);

    const findLanguage = (langAbbrev: string) => {
        const lang = languages.find(language => language.abbrev == langAbbrev);

        if(lang)
            return `${lang.name} (${lang.abbrev})`;

        return "";
    };

    const handleClose = () => {
        onHide();
        reset();
    };

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const ingredient: Ingredient | undefined = await edit();

        if(ingredient) {
            const index = ingredients.findIndex(ingr => ingr.id == ingredient.id);

            if(index >= 0) {
                ingredients[index] = ingredient;
            }
        }

        onHide();
        reset();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <strong>{t("edit-ingredient")}</strong>
            </Modal.Header>
            <Modal.Body>
                {toEdit ? (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>{t("unit")}</Form.Label>
                            <Form.Control type="text" placeholder="g" value={toEdit.unit} onChange={changeUnit}/>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>{t("names")}</Form.Label>
                            {toEdit.names.map(ingrName => <IngredientNameInput key={ingrName.lang.id} value={ingrName.name} language={findLanguage(ingrName.lang.abbrev)} onChange={(e) => changeName(e, ingrName.lang.abbrev)}/>)}
                        </Form.Group>
                        <Form.Group className="d-flex flex-row justify-content-end">
                            <Button type="submit" variant="success">{t("submit")}</Button>
                        </Form.Group>
                    </Form>
                ) : (
                    null
                )}
            </Modal.Body>
        </Modal>
    );
}