import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import reducers from '../reducers'

const logger = createLogger()

const middleware = [
  thunk,
  logger
]

const store = createStore(
  reducers,
  applyMiddleware(...middleware)
)

export default store
