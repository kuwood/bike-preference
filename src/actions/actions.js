import fetch from 'isomorphic-fetch'
import moment from 'moment'



export const SET_DESTINATION = 'SET_DESTINATION'
export const setDestination = (city, region) => {
    console.log("hit setRoute action");
    return {
        type: 'SET_DESTINATION',
        cityDestination: city,
        regionDestination: region
    }
}
