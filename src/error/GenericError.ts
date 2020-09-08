import { BaseError } from "./BaseError"

export class GenericError extends BaseError {
    constructor(message: string) {
        super(message, 400);
    }
}