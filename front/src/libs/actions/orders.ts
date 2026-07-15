// ================================ TYPES, INTERFACES, CLASSES =====================================

import type { Dish } from "@/libs/actions/dish";

export interface Order {
    id: number;
    dish: Dish;
    status: number;
}

// ========================================= FUNCTIONS ==============================================