import {flatArray, group, groupWith} from "../../../utils";
import {MyButton} from "./my_button";

export class ButtonLayout {

    static horizontal(): number[] {
        return [8];
    }

    static vertical(): number[] {
        return [1];
    }

    static fixed(column: number): number[] {
        return [column];
    }
}


export class MyButtonBoard<T extends MyButton> {
    constructor(
        readonly buttons: T[][]
    ) {
    }

    get first(): T {
        return flatArray<T>(this.buttons)[0];
    }

    get isEmpty(): boolean {
        return this.buttons.length == 0;
    }

    horizontal(): MyButtonBoard<T> {
        return MyButtonBoard.horizontal<T>(flatArray(this.buttons));
    }

    vertical(): MyButtonBoard<T> {
        return MyButtonBoard.vertical<T>(flatArray(this.buttons));
    }

    fixedColumn(columnCount: number): MyButtonBoard<T> {
        return MyButtonBoard.fixedColumn<T>(flatArray(this.buttons), columnCount);
    }

    layout(columnCounts: number[]): MyButtonBoard<T> {
        return MyButtonBoard.layout<T>(flatArray(this.buttons), columnCounts);
    }


    join(keyboard: MyButtonBoard<T>): MyButtonBoard<T> {
        return MyButtonBoard.join<T>(this, keyboard);
    }

    static with<T extends MyButton>(buttons: T[],): MyButtonBoard<T> {
        return new MyButtonBoard<T>([])
    }

    static empty<T extends MyButton>(): MyButtonBoard<T> {
        return new MyButtonBoard<T>([])
    }

    static single<T extends MyButton>(button: T): MyButtonBoard<T> {
        return new MyButtonBoard<T>([[button]])
    }

    static horizontal<T extends MyButton>(buttons: T[]): MyButtonBoard<T> {
        return new MyButtonBoard<T>([buttons])
    }

    static vertical<T extends MyButton>(buttons: T[]): MyButtonBoard<T> {
        return new MyButtonBoard<T>(group(buttons, 1))
    }

    static fixedColumn<T extends MyButton>(buttons: T[], columnCount: number): MyButtonBoard<T> {
        return new MyButtonBoard<T>(group(buttons, columnCount))
    }

    static layout<T extends MyButton>(buttons: T[], columnCounts: number[]): MyButtonBoard<T> {
        return new MyButtonBoard<T>(groupWith(buttons, columnCounts));
    }

    static join<T extends MyButton>(keyboard1: MyButtonBoard<T>, keyboard2: MyButtonBoard<T>): MyButtonBoard<T> {
        return new MyButtonBoard<T>([...keyboard1.buttons, ...keyboard2.buttons]);
    }

    static joinAll<T extends MyButton>(keyboards: MyButtonBoard<T>[]): MyButtonBoard<T> {
        const res: T[][] = [];
        keyboards.forEach(k => res.push(...k.buttons))
        return new MyButtonBoard<T>(res);
    }
}

