import React from 'react'
import { connect } from 'react-redux'

export class Directions extends React.Component {
    constructor(props){
        super(props)
        this.directionsService = null
        this.directionsDisplay = null
    }
    componentDidMount() {

        this.calcRoute(
            new google.maps.LatLng(
                this.props.beginning.lat,
                this.props.beginning.lng
            ),
            new google.maps.LatLng(
                this.props.end.lat,
                this.props.end.lng
            )

        )
    }

    componentDidUpdate() {
        this.refs.panel.innerHTML = ""
        this.calcRoute(
            new google.maps.LatLng(
                this.props.beginning.lat,
                this.props.beginning.lng
            ),
            new google.maps.LatLng(
                this.props.end.lat,
                this.props.end.lng
            )
        )

    }

    calcRoute(start, end) {
        if (this.directionsDisplay) {
            this.directionsDisplay.setMap(null)
            this.directionsDisplay.setPanel(null)
            this.directionsDisplay = null
        }
        this.directionsService = new google.maps.DirectionsService()
        this.directionsDisplay = new google.maps.DirectionsRenderer()
        let request = {
            origin:start,
            destination:end,
            travelMode: 'BICYCLING'
        }
        this.directionsService.route(request, (response, status) => {
            if (status == 'OK') {
                this.directionsDisplay.setDirections(response);
                let map = new google.maps.Map(this.refs.map);
                this.directionsDisplay.setPanel(this.refs.panel)
                this.directionsDisplay.setMap(map)
            }
        })
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

export default Directions
