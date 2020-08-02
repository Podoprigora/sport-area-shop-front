import { RECEIVE_IDENTITY, LOGOUT } from './identityActions';

const defaultState = {
    auth: false,
    user: null
};

const identity = (state = defaultState, { type, payload = {} }) => {
    switch (type) {
        case RECEIVE_IDENTITY: {
            const { data } = payload;

            if (data) {
                return { ...defaultState, ...data };
            }

            return defaultState;
        }
        case LOGOUT: {
            return defaultState;
        }
        default:
            return state;
    }
};

export default identity;
