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

export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS'
export const fetchWeatherSuccess = (destinationWeather) => {
    return {
        type: FETCH_WEATHER_SUCCESS,
        destinationTemp: destinationWeather.temp.english,
        destinationWind: destinationWeather.wspd.english,
        destinationPrecip: destinationWeather.qpf.english,
        destinationSnow: destinationWeather.snow.english,
        destinationWeatherIcon: destinationWeather.icon_url
    }
}

export const FETCH_WEATHER_ERROR = 'FETCH_WEATHER_ERROR'
export const fetchWeatherError = (destinationWeather, error) => {
    return {
        type: FETCH_WEATHER_ERROR,
        destinationTemp: 'N/A',
        destinationWind: 'N/A',
        destinationPrecip: 'N/A',
        destinationSnow: 'N/A',
        error: error
    }
}

export let fetchWeather = (destination, time) => {
    return dispatch => {
        console.log(destination, 'fetchWeater')
        let timeFormatted = ConvertTimeFormat(time)
        console.log(timeFormatted)
        let url = `http://api.wunderground.com/api/3cd1761cfe1a8ddb/hourly/q/${destination.region}/${destination.city}.json`
        console.log(url)
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
            let destinationWeather
            let topOfHour = clearMinutes(timeFormatted)
            for (let hourForecast of data.hourly_forecast) {
                if (hourForecast.FCTTIME.civil === topOfHour) {
                    destinationWeather = hourForecast
                    break
                }
            }
            console.log(destinationWeather)
            return dispatch(fetchWeatherSuccess(destinationWeather))
        })
        .catch(error => {
            return dispatch(console.log(error))
        })
    }
}
