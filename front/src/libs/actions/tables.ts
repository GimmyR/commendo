import type { Order } from "@/libs/actions/orders";
import { useAuth } from "@/libs/hooks/use-auth";
import { useLanguage } from "@/libs/hooks/use-language";
import { cmdFetch } from "@/libs/utils/fetch";

// ================================ TYPES, INTERFACES, CLASSES =====================================

export interface ITable {
    id: number;
    tableRef: string;
    availability: number;
}

export interface TableWithOrders extends ITable {
    orders: Order[];
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

export async function fetchUniqueTableByIdWithOrders(id: number) {
    const token = useAuth.getState().token;
    const lang = useLanguage.getState().lang;

    return await cmdFetch(`/table/${id}?lang=${lang}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}