import React from 'react'
import { connect } from 'react-redux'

class Directions extends React.Component {

    render() {
        return (
            <div className='directions-container'>
                <div className='map-container' id='map'>
                </div>
                <div className='directions-panel' id='panel'>
                </div>
            </div>
        )
    }
}

export default Directions
