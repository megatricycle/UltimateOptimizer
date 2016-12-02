import * as constants from '../constants/simplexCalculatorConstants';

export function setGoal(goal) {
    return {
        type: constants.GOAL_SET,
        goal
    };
}

export function setObjectiveFunction(objectiveFunction) {
    return {
        type: constants.OBJECTIVE_FUNCTION_SET,
        objectiveFunction
    };
}

export function addConstraint(constraint) {
    return {
        type: constants.CONSTRAINTS_ADD,
        constraint
    };
}

export function editConstraint(index, constraint) {
    return {
        type: constants.CONSTRAINTS_EDIT,
        index,
        constraint
    };
}

export function setSolution(solution) {
    return {
        type: constants.SOLUTION_SET,
        solution
    }
}