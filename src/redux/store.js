import { createStore } from 'redux';
import allReducers from "../redux/reducers/allReducers";
import { persistStore } from 'redux-persist';

const store  = persistStore(createStore(allReducers))


export default store

