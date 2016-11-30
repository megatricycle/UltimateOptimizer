import { connect } from 'react-redux';

import { updateState } from '../actions/appActions';

import App from '../components/App/App';

const mapStateToProps = (state) => {
    return {
        state: state.app
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateState(state) {
            dispatch(updateState(state));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);