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
                    {this.props.haveLocations ?
                        <Paper className='card weather-card' id='dest-weather' zDepth={1} children={<Weather />}/>
                        : false
                    }
                    {this.props.haveLocations ?
                        <Paper className='card directions-card' zDepth={1} children={<Directions />}/>
                        : false
                    }
                </div>
            </MuiThemeProvider>
        )
    }
}

let mapStateToProps = (state, props) => {
    return {
        haveLocations: state.destinationReducer.haveLocations
    }
}

export default connect(mapStateToProps)(Main)
