// ================================ TYPES, INTERFACES, CLASSES =====================================

import { useAuth } from "@/libs/hooks/use-auth";
import { cmdFetch } from "@/libs/utils/fetch";

export interface ITable {
    id: number;
    tableRef: string;
    availability: number;
}

// ========================================= FUNCTIONS ==============================================

export async function fetchAllTables(): Promise<ITable[]> {
    const token = useAuth.getState().token;

    return await cmdFetch("/table", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}