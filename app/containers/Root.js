import React from 'react'
import { Provider } from 'react-redux'
import App from './App'
import DevTools from './Devtools'

const Root = ({ store }) => (
  <Provider store={store}>
    <div>
      <App />
      <DevTools />
    </div>
  </Provider>
)

export default Root
