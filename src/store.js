/* eslint-disable prettier/prettier */
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
} from './reducers/userReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
});

const userInfoFromStorage = async () =>
  (await AsyncStorage.getItem('userInfo'))
    ? JSON.stringify(AsyncStorage.getItem('userInfo'))
    : null;

const initialState = {
  userLogin: {userInfo: userInfoFromStorage},
};

console.log(initialState);
console.log(userInfoFromStorage);

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
