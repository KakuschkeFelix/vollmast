import {CommonFlag} from "./common.flag";

export type ValueFlag = CommonFlag & {
    value: string;
    type: 'value';
}