import type { Order } from "@/libs/actions/orders";

type Props = {
    orders: Order[];
};

export default function OrdersTotal({ orders } : Props) {
    if(orders.length == 0)
        return null;
    
    return (
        <div className="border border-3 px-3 py-1">
            <strong className="fs-5 me-2">TOTAL :</strong>
            <span className="fs-5">0 Ar</span>
        </div>
    );
}