import React from 'react';
import PropTypes from 'prop-types';
import '../styles/App.css';

const App = props => <div className="container">
    <div className="row">
        <div className="col">
            <header className="page-header">
                <h1 className="display-1">Finimize</h1>
            </header>
        </div>
    </div>
    <div className="row">
        <div className="col">
            <div className="card">
                <div className="card-header">Input</div>
                <div className="card-body">
                    <form>
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="row">
                                        <label htmlFor="current-balace">Initial Account Balance</label>
                                    </div>
                                    <div className="row">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="current-balance-addon">£</span>
                                            </div>
                                            <input type="number" min="0" defaultValue={ props.currentBalance } onChange={ props.onCurrentBalanceChange } id="current-balace" className="form-control" aria-describedby="current-balance-addon" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="row">
                                        <label htmlFor="monthly-deposit">Monthly Deposits</label>
                                    </div>
                                    <div className="row">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="monthly-deposit-addon">£</span>
                                            </div>
                                            <input type="number" min="0" defaultValue={ props.monthlyDeposit } onChange={ props.onMonthlyDepositChange } id="monthly-deposit" className="form-control" aria-describedby="monthly-deposit-addon" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="row">
                                        <label htmlFor="interest-rate">Interest Rate</label>
                                    </div>
                                    <div className="row">
                                        <div className="input-group">
                                            <input type="number" min="0" defaultValue={ props.interestRate } onChange={ props.onInterestRateChange } id="interest-rate" className="form-control" aria-describedby="interest-rate-addon" />
                                            <div className="input-group-append">
                                                <span className="input-group-text" id="interest-rate-addon">%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="row">
                                        <label htmlFor="compound-period">Compound Period</label>
                                    </div>
                                    <div className="row">
                                        <div className="input-group">
                                            <select  defaultValue={ props.compoundPeriod } onChange={ props.onCompoundPeriodChange } id="compound-period" className="custom-select" >
                                                <option value="monthly">Month</option>
                                                <option value="quarterly">Quarterly</option>
                                                <option value="yearly">Year</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="row">
                                        <label htmlFor="result-currency">Result Currency</label>
                                    </div>
                                    <div className="row">
                                        <div className="input-group">
                                            <select defaultValue={ props.resultCurrency } onChange={ props.onResultCurrencyChange } id="result-currency" className="custom-select" >
                                                <option value="AUD">AUD</option>
                                                <option value="BGN">BGN</option>
                                                <option value="BRL">BRL</option>
                                                <option value="CAD">CAD</option>
                                                <option value="CHF">CHF</option>
                                                <option value="CNY">CNY</option>
                                                <option value="CZK">CZK</option>
                                                <option value="DKK">DKK</option>
                                                <option value="GBP">GBP</option>
                                                <option value="HKD">HKD</option>
                                                <option value="HRK">HRK</option>
                                                <option value="HUF">HUF</option>
                                                <option value="IDR">IDR</option>
                                                <option value="ILS">ILS</option>
                                                <option value="INR">INR</option>
                                                <option value="ISK">ISK</option>
                                                <option value="JPY">JPY</option>
                                                <option value="KRW">KRW</option>
                                                <option value="MXN">MXN</option>
                                                <option value="MYR">MYR</option>
                                                <option value="NOK">NOK</option>
                                                <option value="NZD">NZD</option>
                                                <option value="PHP">PHP</option>
                                                <option value="PLN">PLN</option>
                                                <option value="RON">RON</option>
                                                <option value="RUB">RUB</option>
                                                <option value="SEK">SEK</option>
                                                <option value="SGD">SGD</option>
                                                <option value="THB">THB</option>
                                                <option value="TRY">TRY</option>
                                                <option value="USD">USD</option>
                                                <option value="ZAR">ZAR</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    {
        !props.finalBalance ? null : (
            <div className="alert alert-info" role="alert">
                Final Balance: { props.finalBalance } ({ props.resultCurrency })
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
                                        <th scope="col">Balance ({ props.resultCurrency })</th>
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
	currentBalance: PropTypes.number.isRequired,
	monthlyDeposit: PropTypes.number.isRequired,
	interestRate: PropTypes.number.isRequired,
	compoundPeriod: PropTypes.oneOf(['monthly', 'quarterly', 'yearly']),
	resultCurrency: PropTypes.oneOf([
        'AUD', 'BGN', 'BRL','CAD','CHF','CNY','CZK','DKK','GBP',
        'HKD','HRK','HUF', 'IDR','ILS','INR','ISK','JPY','KRW',
        'MXN','MYR','NOK','NZD','PHP','PLN','RON', 'RUB','SEK',
        'SGD','THB','TRY','USD','ZAR'
    ]),
    loading: PropTypes.bool.isRequired,
    futureMonthlyBalance: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    finalBalance: PropTypes.string,
    error: PropTypes.string,
    onCurrentBalanceChange: PropTypes.func.isRequired,
    onMonthlyDepositChange: PropTypes.func.isRequired,
    onInterestRateChange: PropTypes.func.isRequired,
    onCompoundPeriodChange: PropTypes.func.isRequired,
    onResultCurrencyChange: PropTypes.func.isRequired
};

export default App;
