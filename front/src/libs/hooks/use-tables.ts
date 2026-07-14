import { fetchAllTables, type ITable } from "@/libs/actions/tables";
import { useEffect, useState } from "react";

export default function useTables() {
    const [tables, setTables] = useState<ITable[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchAllTables()
            .then(data => {
                setTables(data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    return {tables, loading};
}