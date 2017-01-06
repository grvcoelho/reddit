import React, { Component, PropTypes } from 'react'

class PostList extends Component {
  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.object)
  }

  state = {
    data: [{
      author: 'grvcoelho',
      title: 'Introducing React Terraform',
      ups: 28,
      permalink: '/r/reactjs/comments/asdasdasd/123123'
    }, {
      author: 'salt3g',
      title: 'Say hello to my little friend',
      ups: 35,
      permalink: '/r/reactjs/comments/salt3g/asdasd'
    }]
  }

  getPostHash = post => `${post.title}${post.permalink}${post.author}`

  render = () => (
    this.state.data.length ? (
      <div>
        {this.state.data.map(post => (
          <div key={this.getPostHash(post)}>
            <h3>{post.title} <em>({post.ups} upvotes)</em></h3>
            <em>By <strong>{post.author}</strong></em>
            <div>
              <a href={`https://reddit.com${post.permalink}}`}>See the full story</a>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div>No posts found</div>
    )
  )
}

export default PostList
