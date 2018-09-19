import { ViewElement } from "../../view";

// replace <any>
export class FeatureBElement extends ViewElement<any> {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    update(state?: any) {
        this.shadowRoot.innerHTML = `<dl>
        <dt>title:</dt>
        <dd>${state.title}</dd>
        <dt>description:</dt>
        <dd>${state.description}</dd>
</dl>`;
    }
}