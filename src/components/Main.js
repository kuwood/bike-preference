import React from 'react'
import { connect } from 'react-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import Card from './Card'
import DirectionsCard from './DirectionsCard'
import Paper from 'material-ui/Paper'
import SearchForm from './SearchForm'

export class Main extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar title="Fair Weather Biker"
                        showMenuIconButton={false}
                        style={{backgroundColor: '#558B2F'}}
                    />
                    <Paper className='search-card' zDepth={1} children={<SearchForm />} />
                    <div>
                        <h4>{this.props.cityDestination}, {this.props.regionDestination}</h4>
                        <p>Temp: {this.props.destinationTemp}</p>
                        <p>Wind: {this.props.destinationWind}</p>
                        <p>Precipitation: {this.props.destinationPrecip}</p>
                        <p>Snow: {this.props.destinationSnow}</p>
                    </div>
                    <Paper className='card' zDepth={1} />
                </div>
            </MuiThemeProvider>
        )
    }
}

let mapStateToProps = (state, props) => {
    return {
        regionDestination: state.destinationReducer.regionDestination,
        cityDestination: state.destinationReducer.cityDestination,
        destinationTemp: state.destinationReducer.destinationTemp,
        destinationWind: state.destinationReducer.destinationWind,
        destinationPrecip: state.destinationReducer.destinationPrecip,
        destinationSnow: state.destinationReducer.destinationSnow
    }
}

export default connect(mapStateToProps)(Main)
