import React, { Component } from 'react'

class Search extends Component {
  state = {
    term: ''
  }

  handleChange = (event) => {
    const term = event.target.value

    this.setState({ term })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    this.props.onSubmit(this.state.term)
  }

  render = () => (
    <form onSubmit={this.handleSubmit}>
      <input value={this.state.term} onChange={this.handleChange} />
      <button type="submit">search</button>
    </form>
  )
}

export default Search

