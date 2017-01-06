import fetch from 'isomorphic-fetch'

export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'
export const POSTS_REQUEST = 'POSTS_REQUEST'
export const POSTS_SUCCESS = 'POSTS_SUCCESS'
export const POSTS_FAILURE = 'POSTS_FAILURE'

export const selectSubreddit = subreddit => ({
  type: SELECT_SUBREDDIT,
  payload: {
    subreddit
  }
})

export const invalidateSubreddit = subreddit => ({
  type: INVALIDATE_SUBREDDIT,
  payload: {
    subreddit
  }
})

const actionCreator = (type, payload = {}, error = false) => ({
  type,
  payload,
  error
})

export const fetchPosts = subreddit => (dispatch) => {
  dispatch(actionCreator(POSTS_REQUEST, { subreddit }))

  fetch(`https://www.reddit.com/r/${subreddit}.json`)
    .then(res => res.json())
    .then(json => json.data.children.map(child => child.data))
    .then(posts => dispatch(actionCreator(POSTS_SUCCESS, { posts, subreddit })))
    .catch(err => dispatch(actionCreator(POSTS_FAILURE, err, true)))
}

const shouldFetchPosts = (state, subreddit) => {
  const posts = state.postsBySubreddit[subreddit]

  if (!posts) {
    return true
  }

  if (posts.isFetching) {
    return false
  }

  return posts.didInvalidate
}

export const fetchPostsIfNeeded = subreddit => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), subreddit)) {
    dispatch(fetchPosts(subreddit))
  }
}
