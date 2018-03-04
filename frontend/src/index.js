import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

import reducers from './reducers';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

export const store = createStore(
	reducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	compose(
		applyMiddleware(promiseMiddleware())
	)
);

ReactDOM.render(<Provider store={ store }><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
