// export const range = (x, y) => {
//     return [...Array(y).keys()].filter(a => a >= x);
// }

// removes duplicates from the given array 
export const getUniqueValues = (array) => {
    return array.filter((s, i) => array.indexOf(s) === i);
}

// returns the list of arguments from a given equation
export const extractArguments = (equ) => {
    return getUniqueValues(
        equ
            .split(' ')
            .filter(s => /^[a-zA-Z]+[a-zA-Z0-9]*$/.test(s))
    );
}

// converts the exponent notation ^ to javascript exponent notation Math.pow()
export const convertPower = (equ) => {
    return equ.replace(/([A-Za-z0-9]+) \^ ([A-Za-z0-9]+)/, (match, p1, p2) => 'Math.pow(' + p1 + ', ' + p2 + ')')
}

// converts a given string to actual function
// @TODO: needed?
// export const parseFunction = (equ) => {
//     return eval('(' + extractArguments(equ).join(',') + ') => ' + convertPower(equ));
// }

// adds slack variables to given inequality
export const convertToSlack = (equ, index) => {
    let sign;

    if(equ.indexOf('<=') >= 0) {
        // positive slack
        equ = equ.split('<=').map(e => e.trim());

        sign = '';
    }
    else {
        // negative slack
        equ = equ.split('>=').map(e => e.trim());

        sign = '-';
    }

    return equ[0] + ' + ' + sign + '1 * S' + index + ' + ' + (equ[1].charAt(0) === '-' ? equ[1].substring(1) : '-' + equ[1]);
}

export const convertToSlackMinimize = (equ, variable) => {
    let sign;

    if(equ.indexOf('<=') >= 0) {
        // positive slack
        equ = equ.split('<=').map(e => e.trim());

        sign = '';
    }
    else {
        // negative slack
        equ = equ.split('>=').map(e => e.trim());

        sign = '-';
    }

    return equ[0] + ' + ' + sign + '1 * ' + variable + ' + ' + (equ[1].charAt(0) === '-' ? equ[1].substring(1) : '-' + equ[1]);
}

export const convertToMinimization = (equ) => {
    let sign;

    if(equ.indexOf('>=') >= 0) {
        // positive slack
        equ = equ.split('>=').map(e => e.trim());

        sign = '-';
    }
    else {
        // negative slack
        equ = equ.split('<=').map(e => e.trim());

        sign = '';
    }

    return equ[0] + ' + ' + sign + equ[1];
}

// converts to an objective function form
export const toObjectiveFunction = (equ) => {
    return equ.split(' ').map(t => /^[0-9]+(\.[0-9]+)?$/.test(t) ? '-' + t : t).join(' ') + ' + 1 * Z';
}

// gets all variables from a system of linear equation
export const getAllVariables = (listEqu) => {
    return listEqu.reduce((accu, currentValue) => 
        getUniqueValues([...accu, ...extractArguments(currentValue)]),
        []
    );
}

// converts system of linear equation to augmented coefficients
export const toAugCoeff = (listEqu) => {
    const variables = getAllVariables(listEqu);

    return listEqu.map((equ) => {
        const equSplitted = equ.split(' ');

        return [
            ...variables.map(variable =>
                parseFloat(equSplitted[equSplitted.indexOf(variable) - 2]) || 0
            ),
            equSplitted[equSplitted.length - 1] === 'Z' ? 0 : -parseFloat(equSplitted[equSplitted.length - 1])
        ]
    });
}

// shifts a given char to the right by offset
export const asciiAdjust = (char, offset) => {
    const charCode = char.charCodeAt(0);

    let startCode;

    if(charCode >= 97) {
        startCode = 97;
    }
    else {
        startCode = 65;
    }

    return String.fromCharCode((((charCode + offset) - startCode) % 26) + startCode);
} 

export const toEquationString = (variables, row) => {
    console.log(row);

    return row
        .filter(a => !isNaN(a))
        .map((n, i) => variables[i] ? n + ' * ' + asciiAdjust(variables[i], 5) : n)
        .join(' + ');
}

export const toInequality = (equ) => {
    const equSplitted = equ.split(' ');

    console.log(equSplitted);

    const rhs = parseFloat(equSplitted[equSplitted.length - 1]);

    equSplitted[equSplitted.length - 2] = rhs > 0 ? '<=' : '>=';

    return equSplitted.join(' ');
}