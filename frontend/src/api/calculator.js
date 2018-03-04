import request from "axios"

export const calculateFutureMonthlyBalance = (savingsAmount, interestRate) => {
	return request
		.post("/calculate/", {
			savingsAmount,
			interestRate
		}).then(r => [r.data.result])
}
