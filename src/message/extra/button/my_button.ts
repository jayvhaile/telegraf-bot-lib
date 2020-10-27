import {Wrapped} from "../../../types";

export abstract class MyButton {
    abstract get label(): Wrapped<string>;

    abstract get hide(): Wrapped<boolean>;

}
