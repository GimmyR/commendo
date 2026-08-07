import type { OrderWithTableAndDish } from "@/libs/actions/orders";
import { useSortable } from "@dnd-kit/react/sortable";
import { Button } from "react-bootstrap";
import "./index.css";

type Props = {
    order: OrderWithTableAndDish;
    index: number;
    group: string;
};

export default function OrderItem({ order, index, group } : Props) {
    const { ref, isDragging } = useSortable({ 
        id: order.id, 
        index,
        type: "item",
        accept: "item",
        group
    });

    return (
        <Button ref={ref} variant="outline-secondary" className="d-flex flex-row align-items-center" data-dragging={isDragging}>
            <div className="col-1 d-flex flex-row justify-content-start">
                <span className="text-dark order-table-ref">{order.table.tableRef}</span>
            </div>
            <div className="col-11">
                <span className="me-4">{order.dish.names[0].name}</span>
            </div>
        </Button>
    );
}