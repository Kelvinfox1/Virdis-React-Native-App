/* eslint-disable prettier/prettier */
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_RESET,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/userConstants';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const {data} = await axios.post(
      'https://virdismart.herokuapp.com/api/users/login',
      {email, password},
      config,
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    AsyncStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  AsyncStorage.removeItem('userInfo');

  dispatch({type: USER_LOGOUT});
  dispatch({type: USER_DETAILS_RESET});
};

export const register = (fname, lname, phone, email, password) => async (
  dispatch,
) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const {data} = await axios.post(
      'https://virdismart.herokuapp.com/api/users/',
      {fname, lname, phone, email, password},
      config,
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    AsyncStorage.setItem('userInfo', JSON.stringify(data));

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const {
      userLogin: {userInfo},
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const {data} = await axios.get(
      'https://virdismart.herokuapp.com/api/users/profile',
      config,
    );

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: message,
    });
  }
};
