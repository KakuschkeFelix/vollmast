import {CommonFlag} from "./common.flag";

export type EnumFlag = CommonFlag & {
    value: string;
    possibleValues: string[];
    type: 'enum';
}