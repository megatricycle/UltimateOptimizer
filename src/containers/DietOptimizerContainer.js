import { connect } from 'react-redux';

import { toggleFood } from '../actions/dietOptimizerActions';
import DietOptimizer from '../components/DietOptimizer/DietOptimizer';

const mapStateToProps = (state) => {
    return {
        state: state.dietOptimizer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleFood(food) {
            dispatch(toggleFood(food));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DietOptimizer);