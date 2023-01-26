import { Request as iRequest, Response as iResponse, NextFunction as iNextFunction } from "express";
import { sales } from "./database";

export function ensureListExists(request: iRequest, response: iResponse, next: iNextFunction) {
    const identifier: number = Number(request.params.id);
    const searchIndex: number = sales.findIndex(({id}) => id === identifier);
    if(searchIndex === -1) {
        return response.status(404).json({
            message: `🔴Not found some list with this id: (${identifier})`
        });
    }

    request.listOption = {
        id: identifier
    }

    return next();
}