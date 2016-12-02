import {
    START_PAGE,
    STATE_UPDATE
} from '../constants/appConstants';

const init = {
    state: START_PAGE
};

const appOptmizerReducer = (state = init, action) => {
    switch(action.type) {
        case STATE_UPDATE: {
            return Object.assign({}, state, {
                state: action.state
            });
        }
        default: {}
    }

    return state;
};

export default appOptmizerReducer;