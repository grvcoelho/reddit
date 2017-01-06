import React, { Component } from 'react'
import PostList from './PostList'
import Search from './Search'

class App extends Component {
  state = {}

  render = () => (
    <div>
      <Search onSubmit={x => console.info(x)} />

      <PostList />
    </div>
  )
}

export default App
