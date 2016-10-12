import { combineReducers } from 'redux'
import initialState from './initialState'
import destinationReducer from './destinationReducer'
import weatherReducer from './weatherReducer'

const bikeApp = combineReducers({
    destinationReducer,
    weatherReducer
})

export default bikeApp
