import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import bikeApp from './reducers/reducers'

let store = createStore(bikeApp, applyMiddleware(thunk))

export default store
