import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import store from './src/store'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import Main from './src/components/Main.js'

document.addEventListener('DOMContentLoaded', () => {
    console.log(store)
    render(
        <Provider store={store}>
            <Main />
        </Provider>,
        document.getElementById('app'));
});
