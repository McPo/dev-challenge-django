import { connect } from 'react-redux';
import App from '../components/App';

const mapStateToProps = (state, props) => ({
	loading: state.app.loading,
	result: state.app.result,
});

export default connect(mapStateToProps)(App);
