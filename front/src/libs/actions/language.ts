// ================================ TYPES, INTERFACES, CLASSES =====================================

import { cmdFetch } from "@/libs/utils/fetch";

export interface Language {
    id: number;
    name: string;
    abbrev: string;
}

// ========================================= FUNCTIONS ==============================================

export async function fetchAllLanguages(): Promise<Language[]> {
    return await cmdFetch("/lang");
}