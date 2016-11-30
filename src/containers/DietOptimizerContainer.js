import { connect } from 'react-redux';

import DietOptimizer from '../components/DietOptimizer/DietOptimizer';

const mapStateToProps = (state) => {
    return {
        state: state.dietOptimizer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DietOptimizer);