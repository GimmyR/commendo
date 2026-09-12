import IconButton from "@/components/icon-button";
import MovementsList from "@/components/inventory/list";
import useMovements from "@/libs/hooks/use-movements";
import { Col, Row } from "react-bootstrap";

export default function Inventory() {
    const { movements } = useMovements();

    return (
        <Row className="py-5 px-lg-4">
            <Col>
                <MovementsList movements={movements}/>
                <IconButton icon="plus-lg" variant="success" className="position-absolute position-fixed bottom-0 end-0 mb-3 me-3">
                    Movement
                </IconButton>
            </Col>
        </Row>
    );
}