import {fork, all} from 'redux-saga/effects';
import axios from 'axios';

import postSaga from './post';
import userSaga from './user';
import {backURL} from '../config/config';

axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)]);
}
