import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { Router, hashHistory } from 'react-router';

import routes from './routes';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';

import './styles/index.css'

export const store = createStore(
	reducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	compose(
		applyMiddleware(promiseMiddleware())
	)
);

ReactDOM.render((
	<Provider store={ store }>
		<Router history={ hashHistory } routes={ routes } />
	</Provider>
), document.getElementById('root'));

registerServiceWorker();
