import * as constants from '../constants/appConstants';

export function updateState(state) {
    return {
        type: constants.STATE_UPDATE,
        state: state
    };
}