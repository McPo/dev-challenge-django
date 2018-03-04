import request from "axios"

export const calculateFutureSavings = (savingsAmount, interestRate) => {
	return request
		.post("/calculate/", {
			savingsAmount,
			interestRate
		})
}
