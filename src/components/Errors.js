import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux'
import * as weather from '../actions/weather'

export class Errors extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
    };
    this.handleRequestClose = this.handleRequestClose.bind(this)
  }

  handleRequestClose() {
    this.setState({
      open: false,
    })
    this.props.dispatch(weather.fetchWeatherError(false))
  }

  render() {
    return (
      <div>
        <Snackbar
          open={this.props.error}
          message="Error fetching locations, please confirm the address is correct."
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    )
  }
}

export default connect()(Errors)
