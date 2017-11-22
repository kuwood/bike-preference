import React from 'react'
import { connect } from 'react-redux'

export class Weather extends React.Component {

    render() {
        return (
            <div className='weather-container'>
                <h3 className='weather-location'>{this.props.location.city}, {this.props.location.region}</h3>
                <div className='weather-col'>
                    <p className='weather-item weather-temp'>{this.props.weather.temp}{String.fromCharCode(176)}</p>
                </div>
                <div className='weather-col'>
                    <img src={this.props.weather.weatherIcon.replace('http','https')}></img>
                </div>
                <div className='weather-col'>
                    <p className='weather-item'>Wind: {this.props.weather.wind}</p>
                    <p className='weather-item'>Precipitation: {this.props.weather.precip}</p>
                    <p className='weather-item'>Snow: {this.props.weather.snow}</p>
                </div>
            </div>
        )
    }
}

export default Weather
