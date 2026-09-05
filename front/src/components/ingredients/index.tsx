import ConfirmModal from "@/components/confirm-modal";
import IconButton from "@/components/icon-button";
import AddIngredientModal from "@/components/ingredients/add-ingredient-modal";
import IngredientsList from "@/components/ingredients/list";
import useEditIngredient from "@/libs/hooks/use-edit-ingredient";
import useIngredients from "@/libs/hooks/use-ingredients";
import useRemoveIngredient from "@/libs/hooks/use-remove-ingredient";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";

export default function Ingredients() {
    const {ingredients} = useIngredients();
    const [showAdd, setShowAdd] = useState<boolean>(false);
    const {toDelete, setToDelete, remove} = useRemoveIngredient();
    const {toToggleStatus, setToToggleStatus, toggleStatus} = useEditIngredient();

    const handleShow = () => setShowAdd(true);
    const handleHide = () => setShowAdd(false);

    return (
        <Row className="justify-content-center py-5 px-lg-4">
            <Col>
                <IngredientsList ingredients={ingredients} selectToDelete={setToDelete} selectToToggleStatus={setToToggleStatus}/>
                <IconButton icon="plus-lg" variant="success" className="position-absolute position-fixed bottom-0 end-0 mb-3 me-3" onClick={handleShow}>
                    Add ingredient
                </IconButton>
                <AddIngredientModal show={showAdd} onHide={handleHide}/>
                <ConfirmModal show={toDelete != undefined} onCancel={() => setToDelete(undefined)} onConfirm={remove}>
                    Do you want to remove this ingredient ?
                </ConfirmModal>
                <ConfirmModal show={toToggleStatus != undefined} onCancel={() => setToToggleStatus(undefined)} onConfirm={toggleStatus}>
                    Do you want to change the status of this ingredient ?
                </ConfirmModal>
            </Col>
        </Row>
    );
}