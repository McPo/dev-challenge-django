import { connect } from 'react-redux';
import App from '../components/App';

const mapStateToProps = (state, props) => ({
	loading: false,
	result: 1000
});

export default connect(mapStateToProps)(App);
