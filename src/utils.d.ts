import { TelegrafContext } from "telegraf/typings/context";
import { Wrapped } from "./types";
export declare function flatArray<T>(array: any): Array<T>;
export declare function mapDeep(array: any, mapper: any): any[];
export declare function group<T>(input: Array<T>, take?: number): any[];
export declare function groupWith<T>(input: Array<T>, takes: number[]): any[];
export declare function unwrap<T>(wrapped: Wrapped<T>, ctx: TelegrafContext): T;
export declare function unwrapList<T>(wrapped: Wrapped<T>[], ctx: TelegrafContext): T[];
export declare class SessionUtils {
    static set(ctx: TelegrafContext, path: string, data: any): any;
    static get(ctx: TelegrafContext, path?: string): any;
}
