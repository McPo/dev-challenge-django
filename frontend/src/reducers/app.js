export default (state = {
    currentBalance: 0,
    monthlyDeposit: 0,
    interestRate: 0,
    compoundPeriod: 'monthly',
    resultCurrency: 'GBP',
    loading: false,
    futureMonthlyBalance: []
}, action) => {
	switch (action.type) {
        case 'CALCULATE_FUTURE_MONTHLY_BALANCE_PENDING':
            return {
                ...state,
                currentBalance: action.payload.currentBalance,
                monthlyDeposits: action.payload.monthlyDeposits,
                interestRate: action.payload.interestRate,
                compoundPeriod: action.payload.compoundPeriod,
                resultCurrency: action.payload.resultCurrency,
                loading: true,
                futureMonthlyBalance: []
            }
		case 'CALCULATE_FUTURE_MONTHLY_BALANCE_FULFILLED':
            return {
                ...state,
                loading: false,
                futureMonthlyBalance: action.payload
            };
		default:
			return state;
	}
};
