import fetch from 'isomorphic-fetch'
import moment from 'moment'



export const SET_DESTINATION = 'SET_DESTINATION'
export const setDestination = (city, region, latLng) => {
    console.log("hit setRoute action");
    return {
        type: 'SET_DESTINATION',
        cityDestination: city,
        regionDestination: region,
        latLngDestination: latLng
    }
}

// export const SET_DESTINATION_ROUTE = 'SET_DESTINATION_ROUTE'
// export const setDestinationRoute = (directions) => {
//     console.log('hit setDestinationRoute action');
//     return {
//         type: 'SET_DESTINATION_ROUTE',
//         destinationRoute: directions
//     }
// }

export const SET_RETURN_DESTINATION = 'SET_RETURN_DESTINATION'
export const setReturnDestination = (city, region, latLng) => {
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
