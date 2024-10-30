import { EnumFlag } from "./enum.flag";
import { ValueFlag } from "./value.flag";
import {ToggleFlag} from "./toggle.flag";
import {VersionFlag} from "./version.flag";

export type Flag = ValueFlag | ToggleFlag | VersionFlag | EnumFlag;
export type FlagToFlagType<T extends Flag> = T['type'];

export type UserFlagScope = {
    id: string;
    type: 'USER';
}

export type GlobalFlagScope = {
    type: 'GLOBAL'
}

export type DomainFlagScope = {
    domain: string;
    type: 'DOMAIN';
}

export type FlagScope = UserFlagScope | GlobalFlagScope | DomainFlagScope;

type FlagValueIfEnabled<T extends Flag> = T extends ToggleFlag ? boolean : T extends ValueFlag ? string : T extends VersionFlag ? number : T extends EnumFlag ? string : never;

export type FlagValue<T extends Flag> = false | FlagValueIfEnabled<T>;

export {
    EnumFlag,
    ValueFlag,
    ToggleFlag,
    VersionFlag
}