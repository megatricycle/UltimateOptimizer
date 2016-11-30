import { connect } from 'react-redux';

import UltimateOptimizer from '../components/UltimateOptimizer/UltimateOptimizer';

const mapStateToProps = (state) => {
    return {
        state: state.ultimateOptimizer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UltimateOptimizer);