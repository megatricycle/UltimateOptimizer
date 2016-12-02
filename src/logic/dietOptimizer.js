import { simplexMethod } from './simplex';

export const generateConstraints = (foods, fields) => {
    let constraints = [];

    fields.forEach(field => {
        constraints.push(foods.map((f, i) => f[field] + ' * x' + i).join(' + ') + ' >= 0');
        constraints.push(foods.map((f, i) => f[field] + ' * x' + i).join(' + ') + ' <= 0');
    });

    return constraints;
}

export const optimizeDiet = (foods) => {
    const foodNames = foods.map(f => f.name);

    // objective function
    const objectiveFunction = foods.map((f, i) => f.pricePerServing + ' * x' + i).join(' + ');

    console.log(objectiveFunction);

    // constraints

    // cholesterol
    let constraints = generateConstraints(foods, [
        'calories',
        'cholesterol',
        'totalFat',
        'sodium',
        'carbohydrates',
        'dietaryFiber',
        'protein',
        'vitA',
        'vitC',
        'calcium',
        'iron'
    ]);

    // simplex
    let s = simplexMethod(objectiveFunction, constraints, 0);

    console.table(s.answer.basicSolution);

    s.logs.forEach(log => console.table(log.tableu));
}