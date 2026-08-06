import type { Order } from "@/libs/actions/orders";
import { useSortable } from "@dnd-kit/react/sortable";
import { Button } from "react-bootstrap";

type Props = {
    order: Order;
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
        <Button ref={ref} variant="outline-dark" data-dragging={isDragging}>{order.dish.names[0].name}</Button>
    );
}