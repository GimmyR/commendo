import IngredientNameInput from "@/components/ingredients/ingredient-name-input";
import type { Ingredient } from "@/libs/actions/ingredients";
import useCreateIngredient from "@/libs/hooks/use-create-ingredient";
import useLanguages from "@/libs/hooks/use-languages";
import { type SubmitEvent } from "react";
import { Button, Form, Modal } from "react-bootstrap";

type Props = {
    show: boolean;
    onHide: () => void;
    ingredients: Ingredient[];
};

export default function AddIngredientModal({ show, onHide, ingredients } : Props) {
    const { languages } = useLanguages();
    const { ingredient, changeUnit, changeName, create, reset } = useCreateIngredient(languages);

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
        const ingredient: Ingredient = await create();
        ingredients.push(ingredient);
        onHide();
        reset();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <strong>Add ingredient</strong>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Unit</Form.Label>
                        <Form.Control type="text" placeholder="g" value={ingredient.unit} onChange={changeUnit}/>
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label>Names</Form.Label>
                        {ingredient.names.map(ingrName => <IngredientNameInput key={ingrName.lang} value={ingrName.name} language={findLanguage(ingrName.lang)} onChange={(e) => changeName(e, ingrName.lang)}/>)}
                    </Form.Group>
                    <Form.Group className="d-flex flex-row justify-content-end">
                        <Button type="submit" variant="success">Submit</Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    );
}