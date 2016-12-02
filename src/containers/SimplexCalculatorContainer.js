import { connect } from 'react-redux';

import SimplexCalculator from '../components/SimplexCalculator/SimplexCalculator';
import * as actions from '../actions/simplexCalculatorActions';

const mapStateToProps = (state) => {
    return {
        state: state.simplexCalculator
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setGoal(goal) {
            dispatch(actions.setGoal(goal));
        },
        setObjectiveFunction(objectiveFunction) {
            dispatch(actions.setObjectiveFunction(objectiveFunction));
        },
        addConstraint(constraint) {
            dispatch(actions.addConstraint(constraint));
        },
        editConstraint(index, constraint) {
            dispatch(actions.editConstraint(index, constraint));
        },
        setSolution(solution) {
            dispatch(actions.setSolution(solution));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SimplexCalculator);