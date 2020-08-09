import reducerFactory from '@ui/utils/reducerFactory';
import { RECEIVE_IDENTITY, LOGOUT } from './identityActions';

const defaultState = {
    auth: false,
    user: null
};

const strategies = {
    [RECEIVE_IDENTITY]: receiveIdentityStrategy,
    [LOGOUT]: logoutStrategy
};

function receiveIdentityStrategy(state, payload) {
    const { data } = payload;

    if (data) {
        return { ...defaultState, ...data };
    }

    return state;
}

function logoutStrategy() {
    return defaultState;
}

export default reducerFactory(strategies, defaultState);
