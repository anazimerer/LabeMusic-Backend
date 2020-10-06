"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericError = void 0;
const BaseError_1 = require("./BaseError");
class GenericError extends BaseError_1.BaseError {
    constructor(message) {
        super(message, 400);
    }
}
exports.GenericError = GenericError;
