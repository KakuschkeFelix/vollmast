import {FlagHandler, VollmastError} from "../../interfaces";
import {FlagValue, ToggleFlag, FlagScope} from "../../types";
import {PrismaModel} from "../../types/flag-prisma-client";
import {KeyGeneratorService} from "../key-generator.service";

export class ToggleFlagService implements FlagHandler<ToggleFlag> {

    constructor(public model: PrismaModel<ToggleFlag>, private keyGenerator: KeyGeneratorService) {}

    async setFlag(key: string, config: Omit<ToggleFlag, 'key'>, scope: FlagScope): Promise<ToggleFlag> {
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

    async getFlag(key: string, scope: FlagScope): Promise<ToggleFlag> {
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

    async getFlagValue(key: string, scope: FlagScope): Promise<FlagValue<ToggleFlag>> {
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
                return flag.state;
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