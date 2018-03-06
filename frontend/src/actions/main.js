import API from '../api';

export const calculateFutureMonthlyBalance = (currentBalance, monthlyDeposit, interestRate, compoundPeriod, resultCurrency) => ({
    type: 'CALCULATE_FUTURE_MONTHLY_BALANCE',
    payload: {
        promise: API.calculator.calculateFutureMonthlyBalance(currentBalance, monthlyDeposit, interestRate, compoundPeriod, resultCurrency),
        data: { currentBalance, monthlyDeposit, interestRate, compoundPeriod, resultCurrency }
    }
});
