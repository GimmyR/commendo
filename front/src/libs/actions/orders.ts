import type { DishWithIngredients } from "@/libs/actions/dishes";
import type { ITable } from "@/libs/actions/tables";
import { useAuth } from "@/libs/hooks/use-auth";
import { cmdFetch } from "@/libs/utils/fetch";

// ================================ TYPES, INTERFACES, CLASSES =====================================

export interface Order {
    id: number;
    dish: DishWithIngredients;
    status: number;
}

export interface OrderWithTableAndDish extends Order {
    table: ITable;
}

export interface CreateOrder {
    tableId: number;
    dishId: number;
}

export interface EditOrder {
    status: number;
}

export const orderStates = [
    { key: "to-confirm", color: "secondary" },
    { key: "to-do", color: "primary" },
    { key: "in-progress", color: "warning" },
    { key: "done", color: "success" },
    { key: "cancelled", color: "danger" },
    { key: "archived", color: "dark" }
];

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

export async function removeOrder(orderId: number): Promise<Order> {
    const token = useAuth.getState().token;
    
    return await cmdFetch(`/order/${orderId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export async function partiallyEditOrder(id: number, order: EditOrder): Promise<Order> {
    const token = useAuth.getState().token;

    return await cmdFetch(`/order/${id}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    });
}

export async function fetchAllOrders(): Promise<OrderWithTableAndDish[]> {
    const token = useAuth.getState().token;

    return await cmdFetch(`/order`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function sortOrders(orders: OrderWithTableAndDish[]): (OrderWithTableAndDish[])[] {
    const first: OrderWithTableAndDish[] = [];
    const second: OrderWithTableAndDish[] = [];

    for(const order of orders) {
        if([1, 2].includes(order.status))
            first.push(order);
        else second.push(order);
    }

    return [first, (second.sort((a, b) => b.id - a.id))];
}