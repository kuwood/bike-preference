import * as destinationActions from '../actions/destination'
import * as actions from '../actions/actions'
import initialState from './initialState'

function destinationReducer(state = initialState, action) {
    switch (action.type) {
        case destinationActions.FETCH_WEATHER_SUCCESS:
            return Object.assign({}, state, {
                destinationTemp: action.destinationTemp,
                destinationWind: action.destinationWind,
                destinationPrecip: action.destinationPrecip,
                destinationSnow: action.destinationSnow,
                destinationWeatherIcon: action.destinationWeatherIcon
            })
        case destinationActions.FETCH_WEATHER_ERROR:
            return Object.assign({}, state, {
                destinationTemp: 'N/A',
                destinationWind: 'N/A',
                destinationPrecip: 'N/A',
                destinationSnow: 'N/A',
                destinationWeatherIcon: 'N/A'
            })
        case actions.SET_DESTINATION:
            console.log('hit set destination reducer')
            console.log(action.regionDestination, 'action region')
            console.log(action.cityDestination, 'action city')
            return Object.assign({}, state, {
                regionDestination: action.regionDestination,
                cityDestination: action.cityDestination,
                latLngDestination: action.latLngDestination
            })
        // case actions.SET_DESTINATION_ROUTE:
        //     console.log('hit setDestinationRoute reducer');
        //     console.log(action.setDestinationRoute, 'directions');
        //     return Object.assign({}, state, {
        //         destinationRoute: action.destinationRoute
        //     })
        case actions.SET_RETURN_DESTINATION:
            return Object.assign({}, state, {
                cityReturnDestination: action.cityReturnDestination,
                regionReturnDestination: action.regionReturnDestination,
                latLngReturnDestination: action.latLngReturnDestination
            })
        case actions.HAVE_LOCATIONS:
            return Object.assign({}, state, {
                haveLocations: action.haveLocations
            })
        default:
            return state
    }
}



export default destinationReducer
