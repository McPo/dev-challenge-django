import React from 'react';
import PropTypes from 'prop-types';
import '../styles/App.css';

const App = props => <div className="App">
    <header className="App-header">
        <h1 className="App-title">Finimize dev challenge</h1>
    </header>
    <p className="App-intro">
        { props.loading ? 'Loading...' : `Result: ${props.result}` }
    </p>
</div>;

App.propTypes = {
    loading: PropTypes.bool.isRequired,
    result: PropTypes.number.isRequired,
};

export default App;
