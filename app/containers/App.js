import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectSubreddit, fetchPosts } from '../actions'
import PostList from '../components/PostList'
import Search from '../components/Search'

class App extends Component {
  static propTypes = {
    selectedSubreddit: PropTypes.string,
    posts: PropTypes.arrayOf(PropTypes.object),
    isFetching: PropTypes.bool,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func
  }

  componentDidMount = () => {
    const { dispatch, selectedSubreddit } = this.props

    dispatch(fetchPosts(selectedSubreddit))
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = nextProps
      dispatch(fetchPosts(selectedSubreddit))
    }
  }

  handleSubredditChange = (subreddit) => {
    const { dispatch } = this.props

    dispatch(selectSubreddit(subreddit))
  }

  render = () => (
    <div>
      <Search onSubmit={this.handleSubredditChange} />

      <div>
        <h2>Showing posts for: <em>{this.props.selectedSubreddit}</em></h2>
        <div>Last updated: <em>{this.props.lastUpdated}</em></div>
      </div>

      {this.props.isFetching ? (
        <div>Looking for <strong>{this.props.selectedSubreddit}</strong> posts...</div>
      ) : (
        <PostList posts={this.props.posts} />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  const { selectedSubreddit, postsBySubreddit } = state

  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: []
  }

  return {
    selectedSubreddit,
    isFetching,
    lastUpdated,
    posts
  }
}

export default connect(mapStateToProps)(App)
