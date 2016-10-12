import * as destination from '../actions/destination'
import initialState from './initialState'

function destinationReducer(state = initialState, action) {
    switch (action.type) {
        case destination.SET_DESTINATION:
            console.log('hit set destination reducer')
            console.log(action.regionDestination, 'action dest region')
            console.log(action.cityDestination, 'action dest city')
            console.log(action.latLngDestination, 'action dest latLNG')
            return Object.assign({}, state, {
                destination: {
                    region: action.regionDestination,
                    city: action.cityDestination,
                    latLng: action.latLngDestination
                }
            })
        case destination.SET_RETURN_DESTINATION:
            console.log('hit set return destination reducer')
            console.log(action.regionReturnDestination, 'action return region')
            console.log(action.cityReturnDestination, 'action return city')
            console.log(action.latLngReturnDestination, 'action return latLNG')
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
        default:
            return state
    }
}



export default destinationReducer
