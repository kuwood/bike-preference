import React from 'react'
import { connect } from 'react-redux'
import TestUtils from 'react-addons-test-utils'
import { should } from 'chai'
should()

import ConnectedMain, { Main } from '../components/Main'
import SearchCard from '../components/SearchCard'
import { SearchForm } from '../components/SearchForm'

describe('Main component', () => {
    it('Contains the AppBar', () => {
        const renderer = TestUtils.createRenderer()
        renderer.render(<Main />)

        const result = renderer.getRenderOutput()
        let resultChildren = result.props.children.props.children
        resultChildren[0].type.should.be.a('function')
        resultChildren[0].props.should.have.property('title')
    })
    it('Contains the SearchCard', () => {
        const renderer = TestUtils.createRenderer()
        renderer.render(<Main />)

        const result = renderer.getRenderOutput()
        let resultChildren = result.props.children.props.children
        resultChildren[1].type.should.be.a('function')
        resultChildren[1].type.name.should.equal('SearchCard')
    })
})

describe('SearchCard component', () => {
    it('Contains the Paper component with the SearchForm', () => {
        const renderer = TestUtils.createRenderer()
        renderer.render(<SearchCard />)

        const result = renderer.getRenderOutput()
        let resultChildren = result.props.children
        let paperChildrenProp = resultChildren.props.children.type.WrappedComponent
        resultChildren.type.should.be.a('function')
        resultChildren.type.name.should.equal('Paper')
        paperChildrenProp.should.be.a('function')
        paperChildrenProp.name.should.equal('SearchForm')
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
        result.props.children.length.should.equal(5)
        result.props.children[0].props.id.should.equal('destination-input')
        result.props.children[1].props.id.should.equal('leave-time')

    })
})
