import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import createRequestSaga, {
  createRequestActionTypes,
} from './../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';
import { takeLatest } from 'redux-saga/effects';

// const SAMPLE_ACTION = 'auth/SAMPLE_ACTION';

// export const sampleAction = createAction(SAMPLE_ACTION);

// const initialState = {};

// const auth = handleActions(
//   {
//     [SAMPLE_ACTION]: (state, action) => state,
//   },
//   initialState,
// );

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FROM';
const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] =
  createRequestActionTypes('auth/REGISTER');
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes('auth/LOGIN');

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form,
    key,
    value,
  }),
);

export const register = createAction(REGISTER, ({ username, password }) => ({
  username,
  password,
}));

export const login = createAction(LOGIN, ({ username, password }) => ({
  username,
  password,
}));

export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);

const initialState = {
  register: {
    username: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    username: '',
    password: '',
  },
  auth: null,
  authError: null,
};

const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);

export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
}

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
    }),

    //회원가입 성공
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    //회원가입 실패
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    //로그인 성공
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    //로그인 실패
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
  },
  initialState,
);

export default auth;
