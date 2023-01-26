import { iItem, iBuyRequiredKeys, iSaleRequiredKeys, iSaleRequest } from "./interfaces";

export function validateItem(payload: any, keys: string[] = Object.keys(payload)): iItem {
    const requiredKeysItem: iBuyRequiredKeys[] = ["name", "quantity"];
    const requiredKeysItem2: string[] = [...requiredKeysItem];

    const itemContainsAllRequiredKeys: boolean = keys.every((key: string) =>  requiredKeysItem2.includes(key));
    const itemContainsOthersKeys: boolean = keys.every((key: string) => !requiredKeysItem2.includes(key));
    const testTypesList = (): boolean => {
            return (
                typeof payload.name === "string" &&
                typeof payload.quantity === "string"
            );
    }
    errorMessage(itemContainsAllRequiredKeys, itemContainsOthersKeys, testTypesList(), requiredKeysItem);
    return payload;
}

export function validateItems(payload: any): void {
    const requiredKeysList: iBuyRequiredKeys[] = ["name", "quantity"];
    const requiredKeysList2: string[] = [...requiredKeysList];
   
    const listContainsAllRequiredKeys: boolean = payload.data.every((el: string) => {
        return Object.keys(el).every((key: string) => requiredKeysList2.includes(key));
    });

    const listContainsOthersKeys: boolean = payload.data.every((el: string) => {
        return Object.keys(el).every((key: string) => !requiredKeysList2.includes(key));
    });

    const testTypesList = (): boolean => {
        return payload.data.every((item: iItem) => {
            return (
                typeof item.name === "string" &&
                typeof item.quantity === "string"
            );
        });
    }
    errorMessage(listContainsAllRequiredKeys, listContainsOthersKeys, testTypesList(), requiredKeysList);
}

export function validateBody(payload: any, keys: string[]): void {
    const requiredKeysBody: iSaleRequiredKeys[] = ["listName", "data"];
    const requiredKeysBody2: string[] = [...requiredKeysBody];

    const bodyContainsAllRequiredKeys: boolean = requiredKeysBody.every((key: string) => keys.includes(key));
    const bodyContainsOthersKeys: boolean = keys.some((key: string) => !requiredKeysBody2.includes(key));

    const testTypeBody = (): boolean => {
        return (
            typeof payload.listName === "string" &&
            Array.isArray(payload.data)
        );
    }
    errorMessage(bodyContainsAllRequiredKeys, bodyContainsOthersKeys, testTypeBody(), requiredKeysBody);
}

export function validateData(payload: any): iSaleRequest {
    const keys: string[] = Object.keys(payload);
    validateBody(payload, keys);
    validateItems(payload);
    return payload;
}

function errorMessage(containsAllReqKeys: boolean, containsOthersKeys: boolean, containsJustRightTypes: boolean, reqKeys: string[]) {
    if(!containsAllReqKeys) {
        throw new Error(`Required keys are: ${reqKeys}`);
    } else if(containsOthersKeys) {
        throw new Error(`You are trying to put more keys, they are just ${reqKeys}`);
    } else if(!containsJustRightTypes) {
        throw new Error(`Some values are out of format. For example, 'listName' needs to be a (string), 'data' needs to be an (array), and each 'element' of it needs to have only (strings) in its values`);
    }
}