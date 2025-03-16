import {LitElement} from 'lit';

export class Buildable extends LitElement implements IBuildable {
    constructor(){
        super();
    }

    saveElement(): string {
        return "";
    }
}