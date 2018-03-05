import request from "axios"

export const calculateFutureMonthlyBalance = (currentBalance, monthlyDeposit, interestRate, compoundPeriod, resultCurrency) => {
	return request
		.post("/calculate/", {
			currentBalance,
			monthlyDeposit,
			interestRate,
			compoundPeriod,
			inputCurrency: 'GBP',
			resultCurrency
		}).then(r => r.data.monthly_balance)
}
