import { fetchAllOrders, partiallyEditOrder, type OrderWithTableAndDish } from "@/libs/actions/orders";
import { useLanguage } from "@/libs/hooks/use-language";
import { useEffect, useState } from "react";

export default function useOrders() {
    const [orders, setOrders] = useState<OrderWithTableAndDish[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const language = useLanguage((state) => state.lang);

    const changeStatus = async (orderId: number, status: number) => {
        const order = await partiallyEditOrder(orderId, { status });
        const index = orders.findIndex(ord => ord.id == order.id);
        orders[index].status = status;
        setOrders([...orders]);
    };

    useEffect(() => {
        fetchAllOrders()
            .then(data => {
                setOrders(data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, [language]);
    
    return {orders, loading, changeStatus};
}