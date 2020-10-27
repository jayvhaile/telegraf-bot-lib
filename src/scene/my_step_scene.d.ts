import { TelegrafContext } from "telegraf/typings/context";
import MyStep, { StepResult } from "./my_step";
import { MyBaseScene } from "./my_scene";
export default class MyStepScene extends MyBaseScene {
    readonly steps: MyStep<any>[];
    readonly onResult: (ctx: TelegrafContext, result: any) => void;
    readonly onLeave?: (ctx: TelegrafContext) => void;
    constructor(steps: MyStep<any>[], onResult: (ctx: TelegrafContext, result: any) => void, onLeave?: (ctx: TelegrafContext) => void);
    getCursor(ctx: TelegrafContext): any;
    setCursor(ctx: any, value: number): void;
    prevStep(ctx: TelegrafContext): MyStep<any>;
    currentStep(ctx: TelegrafContext): MyStep<any>;
    nextStep(ctx: TelegrafContext): MyStep<any>;
    handle(ctx: TelegrafContext): Promise<boolean>;
    handleResult(ctx: TelegrafContext, result: StepResult): any;
    enterStep(ctx: TelegrafContext, step: MyStep<any>): any;
    onEnterScene(ctx: TelegrafContext): Promise<any>;
    onLeaveScene(ctx: TelegrafContext): void;
}
