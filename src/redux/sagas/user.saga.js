import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import ActionTypes from '../actions';
import { LOCAL, PROD } from './api.config';

const {
  CLEAR_USER,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  SET_TAB_VALUE
} = ActionTypes;

const baseUrl = process.env.NODE_ENV === 'production' ? PROD : LOCAL;

export function* login(action) {
  try {
    const { data } = yield call(axios.post, `${baseUrl}/auth/login`, action.payload);

    yield put({ type: LOGIN_SUCCESS,  payload: data });
    yield put({ type: SET_TAB_VALUE, payload: 0 });
  } catch (error) {
    yield put({ type: LOGIN_FAILURE, payload: error.message });
  }
}

export function* logout() {
  try {
    yield call(axios.get, `${baseUrl}logout`);

    yield put({ type: CLEAR_USER });
    yield put({ type: SET_TAB_VALUE, payload: 0 });
  } catch (error) {
    yield put({ type: LOGOUT_FAILURE, payload: error.message });
  }
}

export default [
  takeLatest(LOGIN_REQUEST, login),
  takeLatest(LOGOUT_REQUEST, logout)
];
