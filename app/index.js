import store from './store'
import { selectSubreddit, fetchPosts } from './actions'
import './index.html'

store.dispatch(selectSubreddit('reactjs'))
store.dispatch(fetchPosts('reactjs'))
