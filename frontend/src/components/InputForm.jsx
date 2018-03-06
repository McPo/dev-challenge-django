import React from 'react';
import PropTypes from 'prop-types';

import CurrencySelector from './CurrencySelector';

const InputForm = props => (
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
                            <select defaultValue={ props.compoundPeriod } onChange={ props.onCompoundPeriodChange } id="compound-period" className="custom-select" >
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
                            <CurrencySelector defaultValue={ props.resultCurrency } onChange={ props.onResultCurrencyChange } id="result-currency"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
);

InputForm.propTypes = {
	resultCurrency: CurrencySelector.propTypes.defaultValue,
    currentBalance: PropTypes.number.isRequired,
	monthlyDeposit: PropTypes.number.isRequired,
	interestRate: PropTypes.number.isRequired,
    compoundPeriod: PropTypes.oneOf(['monthly', 'quarterly', 'yearly']),
    onCurrentBalanceChange: PropTypes.func.isRequired,
    onMonthlyDepositChange: PropTypes.func.isRequired,
    onInterestRateChange: PropTypes.func.isRequired,
    onCompoundPeriodChange: PropTypes.func.isRequired,
    onResultCurrencyChange: PropTypes.func.isRequired
};

export default InputForm;
