import * as weather from '../actions/weather'
import initialState from './initialState'

function weatherReducer(state = initialState, action) {
    switch (action.type) {
        case weather.FETCH_DESTINATION_WEATHER_SUCCESS:
            return Object.assign({}, state, {
                destinationWeather: {
                    temp: action.destinationTemp,
                    wind: action.destinationWind,
                    precip: action.destinationPrecip,
                    snow: action.destinationSnow,
                    weatherIcon: action.destinationWeatherIcon
                }
            })
        case weather.FETCH_RETURN_WEATHER_SUCCESS:
            return Object.assign({}, state, {
                returnWeather: {
                    temp: action.returnTemp,
                    wind: action.returnWind,
                    precip: action.returnPrecip,
                    snow: action.returnSnow,
                    weatherIcon: action.returnWeatherIcon
                }
            })
        case weather.FETCHING:
            return Object.assign({}, state, {
                fetching: action.fetching
            })
        case weather.FETCH_WEATHER_ERROR:
            return Object.assign({}, state, {
                weatherError: action.weatherError
            })
        default:
            return state
    }
}



export default weatherReducer
