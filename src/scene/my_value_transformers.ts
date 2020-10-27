import {TelegrafContext} from "telegraf/typings/context";
import {MediaType} from "../types";
import {Contact} from "telegram-typings";

export default class MyValueTransformers {

    static text(): (ctx: TelegrafContext) => string {
        return (ctx: TelegrafContext) => ctx.message.text;
    }

    static contact(): (ctx: TelegrafContext) => Contact {
        return (ctx: TelegrafContext) => ctx.message.contact;
    }


    static media(): (ctx: TelegrafContext) => MediaType {
        return (ctx: TelegrafContext) => ({
            type: ['video', 'audio', 'voice', 'document', 'photo'][[
                ctx.message.video,
                ctx.message.audio,
                ctx.message.voice,
                ctx.message.document,
                ctx.message.photo?.[0],
            ].map((a) => !!a).indexOf(true)],
            fileId: [
                ctx.message.video,
                ctx.message.audio,
                ctx.message.voice,
                ctx.message.document,
                ctx.message.photo?.[0],
            ].find(m => m).file_id,
            caption: ctx.message.caption,
        });
    }
}
