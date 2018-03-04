import React from 'react';
import PropTypes from 'prop-types';
import '../styles/App.css';

const App = props => <div className="App">
    <header className="App-header">
        <h1 className="App-title">Finimize dev challenge</h1>
    </header>
    <input placeholder="Initial Account Balance" type="number" min="0" />
    <input placeholder="Monthly Deposits" type="number" min="0" />
    <input placeholder="Interest Rate" type="number" min="0" />
    <select defaultValue="">
        <option value="" disabled hidden>Compounded every...</option>
        <option value="monthly">Month</option>
        <option value="yearly">Year</option>
    </select>
    <ol>
        { props.futureMonthlyBalance.map((b, i) => <li key={ i }>{ b }</li>) }
    </ol>
</div>;

App.propTypes = {
    loading: PropTypes.bool.isRequired,
    futureMonthlyBalance: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
};

export default App;
