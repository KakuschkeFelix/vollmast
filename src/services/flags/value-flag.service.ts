import {FlagHandler, VollmastError} from "../../interfaces";
import {FlagValue, ValueFlag, FlagScope} from "../../types";
import {PrismaModel} from "../../types/flag-prisma-client";
import {KeyGeneratorService} from "../key-generator.service";

export class ValueFlagService implements FlagHandler<ValueFlag> {

    constructor(public model: PrismaModel<ValueFlag>, private keyGenerator: KeyGeneratorService) {}

    async setFlag(key: string, config: Omit<ValueFlag, 'key'>, scope: FlagScope): Promise<ValueFlag> {
        try {
            const completeKey = this.keyGenerator.generateKey(key, scope);
            return this.model.upsert({
                where: {
                    key: completeKey,
                },
                update: {
                    ...config,
                },
                create: {
                    key,
                    ...config,
                }
            });
        } catch (_e) {
            throw new VollmastError("Failed to set flag.", "VM_INTERNAL_ERROR");
        }
    }

    async getFlag(key: string, scope: FlagScope): Promise<ValueFlag> {
        try {
            const completeKey = this.keyGenerator.generateKey(key, scope);
            return this.model.findUnique({
                where: {
                    key: completeKey
                }
            }).then((flag) => {
                if (!flag) {
                    throw new VollmastError("Flag not found.", "VM_FLAG_NOT_FOUND");
                }
                return flag;
            })
        } catch (_e) {
            throw new VollmastError("Failed to get flag.", "VM_INTERNAL_ERROR");
        }
    }

    async getFlagValue(key: string, scope: FlagScope): Promise<FlagValue<ValueFlag>> {
        try {
            const completeKey = this.keyGenerator.generateKey(key, scope);
            return this.model.findUnique({
                where: {
                    key: completeKey
                }
            }).then((flag) => {
                if (!flag) {
                    throw new VollmastError("Flag not found.", "VM_FLAG_NOT_FOUND");
                }
                return flag;
            }).then((flag) => {
                return flag.state ? flag.value : false;
            });
        } catch (_e) {
            throw new VollmastError("Failed to get flag value.", "VM_INTERNAL_ERROR");
        }
    }

    async deleteFlag(key: string, scope: FlagScope): Promise<true> {
        try {
            const completeKey = this.keyGenerator.generateKey(key, scope);
            return this.model.delete({
                where: {
                    key: completeKey,
                }
            }).then(() => {
                return true;
            });
        } catch (_e) {
            throw new VollmastError("Failed to delete flag.", "VM_INTERNAL_ERROR");
        }
    }
}