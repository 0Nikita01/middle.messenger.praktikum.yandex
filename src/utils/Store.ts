import EventBus from "./EventBus";
import Block from "./Block";
import isEqual from "../helpers/isEqual";
import set, { Indexed } from '../helpers/set';
import cloneDeep from "../helpers/cloneDeep";

export enum StoreEvents {
    Updated = 'updated',
}

export class Store extends EventBus{
    private state: Indexed = {};

    public getState() {
        return cloneDeep(this.state) as Indexed;
    }

    public set(path: string, value: unknown) {
        set(this.state, path, value);

        this.emit(StoreEvents.Updated);
    };
}

const store = new Store();



export function connect(mapStateToProps: (state: Indexed) => Indexed) {
    return function(Component: typeof Block) {
        return class extends Component {
            constructor(props: Indexed) {
                    // сохраняем начальное состояние
                let state = mapStateToProps(store.getState());

                console.log(state)

                super({...props, ...state});
    
                // подписываемся на событие
                store.on(StoreEvents.Updated, () => {
                    console.log('stateOnTrigger', state);
                        // при обновлении получаем новое состояние
                    const newState = mapStateToProps(store.getState());
                    console.log('state', state);
                    console.log('newState', newState);
                        // если что-то из используемых данных поменялось, обновляем компонент
                    if (!isEqual(state, newState)) {
                        console.log('update props from store');
                        
                        this.setProps({...newState});

                    }
                    //console.log('cloneDeep', this)
                    state = cloneDeep(newState) as Indexed;
                        // не забываем сохранить новое состояние
                    
                });
            }
        }
      }
  }

export default store;
