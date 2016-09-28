import React from 'react'
import TestUtils from 'react-addons-test-utils'
import {should} from 'chai'
should()
import Main from '../components/Main.js'

describe('Main component', () => {
    it('Renders the Main component', () => {
        const renderer = TestUtils.createRenderer()
        renderer.render(<Main />)

        const result = renderer.getRenderOutput()
        result.props.children.props.children.should.equal('Hello World!!')
    })
})
