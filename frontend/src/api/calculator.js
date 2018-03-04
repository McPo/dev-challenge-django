import request from "axios"

export const calculateFutureMonthlyBalance = (currentBalance, monthlyDeposit, interestRate, compoundPeriod) => {
	return request
		.post("/calculate/", {
			currentBalance,
			monthlyDeposit,
			interestRate,
			compoundPeriod
		}).then(r => r.data.monthly_balance)
}
