import {VollmastError} from "../interfaces";

export function assertExhaustive(value: never): never {
    throw new VollmastError(`Unhandled value: ${value}`, "VM_INTERNAL_ERROR");
}