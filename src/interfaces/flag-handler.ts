import {Flag, FlagScope, FlagValue} from "../types";
import {PrismaModel} from "../types/flag-prisma-client";

export interface FlagHandler<T extends Flag> {
    model: PrismaModel<T>;
    setFlag(key: string, config: Omit<T, 'key'>, scope: FlagScope): Promise<T>;
    getFlag(key: string, scope: FlagScope): Promise<T>;
    getFlagValue(key: string, scope: FlagScope): Promise<FlagValue<T>>;
    deleteFlag(key: string, scope: FlagScope): Promise<true>;
}