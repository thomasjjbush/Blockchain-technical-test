import { MockStoreEnhanced } from 'redux-mock-store';
import { addressReducer, loadAddress } from './address.redux';
import { mockStore, runReducer } from '../../../test/jest.utils';
import { fetchData } from '../../utils/fetch/fetch-data';
import { Address, AddressActions, Dispatch, Store } from '../../../types';

jest.mock('../../utils/fetch/fetch-data', () => ({ fetchData: jest.fn().mockResolvedValue({ res: 'res' }) }));

describe('Address redux', () => {
    const initialState = { tx_per_page: 10 };
    let store: MockStoreEnhanced<Partial<Store>, Dispatch>;

    beforeEach(() => {
        jest.clearAllMocks();
        store = mockStore();
    });

    it('should invoke fetchData with correct arguments', async () => {
        await store.dispatch(loadAddress('address', 0));
        expect(fetchData).toHaveBeenCalledTimes(1);
        expect(fetchData).toHaveBeenCalledWith('rawaddr/address', { limit: 10, offset: 0 });
    });

    it('should dispatch correct actions and update store if promise resolves', async () => {
        await store.dispatch(loadAddress('address', 0));
        expect(store.getActions()).toEqual([{ payload: { res: 'res' }, type: AddressActions.LOADED }]);
        expect(runReducer<Address>(store, addressReducer, initialState)).toEqual({ ...initialState, res: 'res' });
    });

    it('should dispatch correct actions and update store if promise rejects', async () => {
        (fetchData as jest.Mock).mockRejectedValue('error');
        await store.dispatch(loadAddress('address', 0));
        expect(store.getActions()).toEqual([{ type: AddressActions.ERROR }]);
        expect(runReducer<Address>(store, addressReducer, initialState)).toEqual({ ...initialState, error: true });
    });
});
