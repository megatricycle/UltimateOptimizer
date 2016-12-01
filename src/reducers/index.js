import { combineReducers } from 'redux';

import appReducer from './appReducer';
import simplexCalculatorReducer from './simplexCalculatorReducer';
import dietOptimizerReducer from './dietOptimizerReducer';

export default combineReducers({
    app: appReducer,
    simplexCalculator: simplexCalculatorReducer,
    dietOptimizer: dietOptimizerReducer
});