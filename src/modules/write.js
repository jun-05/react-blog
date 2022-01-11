import { createAction, handleActions } from 'redux-actions';

import createRequestSaga, {
  createRequestActionTypes,
} from './../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE = 'write/INITIALIZE';
const CHANGE_FIELD = 'wrtite/INITIALIZE';
const [WRITE_POST, WRITE_POST_SUCCESS, WRITE_POST_FAILURE] =
  createRequestActionTypes('write/WRITE_POST');
const SET_ORGINAL_POST = 'write/SET_ORIGINAL_POST';
const [UPDATE_POST, UPDATE_POST_SUCCESS, UPDATE_POST_FAILURE] =
  createRequestActionTypes('write/UPDATE_POST');

export const setOriginalPost = createAction(SET_ORGINAL_POST, (post) => post);
export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const updatePost = createAction(
  UPDATE_POST,
  ({ title, body, tags, id }) => ({
    title,
    body,
    tags,
    id,
  }),
);

export const writePost = createAction(WRITE_POST, ({ title, body, tags }) => ({
  title,
  body,
  tags,
}));

const initialState = {
  title: '',
  body: '',
  tags: [],
  post: null,
  postError: null,
  originalPostId: null,
};

const writePostSaga = createRequestSaga(WRITE_POST, postsAPI.writePost);
const updatePostSaga = createRequestSaga(UPDATE_POST, postsAPI.updatePost);

export function* writeSaga() {
  yield takeLatest(WRITE_POST, writePostSaga);
  yield takeLatest(UPDATE_POST, updatePostSaga);
}
const write = handleActions(
  {
    [INITIALIZE]: (state) => initialState, //initisalState를 넣으면 초기 상태로 바뀜
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value, // 특정 key값을 업데이트
    }),
    [WRITE_POST]: (state) => ({
      ...state,
      post: null,
      postError: null,
    }),
    [WRITE_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    [WRITE_POST_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      postError,
    }),
    [SET_ORGINAL_POST]: (state, { payload: post }) => ({
      ...state,
      // ...post, 이게 안되나??
      title: post.title,
      body: post.body,
      tags: post.tags,
      originalPostId: post._id,
    }),
    [UPDATE_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    [UPDATE_POST_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      postError,
    }),
  },
  initialState,
);

export default write;
