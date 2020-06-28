import { all } from 'redux-saga/effects';

import wordsSagas from '../redux/sagas/words.saga';
import userSagas from '../redux/sagas/user.saga';

export default function* rootSaga() {
  yield all([ ...userSagas, ...wordsSagas ]);
}
