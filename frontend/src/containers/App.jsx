import { connect } from 'react-redux';
import App from '../components/App';

const mapStateToProps = (state, props) => ({
	loading: state.app.loading,
	futureMonthlyBalance: [state.app.result],
});

export default connect(mapStateToProps)(App);
