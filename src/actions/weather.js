import fetch from 'isomorphic-fetch'
import moment from 'moment'

function ConvertTimeFormat(str) {
    let myDate = moment(str, ["h:mm:A"]).format('h:mm A')
    return myDate
}

function clearMinutes(str) {
    let colonIndex = str.indexOf(':')
    let middle = '00'
    let beginning = str.slice(0, colonIndex + 1)
    let end = str.slice(colonIndex + 3)
    let newTime = beginning.concat(middle, end)
    return newTime
}

export const FETCH_DESTINATION_WEATHER_SUCCESS = 'FETCH_DESTINATION_WEATHER_SUCCESS'
export const fetchDestinationWeatherSuccess = (destinationWeather) => {
    return {
        type: FETCH_DESTINATION_WEATHER_SUCCESS,
        destinationTemp: destinationWeather.temp.english,
        destinationWind: destinationWeather.wspd.english,
        destinationPrecip: destinationWeather.qpf.english,
        destinationSnow: destinationWeather.snow.english,
        destinationWeatherIcon: destinationWeather.icon_url
    }
}

export const FETCHING = 'FETCHING'
export const fetching = (bool) => {
  return {
    type: FETCHING,
    fetching: bool
  }
}

export const FETCH_RETURN_WEATHER_SUCCESS = 'FETCH_RETURN_WEATHER_SUCCESS'
export const fetchReturnWeatherSuccess = (returnWeather) => {
    return {
        type: FETCH_RETURN_WEATHER_SUCCESS,
        returnTemp: returnWeather.temp.english,
        returnWind: returnWeather.wspd.english,
        returnPrecip: returnWeather.qpf.english,
        returnSnow: returnWeather.snow.english,
        returnWeatherIcon: returnWeather.icon_url
    }
}

export const FETCH_WEATHER_ERROR = 'FETCH_WEATHER_ERROR'
export const fetchWeatherError = bool => {
    return {
        type: FETCH_WEATHER_ERROR,
        weatherError: bool
    }
}

export let fetchWeather = (location, time, assignment) => {
    return dispatch => {
        let timeFormatted = ConvertTimeFormat(time)
        let url = `http://api.wunderground.com/api/3cd1761cfe1a8ddb/hourly/q/${location.region}/${location.city}.json`
        return fetch(url).then(response => {
            if (response.status < 200 || response.status >= 300) {
                let error = new Error(response.statusText)
                error.response = response
                throw error
            }
            return response
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            let weather
            let topOfHour = clearMinutes(timeFormatted)
            for (let hourForecast of data.hourly_forecast) {
                if (hourForecast.FCTTIME.civil === topOfHour) {
                    weather = hourForecast
                    break
                }
            }

            let fetchDirection
            if (assignment === 'destination') {
                fetchDirection = dispatch(fetchDestinationWeatherSuccess(weather))
            } else {
                fetchDirection = dispatch(fetchReturnWeatherSuccess(weather))
                dispatch(fetching(true))
            }

            return fetchDirection
        })
        .catch(error => {
            console.log(error);
            return dispatch(fetchWeatherError(true))
        })
    }
}
