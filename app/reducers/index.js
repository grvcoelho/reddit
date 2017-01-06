import { combineReducers } from 'redux'

import {
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  POSTS_REQUEST,
  POSTS_SUCCESS,
  POSTS_FAILURE
} from '../actions'

function errors (state = '', action) {
  const { error, payload } = action

  if (error) {
    return payload.message
  }

  return state
}

function selectedSubreddit (state = 'reactjs', action) {
  const { type, payload } = action

  switch (type) {
    case SELECT_SUBREDDIT:
      return payload.subreddit

    default:
      return state
  }
}

function posts (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  const { type, payload } = action

  switch (type) {
    case INVALIDATE_SUBREDDIT:
      return {
        ...state,
        didInvalidate: true
      }

    case POSTS_REQUEST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }

    case POSTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: payload.posts,
        lastUpdated: action.receivedAt
      }

    case POSTS_FAILURE:
      return {
        ...state,
        isFetching: false
      }

    default:
      return state
  }
}

function postsBySubreddit (state = {}, action) {
  const { type, payload } = action

  switch (type) {
    case INVALIDATE_SUBREDDIT:
    case POSTS_REQUEST:
    case POSTS_SUCCESS:
    case POSTS_FAILURE:
      console.info(state, payload)
      return {
        ...state,
        [payload.subreddit]: posts(state[payload.subreddit], action)
      }

    default:
      return state
  }
}

const reducers = combineReducers({
  errors,
  selectedSubreddit,
  postsBySubreddit
})

export default reducers

