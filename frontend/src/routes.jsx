import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import App from './components/App';
import Main from './containers/Main';

export default (
	<Route path="/" component={ App } >
		<IndexRedirect to="main" />
		<Route path="main" component={ Main } />
	</Route>
);
