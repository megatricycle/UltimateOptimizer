import {
    GOAL_SET,
    GOAL_MINIMIZE,
    OBJECTIVE_FUNCTION_SET,
    CONSTRAINTS_ADD,
    CONSTRAINTS_EDIT,
    SOLUTION_SET
} from '../constants/simplexCalculatorConstants';

const init = {
    goal: GOAL_MINIMIZE,
    objectiveFunction: '',
    constraints: [],
    solution: null
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
                ].filter(c => c !== '')
            });
        }

        case CONSTRAINTS_EDIT: {
            return Object.assign({}, state, {
                constraints: state.constraints.map((constraint, index) => {
                    if(index === action.index) {
                        return action.constraint;
                    }

                    return constraint;
                }).filter(c => c !== '')
            });
        }

        case SOLUTION_SET: {
            return Object.assign({}, state, {
                solution: action.solution
            });
        }

        default: {}
    };

    return state;
};

export default simplexCalculatorReducer;