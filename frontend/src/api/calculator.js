import request from "axios"

export const calculateFutureMonthlyBalance = (currentBalance, monthlyDeposit, interestRate) => {
	return request
		.post("/calculate/", {
			currentBalance,
			monthlyDeposit,
			interestRate
		}).then(r => r.data.monthly_balance)
}
