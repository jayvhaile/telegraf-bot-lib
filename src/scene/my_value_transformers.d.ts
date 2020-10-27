import { TelegrafContext } from "telegraf/typings/context";
import { MediaType } from "../types";
import { Contact } from "telegram-typings";
export default class MyValueTransformers {
    static text(): (ctx: TelegrafContext) => string;
    static contact(): (ctx: TelegrafContext) => Contact;
    static media(): (ctx: TelegrafContext) => MediaType;
}
