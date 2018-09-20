import { Store } from "redux";
import { BehaviorSubject, Observable, } from "rxjs";
import { map, distinctUntilChanged } from "rxjs/operators";
import actionRegistry from './redux/actionRegistry';
// move me to another file
export const VIEWACTION_EVENT = 'viewaction';

interface Mapper<T> {
    (value: T, index: number): T
}

export abstract class ViewElement<T> extends HTMLElement implements EventListenerObject {

    protected observable: Observable<T>;

    constructor() {
        super();
    }

    abstract update(state?: T): void;

    connectedCallback() {
        const state = this.getAttribute('state');
        console.log(this);
        if (!this.observable) {
            return;
        }

        let observer = this.observable;
        if (typeof state === 'string' && state.trim().length > 0) {
            const mapper = new Function('state', 'index', 'return state.' + state) as Mapper<T>;
            observer = observer.pipe(map(mapper));
        }
        observer.pipe(distinctUntilChanged()).subscribe((next: T) => this.update(next));
        this.addEventListener('click', this);
    }
    disconnectedCallback() {
        console.log(`disconnected: ${this.localName}`);
        this.removeEventListener('click', this);
    }

    handleEvent(event: Event) {
        if (event.defaultPrevented) {
            return;
        }
        if (event.type === 'click') {
            // is there an action associated ??
            // get the composed path and make sure the element is part of this... so that it does not steal actions
            let elements: Element[] = (event as any).composedPath();
            for (let i = 0, ii = elements.length; i < ii; i++) {
                let element = elements[i];
                if (!(element.nodeType === Node.ELEMENT_NODE && this.shadowRoot.contains(element))) {
                    break;
                }
                const action = element.getAttribute('view-action');
                if (action) {
                    this.action(action);
                    break;
                }
            }
            console.log(event.type, (event as any).composedPath());
        }
    }

    action(type: string, detail?: any) {
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
    console.log('define me', store);
    Object.defineProperty(ViewElement.prototype, 'observable', {
        get: () => subject
    });
    element.ownerDocument.addEventListener(VIEWACTION_EVENT, (event: CustomEvent) => {
        // event is prevented by the user
        if (event.defaultPrevented) {
            return;
        }
        const { type, data } = event.detail;
        // dispatch the action on the store
        // needs an action resolver which it can call to get the registered action 
        // like -> store.dispatch(actionRegistry(type)(data));
        
        const action = actionRegistry.resolve<any>(type);
        console.log(type, action)
        if (action) {
            store.dispatch(action(data));
        }
    });

};