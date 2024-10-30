import {VollmastErrorCause} from "../types";

export class VollmastError extends Error {
    constructor(public message: string, public cause: VollmastErrorCause) {
        super(message);

        Object.setPrototypeOf(this, VollmastError.prototype);
    }
}