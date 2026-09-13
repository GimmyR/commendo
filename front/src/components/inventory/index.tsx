import IconButton from "@/components/icon-button";
import CreateMovementModal from "@/components/inventory/create-movement-modal";
import MovementsList from "@/components/inventory/list";
import type { IngredientMovement } from "@/libs/actions/inventory";
import useMovements from "@/libs/hooks/use-movements";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function Inventory() {
    const { movements, create, edit } = useMovements();
    const {t} = useTranslation("inventory");
    const [showCreate, setShowCreate] = useState<boolean>(false);
    const [movement, setMovement] = useState<IngredientMovement>();

    const selectMovement = (mvt: IngredientMovement) => {
        setMovement(mvt);
        setShowCreate(true);
    };

    return (
        <Row className="py-5 px-lg-4">
            <Col>
                <MovementsList movements={movements} onEdit={selectMovement}/>
                <IconButton icon="plus-lg" variant="success" className="position-absolute position-fixed bottom-0 end-0 mb-3 me-3" onClick={() => setShowCreate(true)}>
                    {t("movement")}
                </IconButton>
                <CreateMovementModal show={showCreate} movement={movement} onHide={() => setShowCreate(false)} create={create} edit={edit}/>
            </Col>
        </Row>
    );
}