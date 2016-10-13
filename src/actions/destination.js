export const FIND_DESTINATION = 'FIND_DESTINATION'
export const findDestination = (city, region, latLng) => {
    return {
        type: 'FIND_DESTINATION',
        cityDestination: city,
        regionDestination: region,
        latLngDestination: latLng
    }
}

export const FIND_RETURN_DESTINATION = 'FIND_RETURN_DESTINATION'
export const findReturnDestination = (city, region, latLng) => {
    return {
        type: 'FIND_RETURN_DESTINATION',
        cityReturnDestination: city,
        regionReturnDestination: region,
        latLngReturnDestination: latLng
    }
}

export const SET_DESTINATION = 'SET_DESTINATION'
export const setDestination = (findDestination) => {
    console.log(findDestination);
    return {
        type: 'SET_DESTINATION',
        cityDestination: findDestination.city,
        regionDestination: findDestination.region,
        latLngDestination: findDestination.latLng
    }
}

export const SET_RETURN_DESTINATION = 'SET_RETURN_DESTINATION'
export const setReturnDestination = (findReturnDestination) => {
    return {
        type: 'SET_RETURN_DESTINATION',
        cityReturnDestination: findReturnDestination.city,
        regionReturnDestination: findReturnDestination.region,
        latLngReturnDestination: findReturnDestination.latLng
    }
}

export const HAVE_LOCATIONS = 'HAVE_LOCATIONS'
export const haveLocations = () => {
    return {
        type: 'HAVE_LOCATIONS',
        haveLocations: true
    }
}

export const DONT_HAVE_LOCATIONS = 'DONT_HAVE_LOCATIONS'
export const dontHaveLocations = () => {
    return {
        type: 'DONT_HAVE_LOCATIONS',
        haveLocations: false
    }
}
