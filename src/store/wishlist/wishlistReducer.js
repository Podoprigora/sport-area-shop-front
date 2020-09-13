import reducerFactory from '@ui/utils/reducerFactory';
import { ADD_TO_WISHLIST, RECEIVE_INITIAL_WISHLIST } from './wishlistActions';

const defaultState = {
    allIds: [],
    byId: {},
    selected: []
};

const strategies = {
    [ADD_TO_WISHLIST]: addToWishlistStrategy,
    [RECEIVE_INITIAL_WISHLIST]: receiveInitialWishlistStrategy
};

function allIdsReducer(state, payload) {
    const { id: idProp = null } = payload;

    if (idProp) {
        const allIdsState = state.allIds;
        let newAllIdsState = [...allIdsState];

        if (newAllIdsState.indexOf(idProp) !== -1) {
            newAllIdsState = newAllIdsState.filter((id) => id !== idProp);
        } else {
            newAllIdsState = [...newAllIdsState, idProp];
        }

        return { ...state, allIds: newAllIdsState };
    }

    return state;
}

function byIdReducer(state, payload) {
    const { id: idProp = null, ...rest } = payload;

    if (idProp) {
        const byIdState = state.byId;

        let newByIdState = { ...byIdState };

        if (newByIdState[idProp]) {
            delete newByIdState[idProp];
        } else {
            newByIdState = { ...newByIdState, [idProp]: { ...rest } };
        }

        return { ...state, byId: newByIdState };
    }

    return state;
}

function addToWishlistStrategy(state, payload) {
    const newState = allIdsReducer(state, payload);

    return newState;
}

function receiveInitialWishlistStrategy(state, payload) {
    const { ids } = payload;

    return { ...defaultState, allIds: ids };
}

export default reducerFactory(strategies, defaultState);
