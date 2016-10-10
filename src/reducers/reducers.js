import { combineReducers } from 'redux'
import initialState from './initialState'
import destinationReducer from './destinationReducer'

const bikeApp = combineReducers({
    destinationReducer
})

export default bikeApp
