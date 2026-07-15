import { fetchUniqueTableByIdWithOrders, type TableWithOrders } from "@/libs/actions/tables";
import { useLanguage } from "@/libs/hooks/use-language";
import { useEffect, useState } from "react";

export default function useTable(id: number) {
    const [table, setTable] = useState<TableWithOrders>();
    const [loading, setLoading] = useState<boolean>(true);
    const language = useLanguage((state) => state.lang);

    useEffect(() => {
        fetchUniqueTableByIdWithOrders(id)
            .then(data => {
                setTable(data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, [language]);
    
    return {table, loading};
}