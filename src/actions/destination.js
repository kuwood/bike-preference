export const SET_DESTINATION = 'SET_DESTINATION'
export const setDestination = (city, region, latLng) => {
    console.log("hit setDestination action");
    return {
        type: 'SET_DESTINATION',
        cityDestination: city,
        regionDestination: region,
        latLngDestination: latLng
    }
}

export const SET_RETURN_DESTINATION = 'SET_RETURN_DESTINATION'
export const setReturnDestination = (city, region, latLng) => {
    console.log("hit setReturnDestination action");
    return {
        type: 'SET_RETURN_DESTINATION',
        cityReturnDestination: city,
        regionReturnDestination: region,
        latLngReturnDestination: latLng
    }
}

export const HAVE_LOCATIONS = 'HAVE_LOCATIONS'
export const haveLocations = () => {
    return {
        type: 'HAVE_LOCATIONS',
        haveLocations: true
    }
}
