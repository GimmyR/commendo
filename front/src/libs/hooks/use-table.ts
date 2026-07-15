import type { DishWithIngredients } from "@/libs/actions/dishes";
import { createOrder, removeOrder, type Order } from "@/libs/actions/orders";
import { fetchUniqueTableByIdWithOrders, partiallyEditTable, type TableWithOrders } from "@/libs/actions/tables";
import { useLanguage } from "@/libs/hooks/use-language";
import { useEffect, useState } from "react";

export default function useTable(id: number) {
    const [table, setTable] = useState<TableWithOrders>();
    const [loading, setLoading] = useState<boolean>(true);
    const language = useLanguage((state) => state.lang);

    const bookTable = async () => {
        if(table) {
            const newTable = await partiallyEditTable(table.id, {
                availability: 2
            });

            if(newTable)
                setTable({...table, availability: newTable.availability});
        }
    };

    const freeTable = async () => {
        if(table) {
            // Archiver les commandes ici
            const newTable = await partiallyEditTable(table.id, {
                availability: 1
            });

            if(newTable)
                setTable({...table, availability: newTable.availability});
        }
    };

    const addOrder = async (dish: DishWithIngredients) => {
        if(table) {
            const order = await createOrder({ 
                tableId: table.id, 
                dishId: dish.id
            });

            table.orders.push({...order, dish});
            setTable({...table});
        }
    };

    const deleteOrder = async (order: Order) => {
        if(table) {
            const deleted = await removeOrder(order.id);
            const index = table.orders.findIndex(order => order.id == deleted.id);
            table.orders.splice(index, 1);
            setTable({...table});
        }
    };

    useEffect(() => {
        fetchUniqueTableByIdWithOrders(id)
            .then(data => {
                setTable(data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, [language]);
    
    return {table, loading, bookTable, freeTable, addOrder, deleteOrder};
}