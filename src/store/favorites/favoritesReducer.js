import reducerFactory from '@ui/utils/reducerFactory';
import { ADD_TO_FAVORITE } from './favoritesActions';

const defaultState = {
    allIds: [],
    byId: {},
    selected: []
};

const strategies = {
    [ADD_TO_FAVORITE]: addToFavoriteStrategy
};

function allIdsReducer(store, payload) {
    const { id: idProp = null } = payload;

    if (idProp) {
        const allIdsState = store.allIds;
        let newAllIdsState = [...allIdsState];

        if (newAllIdsState.indexOf(idProp) !== -1) {
            newAllIdsState = newAllIdsState.filter((id) => id !== idProp);
        } else {
            newAllIdsState = [...newAllIdsState, idProp];
        }

        return { ...store, allIds: newAllIdsState };
    }

    return store;
}

function byIdReducer(store, payload) {
    const { id: idProp = null, ...rest } = payload;

    if (idProp) {
        const byIdState = store.byId;

        let newByIdState = { ...byIdState };

        if (newByIdState[idProp]) {
            delete newByIdState[idProp];
        } else {
            newByIdState = { ...newByIdState, [idProp]: { ...rest } };
        }

        return { ...store, byId: newByIdState };
    }

    return store;
}

function addToFavoriteStrategy(store, payload) {
    let newStore = allIdsReducer(store, payload);
    newStore = byIdReducer(newStore, payload);

    return newStore;
}

export default reducerFactory(strategies, defaultState);
