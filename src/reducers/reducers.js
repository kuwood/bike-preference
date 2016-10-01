import { combineReducers } from 'redux'
import * as actions from '../actions/actions'
import initialState from './initialState'
import destinationReducer from './destinationReducer'

// function bikeApp(state, action) {
//     state = state || initialState
//     switch (action.type) {
//         case actions.SET_ROUTE:
//             console.log("hit SET_ROUTE reducer");
//             return Object.assign({}, state, {
//                 destination: action.destination,
//                 leaveTime: action.leaveTime,
//                 returnDestination: action.returnDestination,
//                 returnTime: action.returnTime
//             })
//         default:
//             return state
//     }
// }

const bikeApp = combineReducers({
    destinationReducer
})

export default bikeApp
