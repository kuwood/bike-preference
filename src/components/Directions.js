import React from 'react'
import { connect } from 'react-redux'

export class Directions extends React.Component {

    componentDidUpdate() {
        this.refs.panel.innerHTML = ""
        this.calcRoute(
            new google.maps.LatLng(
                this.props.latLngReturnDestination.lat,
                this.props.latLngReturnDestination.lng
            ),
            new google.maps.LatLng(
                this.props.latLngDestination.lat,
                this.props.latLngDestination.lng
            )

        )
    }

    componentDidMount() {
        this.calcRoute(
            new google.maps.LatLng(
                this.props.latLngReturnDestination.lat,
                this.props.latLngReturnDestination.lng
            ),
            new google.maps.LatLng(
                this.props.latLngDestination.lat,
                this.props.latLngDestination.lng
            )

        )
        document.getElementById('dest-weather').scrollIntoView();
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
                directionsDisplay.setDirections(response);
                let map = new google.maps.Map(this.refs.map);
                directionsDisplay.setPanel(this.refs.panel)
                directionsDisplay.setMap(map)
            }
        });
    }

    render() {
        return (
            <div className='directions-container'>
                <div className='map-container' ref='map'>
                </div>
                <div className='directions-panel' ref='panel'>
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state, props) => {
    return {
        latLngDestination: state.destinationReducer.latLngDestination,
        latLngReturnDestination: state.destinationReducer.latLngReturnDestination
    }

}

export default connect (mapStateToProps)(Directions)
