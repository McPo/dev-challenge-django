import PropTypes from 'prop-types';

/**
 * In large projects I would have an App wrapper component
 * And swap the screens out using react-router
 * In this simple example it is not required
 * Expects a single node.
 */
const App = props => props.children;

App.propTypes = {
    children: PropTypes.node
};

export default App;
