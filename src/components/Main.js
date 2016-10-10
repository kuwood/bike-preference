import React from 'react'
import { connect } from 'react-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import Paper from 'material-ui/Paper'
import { lightGreen800, lightGreen900, yellow500 } from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import SearchForm from './SearchForm'
import Weather from './Weather'
import Directions from './Directions'

const muiTheme = getMuiTheme({
  palette: {
      primary1Color: lightGreen800,
      primary2Color: lightGreen900,
      accent1Color: yellow500,
      pickerHeaderColor: lightGreen800
  }
})

export class Main extends React.Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div  className='wrapper'>
                    <AppBar title="Fair Weather Cyclist"
                        showMenuIconButton={false}
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
