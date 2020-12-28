import thunk from 'redux-thunk';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import { Dispatch, Store } from '../types';

const initialState = { address: { tx_per_page: 10 } };

export const mockStore = (state = {}): MockStoreEnhanced<Store> =>
    configureMockStore<Store, Dispatch>([thunk])({ ...initialState, ...state });

export const runReducer = <T>(store: MockStoreEnhanced<Store>, reducer: any, initialState?: Partial<T>): T => {
    return store.getActions().reduce(reducer, initialState);
};
