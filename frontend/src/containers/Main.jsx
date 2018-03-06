import { connect } from 'react-redux';
import Main from '../components/Main';

import { calculateFutureMonthlyBalance } from '../actions/main';

const mapStateToProps = (state, props) => ({
	currentBalance: state.main.currentBalance,
	monthlyDeposit: state.main.monthlyDeposit,
	interestRate: state.main.interestRate,
	compoundPeriod: state.main.compoundPeriod,
	resultCurrency: state.main.resultCurrency,
	loading: state.main.loading,
	futureMonthlyBalance: state.main.futureMonthlyBalance.map((b,i) => {
		const d = new Date(state.main.startDate);
		d.setMonth(d.getMonth() + i);
		return { balance: b.toFixed(2), date: d.toDateString() }
	}),
	error: state.main.error,
	finalBalance: state.main.futureMonthlyBalance.length > 0
		? state.main.futureMonthlyBalance[state.main.futureMonthlyBalance.length - 1].toFixed(2)
		: null
});

const mapDispatchToProps = (dispatch, props) => ({
	onCalculateFutureMonthlyBalance: (currentBalance, monthlyDeposit, interestRate, compoundPeriod, resultCurrency) => {
		dispatch(calculateFutureMonthlyBalance(
			currentBalance,
			monthlyDeposit,
			interestRate,
			compoundPeriod,
			resultCurrency
		));
	}
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
	...stateProps,
	...dispatchProps,
	...ownProps,
	onCurrentBalanceChange: event => {
		const value = parseFloat(event.target.value);
		dispatchProps.onCalculateFutureMonthlyBalance(
			value,
			stateProps.monthlyDeposit,
			stateProps.interestRate,
			stateProps.compoundPeriod,
			stateProps.resultCurrenc
		);
	},
	onMonthlyDepositChange: event => {
		const value = parseFloat(event.target.value);
		dispatchProps.onCalculateFutureMonthlyBalance(
			stateProps.currentBalance,
			value,
			stateProps.interestRate,
			stateProps.compoundPeriod,
			stateProps.resultCurrency
		);
	},
	onInterestRateChange: event => {
		const value = parseFloat(event.target.value);
		dispatchProps.onCalculateFutureMonthlyBalance(
			stateProps.currentBalance,
			stateProps.monthlyDeposit,
			value,
			stateProps.compoundPeriod,
			stateProps.resultCurrency
		);
	},
	onCompoundPeriodChange: event => {
		const value = event.target.value;
		dispatchProps.onCalculateFutureMonthlyBalance(
			stateProps.currentBalance,
			stateProps.monthlyDeposit,
			stateProps.interestRate,
			value,
			stateProps.resultCurrency
		);
	},
	onResultCurrencyChange: event => {
		const value = event.target.value;
		dispatchProps.onCalculateFutureMonthlyBalance(
			stateProps.currentBalance,
			stateProps.monthlyDeposit,
			stateProps.interestRate,
			stateProps.compoundPeriod,
			value
		);
	}
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Main);
