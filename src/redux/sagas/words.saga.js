import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import ActionTypes from '../actions';
import { ADD_WORD_VALIDATION_ERROR } from '../../constants/modals.constants';

const {
  FETCH_WORDS_FAILURE,
  FETCH_WORDS_REQUEST,
  FETCH_WORDS_SUCCESS,
  SAVE_WORDS_FAILURE,
  SAVE_WORDS_REQUEST,
  SAVE_WORDS_SUCCESS,
  SET_MODAL_DATA,
  SET_MODAL_STATE,
  SET_TAB_VALUE
} = ActionTypes;

const url = 'http://localhost:8080/api/words/';

export function* fetchWords(action) {
  try {
    const { fields, limit = 50, skip = 0 } = action.payload;
    const { data } = yield call(
      axios.get, url, { params: { fields, limit, skip } }
    );

    yield put({
      type: FETCH_WORDS_SUCCESS,
      payload: { ...data },
    });
  } catch (error) {
    yield put({ type: FETCH_WORDS_FAILURE, payload: error.message });
  }
}

function* saveWords(action) {
  try {
    const data = action.payload;
    const resp = yield call(
      axios.post, url, { data }, { validateStatus: status => status === 200 || status === 422 }
    );

    console.log(1, resp)
    yield put({
      type: SAVE_WORDS_SUCCESS,
      payload: resp.data,
    });

    yield put({ type: SET_TAB_VALUE, payload: 0 });

    if (resp.status === 422) {
      yield put({ type: SET_MODAL_DATA, payload: resp.data.errors });

      yield put({
        type: SET_MODAL_STATE,
        payload: { type: ADD_WORD_VALIDATION_ERROR, value: true }
      });
    }
  } catch (error) {
    yield put({ type: SAVE_WORDS_FAILURE, payload: error.message });
  }
}

export default [
  takeLatest(FETCH_WORDS_REQUEST, fetchWords),
  takeLatest(SAVE_WORDS_REQUEST, saveWords),
];
