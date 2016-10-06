import React from 'react'
import { connect } from 'react-redux'

import TextField from 'material-ui/TextField'
import TimePicker from 'material-ui/TimePicker'
import RaisedButton from 'material-ui/RaisedButton'

import * as destinationActions from '../actions/destination'
import * as actions from '../actions/actions'

export class SearchForm extends React.Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        let input = document.getElementById('destination-input')
        let options = {
            types: ['address']
        }
        let autocomplete = new google.maps.places.Autocomplete(input, options)

        autocomplete.addListener('place_changed', () => {
            let places = autocomplete.getPlace()
            let city
            let region
            let latLng = {
                lat: places.geometry.location.lat(),
                lng: places.geometry.location.lng()
            }

            places.address_components.forEach((item) => {
                if (item.types[0] === 'locality') city = item.long_name
                if (item.types[0] === 'administrative_area_level_1') region = item.short_name
            })

            this.props.dispatch(actions.setDestination(city, region, latLng))
        })
    }

    calcRoute(start, end) {
        let directionsService = new google.maps.DirectionsService()
        let directionsDisplay = new google.maps.DirectionsRenderer()

        let request = {
            origin:start,
            destination:end,
            travelMode: 'BICYCLING'
        }
        directionsService.route(request, (response, status) => {
            if (status == 'OK') {
                document.getElementById('panel').innerHTML = ""
                directionsDisplay.setDirections(response);
                let map = new google.maps.Map(document.getElementById('map'));
                directionsDisplay.setPanel(document.getElementById('panel'))
                directionsDisplay.setMap(map)
            }
        });
        // TODO: make directionsDisplay state
        //this.props.dispatch(actions.setDestinationRoute(directionsDisplay))

    }

    handleSubmit(e) {
        e.preventDefault()
        let destination = this.refs.destination.input.value
        let leaveTime = this.refs.leaveTime.refs.input.input.value
        let returnDestination = this.refs.returnDestination.input.value
        let returnTime = this.refs.returnTime.refs.input.input.value
        console.log(destination, leaveTime, returnDestination, returnTime);
        let weatherDestination = {
            region: this.props.regionDestination,
            city: this.props.cityDestination
        }

        this.calcRoute(
            // TODO: Remove starting location hard coding and use gMaps autocomplete
            new google.maps.LatLng(43.6126718,-116.204472),
            new google.maps.LatLng(
                this.props.latLngDestination.lat,
                this.props.latLngDestination.lng
            )

        )

        this.props.dispatch(destinationActions.fetchWeather(weatherDestination, leaveTime))
    }

    render() {

        return (
            <form className='search-form' onSubmit={this.handleSubmit}>
                <h3 className="form-title">Plan your route</h3>
                <TextField
                    placeholder=""
                    id="destination-input"
                    hintText="Enter your destination"
                    inputStyle={{color: '#fff'}}
                    hintStyle={{color: '#F1F8E9'}}
                    underlineFocusStyle={{borderColor: '#558B2F'}}
                    ref="destination"
                />
                <TimePicker
                    id="leave-time"
                    hintText="Leave time"
                    inputStyle={{color: '#fff'}}
                    hintStyle={{color: '#F1F8E9'}}
                    underlineFocusStyle={{borderColor: '#558B2F'}}
                    ref="leaveTime"
                />
                <TextField
                    id="return-destination"
                    hintText="Return/Start destination"
                    inputStyle={{color: '#fff'}}
                    hintStyle={{color: '#F1F8E9'}}
                    underlineFocusStyle={{borderColor: '#558B2F'}}
                    ref="returnDestination"
                />
                <TimePicker
                    id="return-time"
                    hintText="Return time"
                    inputStyle={{color: '#fff'}}
                    hintStyle={{color: '#F1F8E9'}}
                    underlineFocusStyle={{borderColor: '#558B2F'}}
                    ref="returnTime"
                />
                <RaisedButton
                    id="form-submit"
                    type="submit"
                    label="Submit"
                    backgroundColor="#558B2F"
                />
            </form>
        )
    }
}

let mapStateToProps = (state, props) => {
    return {
        regionDestination: state.destinationReducer.regionDestination,
        cityDestination: state.destinationReducer.cityDestination,
        latLngDestination: state.destinationReducer.latLngDestination
    }
}

export default connect(mapStateToProps)(SearchForm)
