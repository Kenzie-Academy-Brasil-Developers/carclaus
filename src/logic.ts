import { Request as iRequest, Response as iResponse } from "express";
import { iSaleRequest, iSaleResponse } from "./interfaces";
import { validateData, validateItem } from "./validate";
import { findList, findItem } from "./verify";
import { ids, sales } from "./database";
import { errorDefault } from "./errors";

export function createSales(request: iRequest, response: iResponse): iResponse {
    try {
        const currSale: iSaleRequest = validateData(request.body);
        const newSale: iSaleResponse = {
            id: ids[ids.length-1]+1,
            ...currSale
        }
        ids.push(newSale.id);
        sales.push(newSale);
        return response.status(201).json(newSale);
    } catch(error: any) {
        return errorDefault(error, response);
    }
}

export function readSales(request: iRequest, response: iResponse): iResponse {
    return response.status(200).json(sales);
}

export function readSomeSale(request: iRequest, response: iResponse): iResponse {
    try {
        const searchList = findList(request.listOption.id);
        return response.status(200).json(searchList);
    } catch(error: any) {
        return errorDefault(error, response);
    }
}

export function updateSomeSale(request: iRequest, response: iResponse): iResponse {
    try {
        const searchList = findList(request.params.id);
        let searchItem = findItem(request.params.noun, searchList);
        const itemToChange = validateItem(request.body);
        searchItem = { ...searchItem, ...itemToChange };
        return response.status(200).json(itemToChange);
    } catch(error: any) {
        return errorDefault(error, response);
    }
}

export function deleteList(request: iRequest, response: iResponse): iResponse {
    try {
        const searchList = findList(request.listOption.id);
        sales.splice(sales.indexOf(searchList), 1);
        return response.status(204).json();
    } catch(error: any) {
        return errorDefault(error, response);
    }
}

export function deleteItem(request: iRequest, response: iResponse): iResponse {
    try {
        const searchList = findList(request.listOption.id);
        const searchItem = findItem(request.params.noun, searchList);
        const position = sales.indexOf(searchList);
        searchList.data = searchList.data.filter((item) => item !== searchItem);
        sales[position] = searchList;
        return response.status(204).json();
    } catch(error: any) {
        return errorDefault(error, response);
    }
}