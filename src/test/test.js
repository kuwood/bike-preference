import React from 'react'
import { connect } from 'react-redux'
import TestUtils from 'react-addons-test-utils'
import { should } from 'chai'
should()

import ConnectedMain, { Main } from '../components/Main'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'
import { SearchForm } from '../components/SearchForm'
import { Weather } from '../components/Weather'
import { Directions } from '../components/Directions'

describe('Main component', () => {
    it('Contains the AppBar', () => {
        const renderer = TestUtils.createRenderer()
        renderer.render(<Main />)

        const result = renderer.getRenderOutput()
        let resultChildren = result.props.children.props.children
        resultChildren[0].type.should.be.a('function')
        resultChildren[0].props.should.have.property('title')
    })
    it('Contains a Paper component for the searchForm', () => {
        const renderer = TestUtils.createRenderer()
        renderer.render(<Main />)

        const result = renderer.getRenderOutput()
        let resultChildren = result.props.children.props.children
        resultChildren[1].type.should.be.a('function')
        resultChildren[1].type.name.should.equal('Paper')
    })
})

describe('Paper component with SearchForm', () => {
    it('Contains the SearchForm', () => {
        const renderer = TestUtils.createRenderer()
        renderer.render(
            <MuiThemeProvider>
                <Paper children={<SearchForm />} />
            </MuiThemeProvider>
        )

        const result = renderer.getRenderOutput()
        let resultChildren = result.props.children
        resultChildren.type.should.be.a('function')
        resultChildren.type.name.should.equal('SearchForm')
    })
})

describe('SearchForm component', () => {
    it('should have a form with inputs and a submit button', () => {
        const renderer = TestUtils.createRenderer()
        renderer.render(<SearchForm />)

        const result = renderer.getRenderOutput()
        result.type.should.equal('form')
        result.props.should.have.property('className')
        result.props.className.should.equal('search-form')
        result.props.should.have.property('onSubmit')
        result.props.children.length.should.equal(6)
        result.props.children[1].props.id.should.equal('destination-input')
        result.props.children[2].props.id.should.equal('leave-time')

    })
})

describe('Weather component', () => {
    it('should contain the weather data', () => {
        const renderer = TestUtils.createRenderer()
        renderer.render(<Weather cityDestination='Oakland'
                                 regionDestination='CA'
                                 destinationTemp='70'
                                 destinationWind='5'
                                 destinationPrecip='0'
                                 destinationSnow='0'
                                 destinationWeatherIcon='sampleimage.com'
                        />)

        const result = renderer.getRenderOutput()
        result.props.children[0].props.children[0].should.equal('Oakland')
        result.props.children[0].props.children[2].should.equal('CA')
        result.props.children[1].props.children.props.children[0].should.equal('70')
        result.props.children[2].props.children.props.src.should.equal('sampleimage.com')
        result.props.children[3].props.children[0].props.children[1].should.equal('5')
        result.props.children[3].props.children[1].props.children[1].should.equal('0')
        result.props.children[3].props.children[2].props.children[1].should.equal('0')
    })
})

describe('Directions component', () => {
    it('should contain the map div for google maps to target', () => {
        const renderer = TestUtils.createRenderer()
        renderer.render(<Directions />)

        const result = renderer.getRenderOutput()
        console.log(result.props.children)
        result.props.children[0].ref.should.equal('map')
        result.props.children[0].type.should.equal('div')
    })
    it('should contain the panel div for google maps directions to target', () => {
        const renderer = TestUtils.createRenderer()
        renderer.render(<Directions />)

        const result = renderer.getRenderOutput()
        console.log(result.props.children)
        result.props.children[1].ref.should.equal('panel')
        result.props.children[1].type.should.equal('div')
    })
})
