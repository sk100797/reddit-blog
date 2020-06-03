import { all, select, fork, put, call, take } from "redux-saga/effects";
import axios from "axios";

import * as actions from "../actions";

const selectedRedditValueSelector = (state) => state.selectedReddit;

const postsByRedditSelector = (state) => state.postsByReddit;

const fetchPostsAPI = (redditValue) => {
  return axios
    .get(`https://www.reddit.com/r/${redditValue}.json`)
    .then((res) => res.data.data.children.map((child) => child.data));
};

function* fetchPosts(redditValue) {
  yield put(actions.requestPosts(redditValue));
  const posts = yield call(fetchPostsAPI, redditValue);
  yield put(actions.receivePosts(redditValue, posts));
}

function* invalidateReddit() {
    while(true) {
        const { redditValue } = yield take(actions.INVALIDATE_REDDIT)
        yield call(fetchPosts,redditValue)
    }
}

function* nextRedditChange() {
  while (true) {
    const prevReddit = yield select(selectedRedditValueSelector);
    yield take(actions.SELECT_REDDIT_VALUE);

    const newReddit = yield select(selectedRedditValueSelector);
    const postsByReddit = yield select(postsByRedditSelector);
    if (prevReddit !== newReddit && !postsByReddit[newReddit]) {
      yield fork(fetchPosts, newReddit);
    }
  }
}

function* startup() {
  const selectedRedditValue = yield select(selectedRedditValueSelector);
  yield fork(fetchPosts, selectedRedditValue);
}

export default function* root() {
  yield all([startup(), nextRedditChange(), invalidateReddit()]);
}
