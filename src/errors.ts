import { Response as iResponse } from "express";

export function errorDefault(error: any, response: iResponse) {
    const { message } = error;
    if(message.includes('Not found')) {
        return response.status(404).json({
            message: message
        });
    } else if(error instanceof Error) {
        return response.status(400).json({
            message: message
        });
    }
    console.log(error);
    return response.status(500).json({
        message: "Internal server error"
    });
}