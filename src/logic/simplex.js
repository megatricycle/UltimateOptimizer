import math from 'mathjs';

import { GOAL_MINIMIZE } from '../constants/simplexCalculatorConstants';

import { 
    toAugCoeff,
    getAllVariables,
    convertToSlack,
    convertToSlackMinimize,
    toObjectiveFunction,
    convertToMinimization,
    toEquationString,
    toInequality
} from './equation';

export const getColumn = (mat, index) => {
    const rows = math.size(mat)[0];
    const matrix = math.matrix(mat);

    return math.flatten(matrix.subset(math.index([...Array(rows).keys()], index)).toArray());
};

export const getBasicSolution = (variables, mat) => {
    return variables.map((variable, i) => {
        let value;
        let col = getColumn(mat, i);

        const onesCount = col.filter(e => e === 1).length;
        const zerosCount = col.filter(e => e === 0).length;

        if(onesCount === 1 && zerosCount === col.length - 1) {
            const oneIndex = col.indexOf(1);

            value = mat[oneIndex][mat[oneIndex].length - 1];
        }
        else {
            value = 0;
        }

        return {
            variable,
            value
        };
    });
}

export const rowHasNegative = (row) => {
    return row.filter(a => a < 0).length > 0;
}

export const getPivotColumnIndex = (row) => {
    return row.reduce((largestNegativeIndex, currentValue, i) => {
        if(largestNegativeIndex === -1) {
            return i;
        }

        return currentValue < row[largestNegativeIndex] ? i : largestNegativeIndex
    }, -1);
}

export const getMatrixSize = (mat) => {
    return math.matrix(mat).size();
}

export const getPivotElementIndex = (mat) => {
    // get pivot column
    const pivotColumnIndex = getPivotColumnIndex(mat[mat.length - 1]);
    const rightMostColumn = getColumn(mat, getMatrixSize(mat)[1] - 1);
    const pivotColumn = getColumn(mat, pivotColumnIndex);

    const pivotElementIndex = pivotColumn.reduce((smallestValueIndex, value, i) => {
        if(value > 0 && rightMostColumn[i] > 0) {
            if(smallestValueIndex === -1) {
                return i;
            }

            const smallestValueRatio = rightMostColumn[smallestValueIndex] / pivotColumn[smallestValueIndex];
            const currentValueRatio = rightMostColumn[i] / value;

            return currentValueRatio < smallestValueRatio ? i : smallestValueIndex;
        }

        return smallestValueIndex;
    }, -1);

    return [pivotElementIndex, pivotColumnIndex];
}

export const normalize = (row, value) => {
    return row.map(a => a / value);
}

export const clearColumn = (mat, pivotElementIndex) => {
    const pivotRow = math.matrix(mat[pivotElementIndex[0]]);

    return mat.map((row, i) => {
        if(i !== pivotElementIndex[0]) {
            const valueToBeEliminated = mat[i][pivotElementIndex[1]];
            const multipliedPivotRow = math.multiply(pivotRow, valueToBeEliminated);

            return math.subtract(math.matrix(row), multipliedPivotRow).toArray();
        }

        return row;
    });
}

export const simplexMethod = (objectiveFunction, constraints, goal) => {
    let originalUnknowns;

    if(goal === GOAL_MINIMIZE) {
        const toBeAugCoeff = [
            ...constraints.map(c => convertToMinimization(c)),
            objectiveFunction
        ];

        const unknowns = getAllVariables(toBeAugCoeff);
        originalUnknowns = unknowns.slice(0);

        let tableu = toAugCoeff(toBeAugCoeff);

        console.table(tableu);

        tableu = math.transpose(math.matrix(tableu)).toArray();

        console.table(tableu);

        const tableuEquationString = tableu.map(row => toEquationString(unknowns, row));

        objectiveFunction = tableuEquationString[tableuEquationString.length - 1];

        constraints = tableuEquationString.slice(0, tableuEquationString.length - 1)
            .map(c => toInequality(c));
    }

    let toBeAugCoeff;
    
    if(goal === GOAL_MINIMIZE) {
        toBeAugCoeff = [
            ...constraints.map((c, i) => convertToSlackMinimize(c, originalUnknowns[i])),
            toObjectiveFunction(objectiveFunction)
        ];
    }
    else {
        toBeAugCoeff = [
            ...constraints.map((c, i) => convertToSlack(c, i + 1)),
            toObjectiveFunction(objectiveFunction)
        ];
    }

    const unknowns = getAllVariables(toBeAugCoeff);

    // get initial tableu
    let tableu = toAugCoeff(toBeAugCoeff);
    let basicSolution = getBasicSolution(unknowns, tableu);
    let logs = [{ tableu, basicSolution }];

    while(rowHasNegative(tableu[tableu.length - 1])) {
        // get pivot element
        const pivotElementIndex = getPivotElementIndex(tableu);
        const pivotElement = tableu[pivotElementIndex[0]][pivotElementIndex[1]];

        // normalize
        tableu[pivotElementIndex[0]] = normalize(tableu[pivotElementIndex[0]], pivotElement);

        // clear pivot column
        tableu = clearColumn(tableu, pivotElementIndex);

        // get basic solution
        basicSolution = getBasicSolution(unknowns, tableu);

        logs = [
            ...logs, {
                tableu,
                basicSolution
            }
        ];
    }

    if(goal === GOAL_MINIMIZE) {
        // use bottom values for slack variables
        basicSolution = basicSolution.map((u, i) => {
            if(originalUnknowns.indexOf(u.variable) >= 0) {
                return {
                    variable: u.variable,
                    value: tableu[tableu.length - 1][i]
                };
            }
            else {
                return u;
            }
        });
    }

    return {
        answer: {
            tableu,
            basicSolution: basicSolution.filter(a => !/^S[0-9]+$/.test(a.variable))
        },
        logs,
        unknowns
    };
}