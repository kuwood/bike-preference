import * as destination from '../actions/destination'
import initialState from './initialState'

function destinationReducer(state = initialState, action) {
    switch (action.type) {
        case destination.FIND_DESTINATION:
            return Object.assign({}, state, {
                findDestination: {
                    region: action.regionDestination,
                    city: action.cityDestination,
                    latLng: action.latLngDestination
                }
            })
        case destination.FIND_RETURN_DESTINATION:
            return Object.assign({}, state, {
                findReturnLocation: {
                    city: action.cityReturnDestination,
                    region: action.regionReturnDestination,
                    latLng: action.latLngReturnDestination
                }
            })
        case destination.SET_DESTINATION:
            return Object.assign({}, state, {
                destination: {
                    region: action.regionDestination,
                    city: action.cityDestination,
                    latLng: action.latLngDestination
                }
            })
        case destination.SET_RETURN_DESTINATION:
            return Object.assign({}, state, {
                returnLocation: {
                    city: action.cityReturnDestination,
                    region: action.regionReturnDestination,
                    latLng: action.latLngReturnDestination
                }
            })
        case destination.HAVE_LOCATIONS:
            return Object.assign({}, state, {
                haveLocations: action.haveLocations
            })
        case destination.DONT_HAVE_LOCATIONS:
            return Object.assign({}, state, {
                haveLocations: action.dontHaveLocations
            })
        default:
            return state
    }
}



export default destinationReducer
