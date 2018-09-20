import { ViewElement } from "../../app";

// replace <any>
export class FeatureAElement extends ViewElement<any> {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    update(state?: any) {
        console.log(`-------------RENDER ME: ${this.nodeName}`);
        this.shadowRoot.innerHTML = `<dl>
        <button view-action="addsomething">add something</button>
        <span>${state.date ? state.date : ''}</span>
        <dt>title:</dt>
        <dd>${state.title}</dd>
        <dt>description:</dt>
        <dd>${state.description}</dd>
</dl>
<pre>${JSON.stringify(state)}</pre>`;
    }

}