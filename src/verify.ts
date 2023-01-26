import { iSaleResponse, iItem } from "./interfaces";
import { sales } from "./database";

export function findList(identifier: any): iSaleResponse {
    const searchList: iSaleResponse | undefined = sales.find(({id}) => id === Number(identifier));
    if (searchList) {
        return searchList;
    } else {
        throw new Error(`Not found some list with this id: (${identifier})`);
    }
}

export function findItem(noun: string, list: iSaleResponse): iItem | undefined {
    let findItem: iItem | undefined = list!.data.find(({name}) => name === noun);
    if(findItem) { 
        return findItem;
    } else {
        throw new Error(`Not found`); 
    };
}