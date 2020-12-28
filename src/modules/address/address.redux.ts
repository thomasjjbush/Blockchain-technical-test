import { AnyAction } from 'redux';
import { Action, Address, AddressActions } from '../../../types';
import { fetchData } from '../../utils/fetch/fetch-data';

export const loadAddress = (address: string, multiplier: number): Action => async (dispatch, getState) => {
    const offset = multiplier * getState().address.tx_per_page;
    try {
        const res = await fetchData<Address>(`rawaddr/${address}`, { offset, limit: 10 });
        return dispatch({ type: AddressActions.LOADED, payload: res });
    } catch (err) {
        // REMOVE THIS NESTED TRY CATCH
        try {
            const multiRes = await fetchData<any>('multiaddr', { active: address, offset, limit: 10 });
            return dispatch({ type: AddressActions.LOADED, payload: { ...multiRes.addresses[0], txs: multiRes.txs } });
        } catch (err) {
            return dispatch({ type: AddressActions.ERROR });
        }
    }
};

export const addressReducer = (state: Address = { tx_per_page: 10 }, action: AnyAction): Address => {
    switch (action.type) {
        case AddressActions.ERROR:
            return { ...state, error: true };
        case AddressActions.LOADED:
            return { ...state, ...(action.payload as Address) };
        default:
            return state;
    }
};
