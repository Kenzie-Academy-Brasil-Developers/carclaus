export interface iItem {
    name: string;
    quantity: string;
}

export interface iSaleRequest {
    listName: string;
    data: iItem[];
}

export interface iSaleResponse extends iSaleRequest {
    id: number;
}

export type iSaleRequiredKeys = "listName" | "data";

export type iBuyRequiredKeys = "name" | "quantity";