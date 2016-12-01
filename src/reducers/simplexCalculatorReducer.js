import {
    GOAL_SET,
    GOAL_MINIMIZE,
    OBJECTIVE_FUNCTION_SET,
    CONSTRAINTS_ADD,
    CONSTRAINTS_EDIT
} from '../constants/simplexCalculatorConstants';

const init = {
    goal: GOAL_MINIMIZE,
    objectiveFunction: "",
    constraints: []
};

const simplexCalculatorReducer = (state = init, action) => {
    switch(action.type) {
        case GOAL_SET: {
            return Object.assign({}, state, {
                goal: action.goal
            });
        }

        case OBJECTIVE_FUNCTION_SET: {
            return Object.assign({}, state, {
                objectiveFunction: action.objectiveFunction
            });
        }

        case CONSTRAINTS_ADD: {
            return Object.assign({}, state, {
                constraints: [
                    ...state.constraints, action.constraint
                ]
            });
        }

        case CONSTRAINTS_EDIT: {
            return Object.assign({}, state, {
                constraints: state.constraints.map((constraint, index) => {
                    if(index === action.index) {
                        return action.constraint;
                    }

                    return constraint;
                })
            });
        }

        default: {}
    };

    return state;
};

export default simplexCalculatorReducer;