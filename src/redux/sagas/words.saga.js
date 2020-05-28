import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import ActionTypes from '../actions';

const {
  FETCH_WORDS_FAILURE,
  FETCH_WORDS_REQUEST,
  FETCH_WORDS_SUCCESS
} = ActionTypes

export function* fetchWords(action) {
  try {
    const { data } = yield call(axios.get, 'http://localhost:8080/api/words/');

    yield put({
      type: FETCH_WORDS_SUCCESS,
      payload: { ...data },
    });
  } catch (error) {
    yield put({ type: FETCH_WORDS_FAILURE, payload: error.message });
  }
}

export default [
  takeLatest(FETCH_WORDS_REQUEST, fetchWords),
];
