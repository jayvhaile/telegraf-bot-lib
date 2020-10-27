import {TelegrafContext} from "telegraf/typings/context";
import {Wrapped} from "./types";

export function flatArray<T>(array): Array<T> {
    const result: Array<T> = [];
    array.forEach(element => {
        if (element.forEach) {
            // @ts-ignore
            result.push(...flatArray(element));
        } else {
            result.push(element);
        }
    });

    return result;
}

export function mapDeep(array, mapper) {
    const result = [];
    array.forEach(element => {
        if (element.forEach) {
            result.push(mapDeep(element, mapper));
        } else {
            result.push(mapper(element));
        }
    });
    return result;
}

export function group<T>(input: Array<T>, take = 2) {
    const result = [];
    for (let i = 0; i < input.length; i += take) {
        result.push(input.slice(i, i + take))
    }
    return result;
}

export function groupWith<T>(input: Array<T>, takes: number[]) {
    const result = [];
    for (let index = 0, cumulative = 0; cumulative < input.length; index++) {
        const take = takes[index % takes.length]
        result.push(input.slice(cumulative, cumulative += take))
    }
    return result;
}

export function unwrap<T>(wrapped: Wrapped<T>, ctx: TelegrafContext): T {
    if (!wrapped) return null;
    if (typeof wrapped == 'function') {
        return (wrapped as (ctx: TelegrafContext) => T)(ctx);
    }
    return wrapped as T;
}

export function unwrapList<T>(wrapped: Wrapped<T>[], ctx: TelegrafContext): T[] {
    return wrapped.map(w => unwrap(w, ctx));
}


export class SessionUtils {
    static set(ctx: TelegrafContext, path: string, data: any) {
        let schema = ctx['session'];
        let pList = path.split('.');
        let len = pList.length;
        for (let i = 0; i < len - 1; i++) {
            let elem = pList[i];
            if (!schema[elem]) schema[elem] = {}
            schema = schema[elem];
        }

        schema[pList[len - 1]] = data;
        return schema;
    }

    static get(ctx: TelegrafContext, path: string = ''): any {
        let result = ctx['session'];
        if (!path || !path.length) return result;
        const split = path.split('.');
        for (let i = 0; i < split.length; i++) {
            result = result?.[split[i]];
        }
        return result;
    }
}


