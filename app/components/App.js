import React, { Component } from 'react'
import Search from './Search'

class App extends Component {
  state = {}

  render = () => (
    <Search onSubmit={x => console.info(x)} />
  )
}

export default App
