import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import 'antd/dist/antd.css'
import reportWebVitals from './reportWebVitals'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from '../src/reducers/rootReducers'

const store = createStore(rootReducer, composeWithDevTools())

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)

reportWebVitals()
