import { combineReducers } from "redux";

import * as actions from "../actions";

const selectedReddit = (state = "reactjs", action) => {
  switch (action.type) {
    case actions.SELECT_REDDIT_VALUE:
      return action.redditValue;
    default:
      return state;
  }
};

const initialState = {
  isFetching: false,
  items: [],
};

const posts = (state=initialState, action) => {
    switch (action.type) {
        case actions.REQUEST_POSTS:
          return {
            ...state,
            isFetching: true,
          };
        case actions.RECEIVE_POSTS:
            return {
                ...state,
                isFetching: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            }
        default:
            return state
      }
}

const postsByReddit = (state = {}, action) => {
  switch (action.type) {
    case actions.REQUEST_POSTS:
    case actions.RECEIVE_POSTS:
        return {
            ...state,
            [action.redditValue]: posts(state[action.redditValue],action)
        }
    default:
        return state
  }
};

export default combineReducers({
  selectedReddit,
  postsByReddit
});
