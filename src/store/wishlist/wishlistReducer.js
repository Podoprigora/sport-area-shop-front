import reducerFactory from '@ui/utils/reducerFactory';
import { ADD_TO_WISHLIST, RECEIVE_INITIAL_WISHLIST, RECEIVE_WISHLIST } from './wishlistActions';

const defaultState = {
    allIds: [],
    byId: {},
    selected: []
};

const strategies = {
    [ADD_TO_WISHLIST]: addToWishlistStrategy,
    [RECEIVE_INITIAL_WISHLIST]: receiveInitialWishlistStrategy,
    [RECEIVE_WISHLIST]: receiveWishlistStrategy
};

function allIdsReducer(state, items = []) {
    const newState = items.map(({ id }) => id);

    return { ...state, allIds: newState };
}

function byIdReducer(state, items = []) {
    const newState = items.reduce((result, item) => {
        const { id } = item;
        return { ...result, [id]: item };
    }, {});

    return { ...state, byId: newState };
}

function addToWishlistStrategy(state, payload) {
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

function receiveInitialWishlistStrategy(state, payload) {
    const { ids } = payload;

    return { ...defaultState, allIds: ids };
}

function receiveWishlistStrategy(state, payload) {
    const { items = [] } = payload;

    let newState = allIdsReducer(defaultState, items);
    newState = byIdReducer(newState, items);

    return newState;
}

export default reducerFactory(strategies, defaultState);
