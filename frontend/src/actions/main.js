import API from '../api';

export const inputFormError = (currentBalance, monthlyDeposit, interestRate, compoundPeriod, resultCurrency, error) => ({
    type: 'INPUT_FORM_ERROR',
    payload: {
        currentBalance,
        monthlyDeposit,
        interestRate,
        compoundPeriod,
        resultCurrency,
        error
    }
});

export const calculateFutureMonthlyBalance = (currentBalance, monthlyDeposit, interestRate, compoundPeriod, resultCurrency) => ({
    type: 'CALCULATE_FUTURE_MONTHLY_BALANCE',
    payload: {
        promise: API.calculator.calculateFutureMonthlyBalance(currentBalance, monthlyDeposit, interestRate, compoundPeriod, resultCurrency),
        data: { currentBalance, monthlyDeposit, interestRate, compoundPeriod, resultCurrency }
    }
});
