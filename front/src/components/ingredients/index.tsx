import ConfirmModal from "@/components/confirm-modal";
import IconButton from "@/components/icon-button";
import AddIngredientModal from "@/components/ingredients/add-ingredient-modal";
import IngredientsList from "@/components/ingredients/list";
import useAddIngredient from "@/libs/hooks/use-add-ingredient";
import useEditIngredient from "@/libs/hooks/use-edit-ingredient";
import useIngredients from "@/libs/hooks/use-ingredients";
import useRemoveIngredient from "@/libs/hooks/use-remove-ingredient";
import { Col, Row } from "react-bootstrap";

export default function Ingredients() {
    const {ingredients} = useIngredients();
    const {showAdd, displayAdd, hideAdd} = useAddIngredient();
    const {toDelete, setToDelete, remove} = useRemoveIngredient();
    const {toToggleStatus, setToToggleStatus, toggleStatus} = useEditIngredient();

    return (
        <Row className="justify-content-center py-5 px-lg-4">
            <Col>
                <IngredientsList ingredients={ingredients} selectToDelete={setToDelete} selectToToggleStatus={setToToggleStatus}/>
                <IconButton icon="plus-lg" variant="success" className="position-absolute position-fixed bottom-0 end-0 mb-3 me-3" onClick={displayAdd}>
                    Add ingredient
                </IconButton>
                <AddIngredientModal show={showAdd} onHide={hideAdd}/>
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