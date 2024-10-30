import {DomainFlagScope, FlagScope, UserFlagScope} from "../types";
import {assertExhaustive} from "../helpers/exhaustive";

export class KeyGeneratorService {
    public generateKey(key: string, config: FlagScope): string {
        switch (config.type) {
            case "DOMAIN":
                return this.generateDomainConfigKey(key, config);
            case "GLOBAL":
                return this.generateGlobalConfigKey(key);
            case "USER":
                return this.generateUserConfigKey(key, config);
            default:
                assertExhaustive(config);
        }
    }

    private generateUserConfigKey(key: string, config: UserFlagScope): string {
        return `CONFIG/USER/${config.id}/${key}`;
    }

    private generateDomainConfigKey(key: string, config: DomainFlagScope): string {
        return `CONFIG/DOMAIN/${config.domain}/${key}`;
    }

    private generateGlobalConfigKey(key: string): string {
        return `CONFIG/GLOBAL/${key}`;
    }
}