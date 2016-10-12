import React from 'react'
import { connect } from 'react-redux'

export class Weather extends React.Component {

    render() {
        return (
            <div className='weather-container'>
                <h3 className='weather-location'>{this.props.cityDestination}, {this.props.regionDestination}</h3>
                <div className='weather-col'>
                    <p className='weather-item weather-temp'>{this.props.destinationTemp}{String.fromCharCode(176)}</p>
                </div>
                <div className='weather-col'>
                    <img src={this.props.destinationWeatherIcon}></img>
                </div>
                <div className='weather-col'>
                    <p className='weather-item'>Wind: {this.props.destinationWind}</p>
                    <p className='weather-item'>Precipitation: {this.props.destinationPrecip}</p>
                    <p className='weather-item'>Snow: {this.props.destinationSnow}</p>
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state, props) => {
    return {
        cityDestination: state.destinationReducer.cityDestination,
        regionDestination: state.destinationReducer.regionDestination,
        destinationTemp: state.weatherReducer.destinationTemp,
        destinationWind: state.weatherReducer.destinationWind,
        destinationPrecip: state.weatherReducer.destinationPrecip,
        destinationSnow: state.weatherReducer.destinationSnow,
        destinationWeatherIcon: state.weatherReducer.destinationWeatherIcon,
        cityReturnDestination: state.destinationReducer.cityReturnDestination,
        regionReturnDestination: state.destinationReducer.regionReturnDestination,
        returnTemp: state.weatherReducer.returnTemp,
        returnWind: state.weatherReducer.returnWind,
        returnPrecip: state.weatherReducer.returnPrecip,
        returnSnow: state.weatherReducer.returnSnow,
        returnWeatherIcon: state.weatherReducer.returnWeatherIcon
    }
}

export default connect(mapStateToProps)(Weather)
