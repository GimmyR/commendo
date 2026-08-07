import OrdersColumn from "@/components/orders/orders-column";
import OtherOrdersButton from "@/components/orders/other-orders-button";
import { findOrderStatus, orderStates } from "@/libs/actions/orders";
import useCurrentOrders from "@/libs/hooks/use-current-orders";
import { move } from "@dnd-kit/helpers";
import { DragDropProvider, type DragOverEvent } from "@dnd-kit/react";
import { Row, Spinner } from "react-bootstrap";

export default function Orders() {
    const {kanban, loading, setKanban, changeStatus} = useCurrentOrders();

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
                {Object.entries(kanban).map(([status, orders]) => 
                    <OrdersColumn key={status} 
                        group={status} 
                        status={orderStates[parseInt(status)]} 
                        orders={orders}
                    />
                )}
            </Row>
            <OtherOrdersButton/>
        </DragDropProvider>
    );
}