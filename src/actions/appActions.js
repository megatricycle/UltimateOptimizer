export const STATE_UPDATE = "STATE_UPDATE";

export function updateState(state) {
    return {
        type: STATE_UPDATE,
        state: state
    };
}