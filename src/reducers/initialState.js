const initialState = {
    findDestination: {
        city: null,
        latLng: {
            lat: null,
            lng: null
        },
        region: null
    },
    findReturnLocation: {
        city: null,
        latLng: {
            lat: null,
            lng: null
        },
        region: null
    },
    destination: {
        city: null,
        latLng: {
            lat: null,
            lng: null
        },
        region: null
    },
    haveLocations: false,
    returnLocation: {
        city: null,
        latLng: {
            lat: null,
            lng: null
        },
        region: null
    },
    destinationWeather: {
        precip: null,
        snow: null,
        temp: null,
        weatherIcon: null,
        wind: null
    },
    returnWeather: {
        precip: null,
        snow: null,
        temp: null,
        weatherIcon: null,
        wind: null
    },
    weatherError: false,
    fetching: false
}

export default initialState
