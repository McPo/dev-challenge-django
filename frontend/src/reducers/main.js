export default (state = {
    startDate: new Date(),
    currentBalance: 0,
    monthlyDeposit: 0,
    interestRate: 0,
    compoundPeriod: 'monthly',
    resultCurrency: 'GBP',
    loading: false,
    futureMonthlyBalance: [],
    error: null
}, action) => {
	switch (action.type) {
        case 'CALCULATE_FUTURE_MONTHLY_BALANCE_PENDING':
            // Prefer to form explicit contract, as opposed to { ...payload }
            return {
                ...state,
                startDate: new Date(),
                currentBalance: action.payload.currentBalance,
                monthlyDeposit: action.payload.monthlyDeposit,
                interestRate: action.payload.interestRate,
                compoundPeriod: action.payload.compoundPeriod,
                resultCurrency: action.payload.resultCurrency,
                loading: true,
                error: null,
                futureMonthlyBalance: []
            }
		case 'CALCULATE_FUTURE_MONTHLY_BALANCE_FULFILLED':
            return {
                ...state,
                loading: false,
                futureMonthlyBalance: action.payload
            };
        case 'CALCULATE_FUTURE_MONTHLY_BALANCE_REJECTED':
            return {
                ...state,
                startDate: null,
                loading: false,
                error: action.payload.response.data,
                futureMonthlyBalance: []
            };
        case 'INPUT_FORM_ERROR':
            return {
                ...state,
                startDate: null,
                currentBalance: action.payload.currentBalance,
                monthlyDeposit: action.payload.monthlyDeposit,
                interestRate: action.payload.interestRate,
                compoundPeriod: action.payload.compoundPeriod,
                resultCurrency: action.payload.resultCurrency,
                loading: false,
                error: action.payload.error,
                futureMonthlyBalance: []
            };
		default:
			return state;
	}
};
