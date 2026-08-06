import { fetchAllOrders, partiallyEditOrder, type Kanban } from "@/libs/actions/orders";
import { useLanguage } from "@/libs/hooks/use-language";
import { useEffect, useState } from "react";

export default function useOrders() {
    const [kanban, setKanban] = useState<Kanban>({});
    const [loading, setLoading] = useState<boolean>(true);
    const language = useLanguage((state) => state.lang);

    const changeStatus = async (orderId: number, status: number) => {
        await partiallyEditOrder(orderId, { status });
    };

    useEffect(() => {
        fetchAllOrders()
            .then(data => {
                setKanban({
                    "1": data.filter(order => order.status == 1),
                    "2": data.filter(order => order.status == 2),
                    "3": data.filter(order => order.status == 3)
                });
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, [language]);
    
    return {kanban, loading, setKanban, changeStatus};
}