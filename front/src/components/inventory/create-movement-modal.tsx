import { fetchAllIngredients, type Ingredient } from "@/libs/actions/ingredients";
import type { IngredientMovement } from "@/libs/actions/inventory";
import { useLanguage } from "@/libs/hooks/use-language";
import { useEffect, useState, type ChangeEvent, type SubmitEvent } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

type Props = {
    show: boolean;
    onHide: () => void;
    create: (mvt: Partial<IngredientMovement>) => void;
};

export default function CreateMovementModal({ show, onHide, create } : Props) {
    const {t} = useTranslation("inventory");
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const language = useLanguage((state) => state.lang);
    const [ingredient, setIngredient] = useState<Ingredient>();
    const [type, setType] = useState<number>();
    const [quantity, setQuantity] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);

    const handleSelectIngredient = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(e.target.value);

        if(!isNaN(value)) {
            const selected = ingredients.find(ingr => ingr.id === value);
            setIngredient(selected);
        }
    };

    const handleSelectType = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(e.target.value);

        if(!isNaN(value)) {
            if(value == 0)
                setType(undefined);

            setType(value);
        }
    };

    const handleChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);

        if(!isNaN(value) && value > 0)
            setQuantity(value);

        else setQuantity(0);
    };

    const handleChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);

        if(!isNaN(value) && value > 0)
            setPrice(value);

        else setPrice(0);
    };

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(ingredient && type && quantity > 0) {
            create({
                ingredientId: ingredient.id,
                type,
                quantity,
                purchasePrice: price
            });

            onHide();
        }
    }; 

    useEffect(() => {
        if(show)
            fetchAllIngredients(language)
                .then(data => {
                    setIngredients(data);
                })
                .catch(err => console.warn(err));

        else setIngredients([]);
    }, [show, language]);

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton className="fw-bold">
                {t("create-movement")}
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>{t("ingredient")}</Form.Label>
                        <Form.Select onChange={handleSelectIngredient}>
                            <option value={0}>--</option>
                            {ingredients.map(ingredient => <option key={ingredient.id} value={ingredient.id}>{ingredient.names[0].name}</option>)}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Type</Form.Label>
                        <Form.Select onChange={handleSelectType}>
                            <option value={0}>--</option>
                            <option value={1}>{t("in")}</option>
                            <option value={-1}>{t("out")}</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{t("quantity")} ({t("unit")} : {ingredient ? ingredient.unit : "XXX"})</Form.Label>
                        <Form.Control type="number" value={quantity} onChange={handleChangeQuantity}/>
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label>{t("purchase-price")} (Ar)</Form.Label>
                        <Form.Control type="number" value={price} onChange={handleChangePrice} disabled={type != 1}/>
                    </Form.Group>
                    <Form.Group className="d-flex flex-row justify-content-end">
                        <Button type="submit" variant="success" disabled={!ingredient || !type || quantity == 0}>{t("submit")}</Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    );
}