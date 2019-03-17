import React from 'react'
import ReactDOM from 'react-dom' // yg menyusun susunan parent (provider) dan child (App)
import {Provider} from 'react-redux' // Ini component yang menghubungkan aplikasi dengan redux
import {createStore, applyMiddleware} from 'redux' // Ini function yang membuat redux store
import thunk from 'redux-thunk'

import App from './components/App.js'
import reducers from './reducers'

const store = createStore(reducers,applyMiddleware(thunk))


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    ,document.querySelector('#root'))