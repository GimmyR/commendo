import OrdersColumn from "@/components/orders/orders-column";
import OtherOrdersButton from "@/components/orders/other-orders-button";
import { orderStates } from "@/libs/actions/orders";
import useCurrentOrders from "@/libs/hooks/use-current-orders";
import { move } from "@dnd-kit/helpers";
import { DragDropProvider, type DragOverEvent } from "@dnd-kit/react";
import { useState } from "react";
import { Row, Spinner } from "react-bootstrap";

export default function Orders() {
    const {kanban, loading, setKanban, changeStatus} = useCurrentOrders();
    const [target, setTarget] = useState<string>();

    const handleDragOver = (event: DragOverEvent) => {
        const e = (event as any);

        if(e.operation.target) {
            const group = e.operation.target.group;
            setTarget(group);
        }

        setKanban((kanban) => move(kanban, event));
        changeStatus(event);
    };

    const handleDragEnd = () => {
        setTarget(undefined);
    };

    if(loading)
        return <Spinner className="position-absolute top-50 start-50"/>;

    return (
        <DragDropProvider onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
            <Row className="justify-content-center pt-5 px-lg-4">
                {Object.entries(kanban).map(([status, orders]) => 
                    <OrdersColumn key={status} 
                        group={status} 
                        status={orderStates[parseInt(status)]} 
                        orders={orders}
                        target={target}
                    />
                )}
            </Row>
            <OtherOrdersButton/>
        </DragDropProvider>
    );
}