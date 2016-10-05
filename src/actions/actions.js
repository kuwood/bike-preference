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

export const SET_DESTINATION_ROUTE = 'SET_DESTINATION_ROUTE'
export const setDestinationRoute = (directions) => {
    console.log('hit setDestinationRoute action');
    return {
        type: 'SET_DESTINATION_ROUTE',
        destinationRoute: directions
    }
}
