import {TelegrafContext} from "telegraf/typings/context";
import {MyStage, SESSION_KEY} from "./my_stage";
import MyStep, {StepResult} from "./my_step";
import {MyBaseScene} from "./my_scene";
import {SessionUtils} from "../utils";

export default class MyStepScene extends MyBaseScene {
    constructor(
        readonly steps: MyStep<any>[],
        readonly onResult: (ctx: TelegrafContext, result: any) => void,
        readonly onLeave?: (ctx: TelegrafContext) => void,
    ) {
        super();
    }

    getCursor(ctx: TelegrafContext) {
        return MyStage.router.history.head(ctx).data?.['cursor'] || 0;
    }

    setCursor(ctx, value: number) {
        MyStage.router.history.updateHeadData(ctx, {
            cursor: value
        }, true)
    }

    prevStep(ctx: TelegrafContext) {
        const cursor = this.getCursor(ctx);
        return cursor == 0 ? null : this.steps[cursor - 1];
    }

    currentStep(ctx: TelegrafContext) {
        const cursor = this.getCursor(ctx);
        return this.steps[cursor];
    }

    nextStep(ctx: TelegrafContext) {
        const cursor = this.getCursor(ctx);
        return cursor + 1 >= this.steps.length ? null : this.steps[cursor + 1];
    }


    async handle(ctx: TelegrafContext): Promise<boolean> {
        const currentStep = this.currentStep(ctx);
        const onMessageResult = await currentStep.onMessage(ctx);
        if (onMessageResult != StepResult.STAY) {
            return this.handleResult(ctx, onMessageResult);
        }
        const validations = (await Promise.all(currentStep.validators.map(v => v(ctx)))).filter(e => e);
        if (validations.length) {
            await ctx.reply(validations[0]);
            return true;
        }
        const value = currentStep.valueTransformer(ctx);
        MyStage.router.history.updateHeadData(ctx, {
            [currentStep.name]: value
        }, true)
        const result = await currentStep.onDone(ctx, value);
        await this.handleResult(ctx, result);
        return true;
    }

    async handleResult(ctx: TelegrafContext, result: StepResult) {
        const session: any = MyStage.router.history.head(ctx).data;
        const cursor: number = this.getCursor(ctx);
        const prevStep = this.prevStep(ctx);
        const nextStep = this.nextStep(ctx);
        switch (result) {
            case StepResult.BACK: {
                if (prevStep) {
                    this.setCursor(ctx, cursor - 1);
                    return this.enterStep(ctx, prevStep);
                }
                await MyStage.router.pop(ctx)
                return false;
            }
            case StepResult.LEAVE:
                await MyStage.router.pop(ctx)
                return false;
            case StepResult.NEXT:
                if (nextStep) {
                    this.setCursor(ctx, cursor + 1);
                    return this.enterStep(ctx, nextStep);
                }
                const result = {
                    ...session,
                };
                await this.onResult(ctx, result);
                await MyStage.router.pop(ctx)
                return false;
            case StepResult.STAY:
                return true;
            case StepResult.FREEZE:
                return true;
        }
        return true;
    }


    async enterStep(ctx: TelegrafContext, step: MyStep<any>) {
        return this.handleResult(ctx, await step.onEnter(ctx));
    }

    async onEnterScene(ctx: TelegrafContext) {
        const cursor: number = this.getCursor(ctx);
        const currentStep = this.steps[cursor];
        return this.enterStep(ctx, currentStep);
    }

    onLeaveScene(ctx: TelegrafContext) {
        return this.onLeave?.(ctx);
    }
}
