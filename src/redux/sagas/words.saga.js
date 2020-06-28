import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import ActionTypes from '../actions';
import { ADD_WORD_VALIDATION_ERROR } from '../../constants/modals.constants';
import { TOKEN_KEY } from '../../constants/localStorageKeys.constants';

const {
  CLEAR_USER,
  DELETE_WORD_FAILURE,
  DELETE_WORD_REQUEST,
  DELETE_WORD_SUCCESS,
  FETCH_WORDS_FAILURE,
  FETCH_WORDS_REQUEST,
  FETCH_WORDS_SUCCESS,
  GENERATE_QUIZ_FAILURE,
  GENERATE_QUIZ_REQUEST,
  GENERATE_QUIZ_SUCCESS,
  GET_WORD_FAILURE,
  GET_WORD_REQUEST,
  GET_WORD_SUCCESS,
  SAVE_WORDS_FAILURE,
  SAVE_WORDS_REQUEST,
  SAVE_WORDS_SUCCESS,
  SET_MODAL_DATA,
  SET_MODAL_STATE,
  SET_TAB_VALUE,
  UPDATE_WORD_REQUEST,
  UPDATE_WORD_SUCCESS,
  UPDATE_WORD_FAILURE,
  VERIFY_QUIZ_REQUEST,
  VERIFY_QUIZ_SUCCESS,
  VERIFY_QUIZ_FAILURE
} = ActionTypes;

const url = 'http://localhost:8080/api/words/';

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
    }

    return config;
  },
  error => {
    Promise.reject(error)
  }
);

function getStatusCode(error) {
  return error && error.response && error.response.status;
}

export function* deleteWord(action) {
  try {
    const { id, listType } = action.payload;
    const { data } = yield call(axios.delete, `${url}/${id}`);

    yield put({ type: DELETE_WORD_SUCCESS,  payload: { data, listType } });
  } catch (error) {
    yield put({ type: DELETE_WORD_FAILURE, payload: error.message });
  }
}

export function* fetchWords(action) {
  try {
    const { fields, limit = 50, listType, skip = 0, sortDirection, sortProp } = action.payload;
    const { data } = yield call(
      axios.get, url, { params: { fields, limit, skip, sortDirection, sortProp } }
    );

    yield put({ type: FETCH_WORDS_SUCCESS,  payload: { data, listType } });
  } catch (error) {
    const code = getStatusCode(error);

    if (code !== 401) {
      yield put({ type: FETCH_WORDS_FAILURE, payload: error.message });

      return;
    }

    yield put({ type: SET_TAB_VALUE, payload: 3 });
    yield put({ type: CLEAR_USER });
  }
}

export function* generateQuiz(action) {
  try {
    const { listType, reqData } = action.payload;
    const { data } = yield call(axios.post, `${url}/quiz`, reqData);

    yield put({ type: GENERATE_QUIZ_SUCCESS,  payload: { data, listType } });
  } catch (error) {
    const code = getStatusCode(error);

    if (code !== 401) {
      yield put({ type: GENERATE_QUIZ_FAILURE, payload: error.message });

      return;
    }

    yield put({ type: SET_TAB_VALUE, payload: 3 });
    yield put({ type: CLEAR_USER });
  }
}

export function* getWord(action) {
  try {
    const id = action.payload;
    const { data } = yield call(axios.get, `${url}/${id}`);

    yield put({ type: GET_WORD_SUCCESS,  payload: data });
  } catch (error) {
    const code = getStatusCode(error);

    if (code !== 401) {
      yield put({ type: GET_WORD_FAILURE, payload: error.message });

      return;
    }

    yield put({ type: SET_TAB_VALUE, payload: 3 });
    yield put({ type: CLEAR_USER });
  }
}

function* saveWords(action) {
  try {
    const data = action.payload;
    const resp = yield call(
      axios.post, url, { data }, { validateStatus: status => status === 200 || status === 422 }
    );

    yield put({ type: SAVE_WORDS_SUCCESS,  payload: resp.data });

    yield put({ type: SET_TAB_VALUE, payload: 0 });

    if (resp.status === 422) {
      yield put({ type: SET_MODAL_DATA, payload: resp.data.errors });

      yield put({
        type: SET_MODAL_STATE,
        payload: { type: ADD_WORD_VALIDATION_ERROR, value: true }
      });
    }
  } catch (error) {
    const code = getStatusCode(error);

    if (code !== 401) {
      yield put({ type: SAVE_WORDS_FAILURE, payload: error.message });

      return;
    }

    yield put({ type: SET_TAB_VALUE, payload: 3 });
    yield put({ type: CLEAR_USER });
  }
}

function* updateWord(action) {
  try {
    const { id, listType, data } = action.payload;
    const resp = yield call(axios.put, `${url}/${id}`, { ...data });

    yield put({ type: UPDATE_WORD_SUCCESS, payload: { data: resp.data, listType } });
  } catch (error) {
    const code = getStatusCode(error);

    if (code !== 401) {
      yield put({ type: UPDATE_WORD_FAILURE, payload: error.message });

      return;
    }

    yield put({ type: SET_TAB_VALUE, payload: 3 });
    yield put({ type: CLEAR_USER });
  }
}

function* verifyQuiz(action) {
  try {
    yield call(axios.put, url, { ids: action.payload });

    yield put({ type: VERIFY_QUIZ_SUCCESS });
  } catch (error) {
    const code = getStatusCode(error);

    if (code !== 401) {
      yield put({ type: VERIFY_QUIZ_FAILURE, payload: error.message });

      return;
    }

    yield put({ type: SET_TAB_VALUE, payload: 3 });
    yield put({ type: CLEAR_USER });
  }
}

export default [
  takeLatest(DELETE_WORD_REQUEST, deleteWord),
  takeLatest(FETCH_WORDS_REQUEST, fetchWords),
  takeLatest(GENERATE_QUIZ_REQUEST, generateQuiz),
  takeLatest(GET_WORD_REQUEST, getWord),
  takeLatest(SAVE_WORDS_REQUEST, saveWords),
  takeLatest(UPDATE_WORD_REQUEST, updateWord),
  takeLatest(VERIFY_QUIZ_REQUEST, verifyQuiz)
];
