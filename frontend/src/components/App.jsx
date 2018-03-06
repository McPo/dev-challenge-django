import React from 'react';
import PropTypes from 'prop-types';
import '../styles/App.css';

import InputForm from './InputForm';

const App = props => <div className="container">
    <div className="row">
        <div className="col">
            <header className="page-header">
                <h1 className="display-1">Finimize</h1>
            </header>
        </div>
    </div>
    <div className="row sticky-top">
        <div className="col">
            <div className="card">
                <div className="card-header">Input</div>
                <div className="card-body">
                    <InputForm 
                        currentBalance={ props.currentBalance }
                        monthlyDeposit={ props.monthlyDeposit }
                        interestRate={ props.interestRate }
                        compoundPeriod={ props.compoundPeriod }
                        resultCurrency={ props.resultCurrency }
                        onCurrentBalanceChange={ props.onCurrentBalanceChange }
                        onMonthlyDepositChange={ props.onMonthlyDepositChange }
                        onInterestRateChange={ props.onInterestRateChange }
                        onCompoundPeriodChange={ props.onCompoundPeriodChange }
                        onResultCurrencyChange={ props.onResultCurrencyChange }
                    />
                </div>
            </div>
        </div>
    </div>
    <div className="alert alert-info" role="alert">
        Interest applied monthly, compounded at specified periods. Does not consider tax or inflation of deposits.
    </div>
    {
        !props.finalBalance ? null : (
            <div className="alert alert-success" role="alert">
                Expect a balance of { props.finalBalance } ({ props.resultCurrency }) after 50 years.
            </div>
        )
    }
     {
        !props.error ? null : (
            <div className="alert alert-danger" role="alert">
                { props.error }
            </div>
        )
    }
    <div className="row">
        <div className="col">
            <div className="card bg-dark text-white">
                <div className="card-header">Results</div>
                <div className="card-body">
                    {
                        props.futureMonthlyBalance.length ?
                            <table className="table table-striped table-dark">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Balance ({ props.resultCurrency })</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.futureMonthlyBalance.map((m, i) => (
                                            <tr key={ m.date+m.balance }>
                                                <th scope="row">{ i + 1 }</th>
                                                <td>{ m.date }</td>
                                                <td>{ m.balance }</td>
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
	...InputForm.propTypes,
    loading: PropTypes.bool.isRequired,
    futureMonthlyBalance: PropTypes.arrayOf(PropTypes.shape({
        date: PropTypes.string.isRequired,
        balance: PropTypes.string.isRequired
    }).isRequired).isRequired,
    finalBalance: PropTypes.string,
    error: PropTypes.string,
};

export default App;
