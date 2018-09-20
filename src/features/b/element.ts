import { ViewElement } from "../../app";

// replace <any>
export class FeatureBElement extends ViewElement<any> {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    update(state?: any) {
        console.log(`-------------RENDER ME: ${this.nodeName}`);
        // lets use our nice incremental-dom here?
        this.shadowRoot.innerHTML = `
        <button view-action="addsomething-async">add something async </button>
        <dl>
        <dt>title:</dt>
        <dd>${state.title}</dd>
        <dt>description:</dt>
        <dd>${state.description}</dd>
</dl>`;
    }
}