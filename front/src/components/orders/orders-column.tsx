import OrderItem from "@/components/orders/order-item";
import type { Order, OrderStatus } from "@/libs/actions/orders";
import { CollisionPriority } from "@dnd-kit/abstract";
import { useDroppable } from "@dnd-kit/react";
import { Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";

type Props = {
    group: string;
    status: OrderStatus;
    orders: Order[];
};

export default function OrdersColumn({ group, status, orders } : Props) {
    const { ref } = useDroppable({ 
        id: group, 
        type: "column", 
        accept: "item",
        collisionPriority: CollisionPriority.Low
    });

    const { t } = useTranslation("orders");

    return (
        <Stack direction="vertical" className="pb-2 border rounded-4">
            <h1 className={`fs-4 text-center text-bg-${status.color} rounded-top-4 py-2`}>{t(status.key)}</h1>
            <Stack ref={ref} direction="vertical" gap={3} className="px-3 py-2" style={{ minHeight: "50px" }}>
                {orders.map((order, index) => <OrderItem key={order.id} order={order} index={index} group={group}/>)}
            </Stack>
        </Stack>
    );
}