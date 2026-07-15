// ================================ TYPES, INTERFACES, CLASSES =====================================

import type { Dish } from "@/libs/actions/dishes";

export interface Order {
    id: number;
    dish: Dish;
    status: number;
}

// ========================================= FUNCTIONS ==============================================