import React from 'react'
import { connect } from 'react-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import Paper from 'material-ui/Paper'

import SearchForm from './SearchForm'
import Weather from './Weather'
import Directions from './Directions'

export class Main extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <div  className='wrapper'>
                    <AppBar title="Fair Weather Cyclist"
                        showMenuIconButton={false}
                        style={{backgroundColor: '#558B2F'}}
                    />
                <Paper className='card search-card' zDepth={2} children={<SearchForm />} />
                    <Paper className='card weather-card' zDepth={2} children={<Weather />}/>
                    <Paper className='card directions-card' zDepth={2} children={<Directions />}/>
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
