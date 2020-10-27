import { MyButton } from "./my_button";
export declare class ButtonLayout {
    static horizontal(): number[];
    static vertical(): number[];
    static fixed(column: number): number[];
}
export declare class MyButtonBoard<T extends MyButton> {
    readonly buttons: T[][];
    constructor(buttons: T[][]);
    get first(): T;
    get isEmpty(): boolean;
    horizontal(): MyButtonBoard<T>;
    vertical(): MyButtonBoard<T>;
    fixedColumn(columnCount: number): MyButtonBoard<T>;
    layout(columnCounts: number[]): MyButtonBoard<T>;
    join(keyboard: MyButtonBoard<T>): MyButtonBoard<T>;
    static with<T extends MyButton>(buttons: T[]): MyButtonBoard<T>;
    static empty<T extends MyButton>(): MyButtonBoard<T>;
    static single<T extends MyButton>(button: T): MyButtonBoard<T>;
    static horizontal<T extends MyButton>(buttons: T[]): MyButtonBoard<T>;
    static vertical<T extends MyButton>(buttons: T[]): MyButtonBoard<T>;
    static fixedColumn<T extends MyButton>(buttons: T[], columnCount: number): MyButtonBoard<T>;
    static layout<T extends MyButton>(buttons: T[], columnCounts: number[]): MyButtonBoard<T>;
    static join<T extends MyButton>(keyboard1: MyButtonBoard<T>, keyboard2: MyButtonBoard<T>): MyButtonBoard<T>;
    static joinAll<T extends MyButton>(keyboards: MyButtonBoard<T>[]): MyButtonBoard<T>;
}
