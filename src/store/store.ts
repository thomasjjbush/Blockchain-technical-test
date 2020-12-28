import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { addressReducer } from '../modules/address/address.redux';

export const store = createStore(combineReducers({ address: addressReducer }), applyMiddleware(thunk));
