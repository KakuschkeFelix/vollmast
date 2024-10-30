import {CommonFlag} from "./common.flag";

export type VersionFlag = CommonFlag & {
    value: number;
    possibleValues?: number[];
    type: 'version';
}