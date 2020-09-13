import reducerFactory from '@ui/utils/reducerFactory';
import { ADD_TO_FAVORITE, RECEIVE_INITIAL_FAVORITES } from './favoritesActions';

const defaultState = {
    allIds: [],
    byId: {},
    selected: []
};

const strategies = {
    [ADD_TO_FAVORITE]: addToFavoriteStrategy,
    [RECEIVE_INITIAL_FAVORITES]: receiveInitialFavoritesStrategy
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

function addToFavoriteStrategy(state, payload) {
    const newState = allIdsReducer(state, payload);

    return newState;
}

function receiveInitialFavoritesStrategy(state, payload) {
    const { ids } = payload;

    return { ...defaultState, allIds: ids };
}

export default reducerFactory(strategies, defaultState);
