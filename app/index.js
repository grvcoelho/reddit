import React from 'react'
import { render } from 'react-dom'
import Root from './containers/Root'
import store from './store'
import './index.html'

render(
  <Root store={store} />,
  document.getElementById('app')
)

