import {LitElement} from 'lit';

export class Buildable extends LitElement implements IBuildable {
    declare props: string;

    static properties = {props: {type: String}}

    constructor(){
        super();
    }

    elementPropertiesAsString(): string {
        return "";
    }

    serializeELement(): string {
        this.setAttribute("props", this.elementPropertiesAsString());

        return this.outerHTML;
    }
}