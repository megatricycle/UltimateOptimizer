import { FOOD_TOGGLE } from '../constants/dietOptimizerConstants';

export function toggleFood(food) {
    return {
        type: FOOD_TOGGLE,
        food
    }
}