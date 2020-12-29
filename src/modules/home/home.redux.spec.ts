import { MockStoreEnhanced } from 'redux-mock-store';
import { mockStore, runReducer } from '../../../test/jest.utils';
import { homeReducer } from './home.redux';
import { Dispatch, Home, HomeActions, Store, Txs } from '../../../types';

describe('Home redux', () => {
    const initialState = { latest_transactions: [] as Txs[] };
    let store: MockStoreEnhanced<Partial<Store>, Dispatch>;

    beforeEach(() => {
        jest.clearAllMocks();
        store = mockStore();
    });

    it('should update store correctly when home error action is dispatched', () => {
        store.dispatch({ type: HomeActions.ERROR });
        expect(runReducer<Home>(store, homeReducer, initialState)).toEqual({ ...initialState, error: true });
    });

    it('should update store correctly when an item is loaded', () => {
        store.dispatch({ type: HomeActions.LATEST_TRANSACTION, payload: 'hey' });
        expect(runReducer<Home>(store, homeReducer, initialState)).toEqual({ latest_transactions: ['hey'] });
    });

    it('should update store correctly when an item is loaded but there already 5 items', () => {
        store.dispatch({ type: HomeActions.LATEST_TRANSACTION, payload: 6 });
        expect(
            runReducer<Home>(store, homeReducer, { latest_transactions: [1, 2, 3, 4, 5] as any[] }),
        ).toEqual({ latest_transactions: [2, 3, 4, 5, 6] });
    });
});
