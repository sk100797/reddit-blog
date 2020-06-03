export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const SELECT_REDDIT_VALUE = "SELECT_REDDIT_VALUE";
export const INVALIDATE_REDDIT = "INVALIDATE_REDDIT";

export const selectReddit = (redditValue) => {
  return {
    type: SELECT_REDDIT_VALUE,
    redditValue,
  };
};

export const requestPosts = (redditValue) => {
  return {
    type: REQUEST_POSTS,
    redditValue,
  };
};

export const receivePosts = (redditValue, posts) => {
  return {
    type: RECEIVE_POSTS,
    redditValue,
    posts,
    receivedAt: new Date().setMilliseconds(0),
  };
};

export const invalidateReddit = (redditValue) => {
    return {
        type: INVALIDATE_REDDIT,
        redditValue
    }
}