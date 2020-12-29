import { AnyAction } from 'redux';
import { Home, HomeActions } from '../../../types';

export const homeReducer = (state: Home = { latest_transactions: [] }, action: AnyAction): Home => {
    switch (action.type) {
        case HomeActions.ERROR:
            return { ...state, error: true };
        case HomeActions.LATEST_TRANSACTION:
            const transactions = state.latest_transactions;
            return {
                latest_transactions: [...transactions.slice(transactions.length >= 5 ? 1 : null), action.payload],
            };
        default:
            return state;
    }
};
