import API from '../api';

export const calculateFutureMonthlyBalance = (currentBalance, monthlyDeposit, interestRate, compoundPeriod) => ({
    type: 'CALCULATE_FUTURE_MONTHLY_BALANCE',
    payload: {
        promise: API.calculator.calculateFutureMonthlyBalance(currentBalance, monthlyDeposit, interestRate, compoundPeriod),
        data: { currentBalance, monthlyDeposit, interestRate, compoundPeriod }
    }
});
