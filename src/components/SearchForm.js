import React from 'react'
import { connect } from 'react-redux'
require('smoothscroll-polyfill').polyfill()


import TextField from 'material-ui/TextField'
import TimePicker from 'material-ui/TimePicker'
import RaisedButton from 'material-ui/RaisedButton'

import * as destination from '../actions/destination'
import * as weather from '../actions/weather'

export class SearchForm extends React.Component {
    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
        this.setDest = this.setDest.bind(this)
        this.state = {
          leaveTime: "",
          returnTime: "",
          dest: "",
          returnDest: ""
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', function(e) {
          if (e.keyIdentifier == 'U+000A' || e.keyIdentifier == 'Enter' || e.keyCode == 13) {
            if (e.target.nodeName == 'INPUT' && e.target.type == 'text') {
              e.preventDefault()
              return false
            }
          }
        }, true)

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
            fillInPlaces(destinationAutoComplete, destination.findDestination)
        })

        google.maps.event.addListener(returnDestinationAutoComplete, 'place_changed', () => {
            fillInPlaces(returnDestinationAutoComplete, destination.findReturnDestination)
        })
    }

    componentDidUpdate() {
      if (this.props.fetching) {
          this.setDest()
      }
    }

    setDest() {


        this.props.dispatch(destination.setDestination(this.props.findDestination))
        this.props.dispatch(destination.setReturnDestination(this.props.findReturnDestination))
        this.props.dispatch(destination.haveLocations())
        setTimeout(function(){
          document.querySelector('#dest-weather').scrollIntoView({ behavior: 'smooth' })
        }, 1000)
        this.props.dispatch(weather.fetching(false))

    }

    handleSubmit(e) {
        e.preventDefault()
        let leaveTime = this.refs.leaveTime.refs.input.input.value
        let returnTime = this.refs.returnTime.refs.input.input.value
        let dest = this.refs.destination.input.value
        let returnDest = this.refs.returnDestination.input.value
        if (!leaveTime) this.setState({leaveTime: "This field is required"})
        else this.setState({leaveTime: ""})

        if (!returnTime) this.setState({returnTime: "This field is required"})
        else this.setState({returnTime: ""})

        if (!dest) this.setState({dest: "This field is required"})
        else this.setState({dest: ""})

        if (!returnDest) this.setState({returnDest: "This field is required"})
        else this.setState({returnDest: ""})

        if (leaveTime && returnTime && dest && returnDest){
          let weatherDestination = {
            region: this.props.findDestination.region,
            city: this.props.findDestination.city
          }
          let weatherReturnDestination = {
            region: this.props.findReturnDestination.region,
            city: this.props.findReturnDestination.city
          }
          this.props.dispatch(destination.dontHaveLocations())
          this.props.dispatch(weather.fetchWeather(weatherDestination, leaveTime, 'destination'))
          this.props.dispatch(weather.fetchWeather(weatherReturnDestination, returnTime, 'return'))
        }
    }

    render() {

        return (
            <div className="content">
                <div className="logo">
                  <i className="material-icons logo-icon">directions_bike</i>
                  <p>F W C</p>
                  <h1 className="form-title">Your bicycle directions coupled with travel time weather forecast.</h1>
                </div>
                <div className="form-wrap">
                  <form className='search-form' onSubmit={this.handleSubmit}>
                      <TextField
                          placeholder=""
                          id="return-destination"
                          hintText="Start/Return location"
                          inputStyle={{color: '#fff'}}
                          hintStyle={{color: '#F1F8E9'}}
                          ref="returnDestination"
                          fullWidth={true}
                          errorText={this.state.returnDest}
                      />
                      <TimePicker
                          id="leave-time"
                          hintText="Leave time"
                          inputStyle={{color: '#fff'}}
                          hintStyle={{color: '#F1F8E9'}}
                          ref="leaveTime"
                          fullWidth={true}
                          errorText={this.state.leaveTime}
                      />
                      <TextField
                          placeholder=""
                          id="destination-input"
                          hintText="Enter your destination"
                          inputStyle={{color: '#fff'}}
                          hintStyle={{color: '#F1F8E9'}}
                          ref="destination"
                          fullWidth={true}
                          className="top-margin"
                          errorText={this.state.dest}
                      />
                      <TimePicker
                          id="return-time"
                          hintText="Return time"
                          inputStyle={{color: '#fff'}}
                          hintStyle={{color: '#F1F8E9'}}
                          ref="returnTime"
                          fullWidth={true}
                          errorText={this.state.returnTime}
                      />
                      <RaisedButton
                          id="form-submit"
                          type="submit"
                          label="Submit"
                          primary={true}
                          fullWidth={true}
                          className="top-margin"
                      />
                  </form>
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state, props) => {
    return {
        destination: state.destinationReducer.destination,
        returnLocation: state.destinationReducer.returnLocation,
        findDestination: state.destinationReducer.findDestination,
        findReturnDestination: state.destinationReducer.findReturnLocation,
        haveLocations: state.destinationReducer.haveLocations,
        weatherError: state.weatherReducer.weatherError,
        fetching: state.weatherReducer.fetching,
        returnWeather: state.weatherReducer.returnWeather
    }
}

export default connect(mapStateToProps)(SearchForm)
