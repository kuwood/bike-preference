import { combineReducers } from 'redux'
import * as actions from '../actions/actions'
import initialState from './initialState'
import destinationReducer from './destinationReducer'

const bikeApp = combineReducers({
    destinationReducer
})

export default bikeApp
