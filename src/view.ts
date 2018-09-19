import { Store } from "redux";
import { BehaviorSubject, Observable, Observer } from "rxjs";
import { map } from "rxjs/operators";

// move me to another file
export const VIEWACTION_EVENT = 'viewaction';

interface Mapper<T> {
    (value: T, index: number): T
}

export abstract class ViewElement<T> extends HTMLElement {

    protected observable: Observable<T>;

    constructor() {
        super();
    }

    abstract update(state?: T): void;

    connectedCallback() {
        const state = this.getAttribute('state');
        let observer = this.observable
        if (typeof state === 'string' && state.trim().length > 0) {
            const mapper = new Function('state', 'index', 'return state.' + this.getAttribute('state')) as Mapper<T>;
            observer = observer.pipe(map(mapper));
        }
        observer.subscribe((next: T) => this.update(next));
    }
    disconnectedCallback() {
        console.log(`disconnected: ${this.localName}`);
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
    Object.defineProperty(ViewElement.prototype, 'observable', {
        get: () => subject
    });
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