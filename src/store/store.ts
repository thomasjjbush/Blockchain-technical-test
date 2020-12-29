import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { addressReducer } from '../modules/address/address.redux';
import { homeReducer } from '../modules/home/home.redux';

export const store = createStore(
    combineReducers({ address: addressReducer, home: homeReducer }),
    applyMiddleware(thunk),
);
