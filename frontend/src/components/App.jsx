import React from 'react';
import PropTypes from 'prop-types';
import '../styles/App.css';

const App = props => <div className="container">
    <div className="row">
        <div className="col-sm">
            <header className="page-header">
                <h1 className="display-1">Finimize</h1>
            </header>
        </div>
    </div>
    <div className="row">
        <div className="col-sm">
            <div className="card">
                <div className="card-header">Input</div>
                <div className="card-body">
                    <form>
                        <div className="container">
                            <div className="row">
                                <div className="col-sm">
                                    <div className="form-group">
                                        <label htmlFor="current-balace">Initial Account Balance</label>
                                        <input type="number" min="0" defaultValue={ props.currentBalance } onChange={ props.onCurrentBalanceChange } id="current-balace" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-sm">
                                    <div className="form-group">
                                        <label htmlFor="monthly-deposit">Monthly Deposits</label>
                                        <input type="number" min="0" defaultValue={ props.monthlyDeposit } onChange={ props.onMonthlyDepositChange } id="monthly-deposit" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-sm">
                                    <div className="form-group">
                                        <label htmlFor="interest-rate">Interest Rate</label>
                                        <input type="number" min="0" defaultValue={ props.interestRate } onChange={ props.onInterestRateChange } id="interest-rate" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-sm">
                                    <div className="form-group">
                                        <label htmlFor="compound-period">Compound Period</label>
                                        <select  defaultValue={ props.compoundPeriod } onChange={ props.onCompoundPeriodChange } id="compound-period" className="custom-select" >
                                            <option value="monthly">Month</option>
                                            <option value="yearly">Year</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div className="row">
        <div className="col-sm">
            <div className="card bg-dark text-white">
                <div className="card-header">Results</div>
                <div className="card-body">
                    {
                        props.futureMonthlyBalance.length ?
                            <table className="table table-striped table-dark">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.futureMonthlyBalance.map((b, i) => (
                                            <tr>
                                                <th scope="row">{ i + 1 }</th>
                                                <td>{ b }</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table> : <div className="alert alert-dark" role="alert">No Results</div>
                    }
                </div>
            </div>
        </div>
    </div>
</div>;

App.propTypes = {
    loading: PropTypes.bool.isRequired,
    futureMonthlyBalance: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
};

export default App;
