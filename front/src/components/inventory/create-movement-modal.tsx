import { fetchAllIngredients, type Ingredient } from "@/libs/actions/ingredients";
import type { IngredientMovement } from "@/libs/actions/inventory";
import { useLanguage } from "@/libs/hooks/use-language";
import { useEffect, useState, type ChangeEvent, type SubmitEvent } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

type Props = {
    show: boolean;
    movement?: IngredientMovement;
    onHide: () => void;
    create: (mvt: Partial<IngredientMovement>) => void;
    edit: (mvt: Partial<IngredientMovement>) => void;
};

export default function CreateMovementModal({ show, movement, onHide, create, edit } : Props) {
    const {t} = useTranslation("inventory");
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const language = useLanguage((state) => state.lang);
    const [ingredient, setIngredient] = useState<Ingredient | undefined>();
    const [type, setType] = useState<number | undefined>();
    const [quantity, setQuantity] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);

    const resetAll = () => {
        setIngredient(undefined);
        setType(undefined);
        setQuantity(0);
        setPrice(0);
        setIngredients([]);
    };

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

        if(ingredient && type && quantity && quantity > 0) {
            const mvt: Partial<IngredientMovement> = {
                ingredientId: ingredient.id,
                type,
                quantity,
                purchasePrice: price > 0 ? price : undefined
            };

            if(movement && movement.id)
                edit({
                    ...mvt,
                    id: movement.id
                });

            else create(mvt);

            onHide();
        }
    }; 

    useEffect(() => {
        if(show) {
            setIngredient(movement ? movement.ingredient : undefined);
            setType(movement ? movement.type : undefined);
            setQuantity(movement ? movement.quantity : 0);
            setPrice((movement && movement.purchasePrice) ? movement.purchasePrice : 0);

            fetchAllIngredients(language)
                .then(data => {
                    setIngredients(data);
                })
                .catch(err => console.warn(err));

        } else resetAll();
    }, [show, language]);

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton className="fw-bold">
                {t(movement ? "edit-movement" : "create-movement")}
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="ingredient">{t("ingredient")}</Form.Label>
                        {ingredients.length > 0 && <Form.Select id="ingredient" defaultValue={movement ? movement.ingredient.id : 0} onChange={handleSelectIngredient}>
                            <option value={0}>--</option>
                            {ingredients.map(ingr => <option key={ingr.id} value={ingr.id}>{ingr.names[0].name}</option>)}
                        </Form.Select>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="type">Type</Form.Label>
                        <Form.Select id="type" defaultValue={movement ? movement.type : 0} onChange={handleSelectType}>
                            <option value={0}>--</option>
                            <option value={1}>{t("in")}</option>
                            <option value={-1}>{t("out")}</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="quantity">{t("quantity")} ({t("unit")} : {ingredient ? ingredient.unit : "XXX"})</Form.Label>
                        <Form.Control type="number" id="quantity" value={quantity} onChange={handleChangeQuantity}/>
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label htmlFor="purchase-price">{t("purchase-price")} (Ar)</Form.Label>
                        <Form.Control type="number" id="purchase-price" value={price} onChange={handleChangePrice} disabled={type != 1}/>
                    </Form.Group>
                    <Form.Group className="d-flex flex-row justify-content-end">
                        <Button type="submit" variant="success" disabled={!ingredient || !type || quantity == 0}>{t("submit")}</Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    );
}