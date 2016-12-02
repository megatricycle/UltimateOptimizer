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
    objectiveFunction: '1 * a + 0.5 * b + 2.5 * c + 3 * d',
    constraints: [
        '1.5 * a + 1 * b + 0 * c + 2 * d >= 35',
        '0 * a + 2 * b + 6 * c + 4 * d >= 120',
        '1 * a + 1 * b +  1 * c + 1 * d >= 50',
        '0.5a + 2.5c + 1.5d >= 75'
    ],
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