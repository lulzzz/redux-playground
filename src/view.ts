import { Store } from "redux";
import { BehaviorSubject } from "rxjs";

// move me to another file
export const VIEWACTION_EVENT = 'viewaction';
export abstract class ViewElement extends HTMLElement {

    constructor() {
        super();
    }

    // will be called by subscription when data has been changed
    // subscriber.map(value => value[path]).distinctValues()
    abstract update(state?: any): void;

    connectedCallback() {
        console.log(`connected: ${this.localName} for state:${this.getAttribute('state')}`);
        // subscribe the element to the observer here
    }
    disconnectedCallback() {
        console.log(`disconnected: ${this.localName}`);
        // unsubscribe here
    }

    dispatch(type: string, detail?: any) {
        const event = new CustomEvent(VIEWACTION_EVENT, {
            cancelable: true,
            bubbles: true,
            detail: {
                type,
                data: detail
            }
        });
        this.dispatchEvent(event);
    }
}

export default (store: Store, element: Element) => {
    const subject = new BehaviorSubject(store.getState());
    store.subscribe(() => subject.next(store.getState()));
    element.addEventListener(VIEWACTION_EVENT, (event: CustomEvent) => {
        // event is prevented by the user
        if (event.defaultPrevented) {
            return;
        }
        const { type, data } = event.detail;
        // dispatch the action on the store
        store.dispatch({
            type, data
        });
    });

    // set up event listeners for custom event : action
    // set up rerender of elements
    // subscribe elements to subscriber using scheduler raf
    // should return a method or something to subscribe/unsubscribe elements.....

    // where to store the store variable so that it can be accessed by view ??? using a Symbol
    // there should be no notion of the store / redux / rxjs in the view..the view should be Vanilla HTML/JavaScript

};