import React from 'react'
import { connect } from 'react-redux'

import TextField from 'material-ui/TextField'
import TimePicker from 'material-ui/TimePicker'
import RaisedButton from 'material-ui/RaisedButton'

import * as destination from '../actions/destination'
import * as weather from '../actions/weather'

export class SearchForm extends React.Component {
    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        let destinationInput = document.getElementById('destination-input')
        let returnDestinationInput = document.getElementById('return-destination')
        let destinationAutoComplete = new google.maps.places.Autocomplete(destinationInput)
        let returnDestinationAutoComplete = new google.maps.places.Autocomplete(returnDestinationInput)

        let fillInPlaces = (selector, action) => {
            let places = selector.getPlace()
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
            this.props.dispatch(action(city, region, latLng))
        }

        google.maps.event.addListener(destinationAutoComplete, 'place_changed', () => {
            fillInPlaces(destinationAutoComplete, destination.setDestination)
        })

        google.maps.event.addListener(returnDestinationAutoComplete, 'place_changed', () => {
            fillInPlaces(returnDestinationAutoComplete, destination.setReturnDestination)
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        let leaveTime = this.refs.leaveTime.refs.input.input.value
        let returnTime = this.refs.returnTime.refs.input.input.value
        let weatherDestination = {
            region: this.props.destination.region,
            city: this.props.destination.city
        }
        let weatherReturnDestination = {
            region: this.props.returnLocation.region,
            city: this.props.returnLocation.city
        }
        console.log(weatherDestination)
        console.log(weatherReturnDestination)
        this.props.dispatch(weather.fetchWeather(weatherDestination, leaveTime, 'destination'))
        this.props.dispatch(weather.fetchWeather(weatherReturnDestination, returnTime, 'return'))
        this.props.dispatch(destination.haveLocations())
        
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

                    ref="destination"
                />
                <TimePicker
                    id="leave-time"
                    hintText="Leave time"
                    inputStyle={{color: '#fff'}}
                    hintStyle={{color: '#F1F8E9'}}
                    ref="leaveTime"
                />
                <TextField
                    placeholder=""
                    id="return-destination"
                    hintText="Start/Return location"
                    inputStyle={{color: '#fff'}}
                    hintStyle={{color: '#F1F8E9'}}
                    ref="returnDestination"
                />
                <TimePicker
                    id="return-time"
                    hintText="Return time"
                    inputStyle={{color: '#fff'}}
                    hintStyle={{color: '#F1F8E9'}}
                    ref="returnTime"
                />
                <RaisedButton
                    id="form-submit"
                    type="submit"
                    label="Submit"
                    primary={true}
                />
            </form>
        )
    }
}

let mapStateToProps = (state, props) => {
    return {
        destination: state.destinationReducer.destination,
        returnLocation: state.destinationReducer.returnLocation,
        haveLocations: state.destinationReducer.haveLocations
    }
}

export default connect(mapStateToProps)(SearchForm)
