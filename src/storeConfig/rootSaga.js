import { all } from 'redux-saga/effects';

import wordsSagas from '../redux/sagas/words.saga';

export default function* rootSaga() {
  yield all([ ...wordsSagas ]);
}
