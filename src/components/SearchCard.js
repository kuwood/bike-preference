import React from 'react'
import Paper from 'material-ui/Paper'
import SearchForm from './SearchForm'

const style = {
    height: 450,
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url('http://i.imgur.com/8DfeEdo.jpg')",
    backgroundSize: "cover"
}

const SearchCard = () => {
    return (
        <div>
            <Paper style={style} zDepth={1} children={
                <SearchForm />
            }/>
        </div>
    )
}

export default SearchCard
