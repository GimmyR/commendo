import OrdersColumn from "@/components/orders/orders-column";
import { findOrderStatus, orderStates } from "@/libs/actions/orders";
import useOrders from "@/libs/hooks/use-orders";
import { move } from "@dnd-kit/helpers";
import { DragDropProvider, type DragOverEvent } from "@dnd-kit/react";
import { Col, Row, Spinner } from "react-bootstrap";

export default function Orders() {
    const {kanban, loading, setKanban, changeStatus} = useOrders();

    const handleDragOver = (event: DragOverEvent) => {
        setKanban((kanban) => move(kanban, event));
        const { target } = event.operation;

        if(target) {
            const orderId = target.id as number;
            const status = findOrderStatus(kanban, orderId);

            if(status)
                changeStatus(orderId, status);
        }
    };

    if(loading)
        return <Spinner className="position-absolute top-50 start-50"/>;

    return (
        <DragDropProvider onDragOver={handleDragOver}>
            <Row className="justify-content-center pt-5 px-lg-4">
                {Object.entries(kanban).map(([status, orders]) => <Col key={status} className="col-8 col-md-4 col-xxl-3 pt-4 pt-md-0">
                    <OrdersColumn group={status} status={orderStates[parseInt(status)]} orders={orders}/>
                </Col>)}
            </Row>
        </DragDropProvider>
    );
}