import * as weather from '../actions/weather'
import initialState from './initialState'

function weatherReducer(state = initialState, action) {
    switch (action.type) {
        case weather.FETCH_DESTINATION_WEATHER_SUCCESS:
            return Object.assign({}, state, {
                destinationTemp: action.destinationTemp,
                destinationWind: action.destinationWind,
                destinationPrecip: action.destinationPrecip,
                destinationSnow: action.destinationSnow,
                destinationWeatherIcon: action.destinationWeatherIcon
            })
        case weather.FETCH_DESTINATION_WEATHER_ERROR:
            return Object.assign({}, state, {
                destinationTemp: 'N/A',
                destinationWind: 'N/A',
                destinationPrecip: 'N/A',
                destinationSnow: 'N/A',
                destinationWeatherIcon: 'N/A'
            })
        case weather.FETCH_RETURN_WEATHER_SUCCESS:
            return Object.assign({}, state, {
                returnTemp: action.returnTemp,
                returnWind: action.returnWind,
                returnPrecip: action.returnPrecip,
                returnSnow: action.returnSnow,
                returnWeatherIcon: action.returnWeatherIcon
            })
        case weather.FETCH_RETURN_WEATHER_ERROR:
            return Object.assign({}, state, {
                returnTemp: 'N/A',
                returnWind: 'N/A',
                returnPrecip: 'N/A',
                returnSnow: 'N/A',
                error: error
            })
        default:
            return state
    }
}



export default weatherReducer
