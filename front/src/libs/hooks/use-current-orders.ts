import { fetchAllCurrentOrders, findOrderStatus, partiallyEditOrder, type Kanban } from "@/libs/actions/orders";
import { useLanguage } from "@/libs/hooks/use-language";
import type { DragOverEvent } from "@dnd-kit/react";
import { useEffect, useState } from "react";

export default function useCurrentOrders() {
    const [kanban, setKanban] = useState<Kanban>({});
    const [loading, setLoading] = useState<boolean>(true);
    const language = useLanguage((state) => state.lang);

    const changeStatus = async (event: DragOverEvent) => {
        const { target } = event.operation;

        if(target) {
            const orderId = target.id as number;
            const status = findOrderStatus(kanban, orderId);

            if(status)
                await partiallyEditOrder(orderId, { status });
        }
    };

    useEffect(() => {
        fetchAllCurrentOrders(language)
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