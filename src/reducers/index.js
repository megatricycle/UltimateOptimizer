import { combineReducers } from 'redux';

import appReducer from './appReducer';
import ultimateOptimizerReducer from './ultimateOptimizerReducer';
import dietOptimizerReducer from './dietOptimizerReducer';

export default combineReducers({
    app: appReducer,
    ultimateOptimizer: ultimateOptimizerReducer,
    dietOptimizer: dietOptimizerReducer
});