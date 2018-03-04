import { connect } from 'react-redux';
import App from '../components/App';

import { calculateFutureMonthlyBalance } from '../actions/app';

const mapStateToProps = (state, props) => ({
	currentBalance: state.app.currentBalance,
	monthlyDeposit: state.app.monthlyDeposit,
	interestRate: state.app.interestRate,
	compoundPeriod: state.app.compoundPeriod,
	loading: state.app.loading,
	futureMonthlyBalance: state.app.futureMonthlyBalance,
});

const mapDispatchToProps = (dispatch, props) => ({
	onCalculateFutureMonthlyBalance: (currentBalance, monthlyDeposit, interestRate, compoundPeriod) => {
		dispatch(calculateFutureMonthlyBalance(currentBalance, monthlyDeposit, interestRate, compoundPeriod));
	}
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
	...stateProps,
	...dispatchProps,
	...ownProps,
	onCurrentBalanceChange: event => {
		const value = parseFloat(event.target.value);
		dispatchProps.onCalculateFutureMonthlyBalance(value, stateProps.monthlyDeposit, stateProps.interestRate, stateProps.compoundPeriod);
	},
	onMonthlyDepositChange: event => {
		const value = parseFloat(event.target.value);
		dispatchProps.onCalculateFutureMonthlyBalance(stateProps.currentBalance, value, stateProps.interestRate, stateProps.compoundPeriod);
	},
	onInterestRateChange: event => {
		const value = parseFloat(event.target.value);
		dispatchProps.onCalculateFutureMonthlyBalance(stateProps.currentBalance, stateProps.monthlyDeposit, value, stateProps.compoundPeriod);
	},
	onCompoundPeriodChange: event => {
		const value = event.target.value;
		dispatchProps.onCalculateFutureMonthlyBalance(stateProps.currentBalance, stateProps.monthlyDeposit, stateProps.interestRate, value);
	}
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(App);
