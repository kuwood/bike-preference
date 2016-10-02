import React from 'react'
import Paper from 'material-ui/Paper'

const style = {
    height: 450,
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    justifyContent: "center",
    alignItems: "center"
}

const DirectionsCard = () => {
    return (
        <div>
            <Paper style={style} zDepth={1} />
        </div>
    )
}

export default DirectionsCard
