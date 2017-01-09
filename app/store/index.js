import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import reducers from '../reducers'
import DevTools from '../containers/DevTools'

const logger = createLogger()
const devtools = DevTools.instrument()

const middleware = [
  thunk,
  logger
]

const store = createStore(
  reducers,
  compose(
    applyMiddleware(...middleware),
    devtools
  )
)

export default store
