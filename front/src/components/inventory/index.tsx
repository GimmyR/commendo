import ConfirmModal from "@/components/confirm-modal";
import IconButton from "@/components/icon-button";
import CreateMovementModal from "@/components/inventory/create-movement-modal";
import MovementsList from "@/components/inventory/list";
import type { IngredientMovement } from "@/libs/actions/inventory";
import useMovements from "@/libs/hooks/use-movements";
import { useState, type SubmitEvent } from "react";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function Inventory() {
    const { movements, create, edit, remove } = useMovements();
    const {t} = useTranslation("inventory");
    const [showCreate, setShowCreate] = useState<boolean>(false);
    const [movement, setMovement] = useState<IngredientMovement>();
    const [showDelete, setShowDelete] = useState<boolean>(false);

    const selectMovementToEdit = (mvt: IngredientMovement) => {
        setMovement(mvt);
        setShowCreate(true);
    };

    const selectMovementToRemove = (mvt: IngredientMovement) => {
        setMovement(mvt);
        setShowDelete(true);
    };

    const handleCloseRemove = () => {
        setMovement(undefined);
        setShowDelete(false);
    };

    const handleConfirmRemove = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        remove(movement);
        handleCloseRemove();
    };

    return (
        <Row className="py-5 px-lg-4">
            <Col>
                <MovementsList movements={movements} onEdit={selectMovementToEdit} onDelete={selectMovementToRemove}/>
                <IconButton icon="plus-lg" variant="success" className="position-absolute position-fixed bottom-0 end-0 mb-3 me-3" onClick={() => setShowCreate(true)}>
                    {t("movement")}
                </IconButton>
                <CreateMovementModal show={showCreate} movement={movement} onHide={() => setShowCreate(false)} create={create} edit={edit}/>
                <ConfirmModal show={showDelete} onCancel={handleCloseRemove} onConfirm={handleConfirmRemove}>
                    {t("confirm-delete")}
                </ConfirmModal>
            </Col>
        </Row>
    );
}