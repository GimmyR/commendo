import IconButton from "@/components/icon-button";
import AddIngredientModal from "@/components/ingredients/add-ingredient-modal";
import IngredientsList from "@/components/ingredients/list";
import useIngredients from "@/libs/hooks/use-ingredients";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";

export default function Ingredients() {
    const {ingredients} = useIngredients();
    const [showAdd, setShowAdd] = useState<boolean>(false);

    const handleShow = () => setShowAdd(true);
    const handleHide = () => setShowAdd(false);

    return (
        <Row className="justify-content-center py-5 px-lg-4">
            <Col>
                <IngredientsList ingredients={ingredients}/>
                <IconButton icon="plus-lg" variant="success" className="position-absolute position-fixed bottom-0 end-0 mb-3 me-3" onClick={handleShow}>
                    Add ingredient
                </IconButton>
                <AddIngredientModal show={showAdd} onHide={handleHide}/>
            </Col>
        </Row>
    );
}