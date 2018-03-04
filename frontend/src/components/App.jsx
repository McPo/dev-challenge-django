import React from 'react';
import PropTypes from 'prop-types';
import '../styles/App.css';

const App = props => <div className="App">
    <header className="App-header">
        <h1 className="App-title">Finimize dev challenge</h1>
    </header>
    <form>
        <input placeholder="Initial Account Balance" type="number" min="0" defaultValue={ props.currentBalance } onChange={ props.onCurrentBalanceChange } />
        <input placeholder="Monthly Deposits" type="number" min="0" defaultValue={ props.monthlyDeposit } onChange={ props.onMonthlyDepositChange } />
        <input placeholder="Interest Rate" type="number" min="0" defaultValue={ props.interestRate } onChange={ props.onInterestRateChange } />
        <select  defaultValue={ props.compoundPeriod } onChange={ props.onCompoundPeriodChange } >
            <option value="monthly">Month</option>
            <option value="yearly">Year</option>
        </select>
    </form>
    <ol>
        { props.futureMonthlyBalance.map((b, i) => <li key={ i }>{ b }</li>) }
    </ol>
</div>;

App.propTypes = {
    loading: PropTypes.bool.isRequired,
    futureMonthlyBalance: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
};

export default App;
