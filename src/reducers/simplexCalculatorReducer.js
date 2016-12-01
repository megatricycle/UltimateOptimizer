import {
    GOAL_SET,
    GOAL_MINIMIZE,
    OBJECTIVE_FUNCTION_SET,
    CONSTRAINTS_ADD,
    CONSTRAINTS_EDIT
} from '../constants/simplexCalculatorConstants';

const init = {
    goal: GOAL_MINIMIZE,
    objectiveFunction: '150 * x1 + 175 * x2',
    constraints: [
        '7 * x1 + 11 * x2 <= 77',
        '10 * x1 + 8 * x2  <= 80',
        '1 * x1 <= 9',
        '1 * x2 <= 6'
    ]
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

        default: {}
    };

    return state;
};

export default simplexCalculatorReducer;