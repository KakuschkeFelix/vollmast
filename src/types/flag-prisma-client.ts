import {Flag, FlagToFlagType} from "./flags";

export interface PrismaClient {
    [K: string]: any;
    $connect: any;
    $transaction: any;
}

export interface BasicPrismaModel {
    fields: any;
    findUnique: any;
    findMany: any;
}

type PrismaWhere<_Schema extends Flag> = {
    [K in keyof _Schema]?:
    | _Schema[K]
    | {
    lte?: _Schema[K];
};
};

export interface PrismaModel<_Schema extends Flag> {
    name: FlagToFlagType<_Schema>;
    findUnique: <_Included = {}>(options: {
        where: PrismaWhere<_Schema>;
        include?: Record<string, boolean>;
    }) => Promise<null | (_Schema & _Included)>;
    upsert: (options: { where: PrismaWhere<_Schema>; update: Partial<_Schema>; create: Partial<_Schema> }) => Promise<_Schema>;
    findMany: (options?: { where: PrismaWhere<_Schema> }) => Promise<_Schema[]>;
    delete: (options: { where: PrismaWhere<_Schema> }) => Promise<void>;
    deleteMany: (options?: { where: PrismaWhere<_Schema> }) => Promise<void>;
    update: (options: { data: Partial<_Schema>; where: PrismaWhere<_Schema> }) => Promise<_Schema>;
}