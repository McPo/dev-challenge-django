export default (state = {
    loading: false,
    result: 1001
}, action) => {
	switch (action.type) {
        case 'CALCULATE_FUTURE_SAVINGS_PENDING':
            return { ...state, loading: true }
		case 'CALCULATE_FUTURE_SAVINGS_FULFILLED':
			return { ...state, loading: false };
		default:
			return state;
	}
};
