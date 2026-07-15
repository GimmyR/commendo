import type { DishWithIngredients } from "@/libs/actions/dishes";
import { useAuth } from "@/libs/hooks/use-auth";
import { cmdFetch } from "@/libs/utils/fetch";

// ================================ TYPES, INTERFACES, CLASSES =====================================

export interface Order {
    id: number;
    dish: DishWithIngredients;
    status: number;
}

export interface CreateOrder {
    tableId: number;
    dishId: number;
}

// ========================================= FUNCTIONS ==============================================

export function calculateOrdersTotal(orders: Partial<Order>[]): number {
    let total = 0;

    for(const order of orders)
        total += order.dish?.price ?? 0;

    return total;
}

export function disableSaveOrder(orders: Order[]) {
    for(const order of orders)
        if(order.status == 0)
            return false;

    return true;
}

export async function createOrder(order: CreateOrder) {
    const token = useAuth.getState().token;
    
    return await cmdFetch("/order", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    });
}