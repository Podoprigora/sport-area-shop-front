import reducerFactory from '@ui/utils/reducerFactory';
import {
    ADD_TO_WISHLIST,
    CHANGE_WISHLIST_SORT,
    DELETE_WISHLIST_SELECTED_ITEMS,
    RECEIVE_INITIAL_WISHLIST,
    RECEIVE_WISHLIST,
    SELECT_ALL_WISHLIST_ITEMS,
    SELECT_WISHLIST_ITEM
} from './wishlistActions';

const defaultState = {
    allIds: [],
    byId: {},
    selected: [],
    sortBy: 'added-date'
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

function sortByReducer(state, value) {
    return { ...state, sortBy: value };
}

// Strategies

const strategies = {
    [ADD_TO_WISHLIST]: addToWishlistStrategy,
    [RECEIVE_INITIAL_WISHLIST]: receiveInitialWishlistStrategy,
    [RECEIVE_WISHLIST]: receiveWishlistStrategy,
    [CHANGE_WISHLIST_SORT]: changeWishlistSortStrategy,
    [SELECT_WISHLIST_ITEM]: selectWishlistItemStrategy,
    [SELECT_ALL_WISHLIST_ITEMS]: selectAllWishlistItemsStrategy,
    [DELETE_WISHLIST_SELECTED_ITEMS]: deleteWishlistSelectedItemsStrategy
};

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

    let newState = allIdsReducer(state, items);
    newState = byIdReducer(newState, items);

    return newState;
}

function changeWishlistSortStrategy(state, payload) {
    const { value } = payload;
    const newState = sortByReducer(state, value);

    return newState;
}

function selectWishlistItemStrategy(state, payload) {
    const { id: idProp } = payload;

    if (idProp) {
        const selectedState = state.selected;
        let newSelectedState = [...selectedState];

        if (newSelectedState.indexOf(idProp) !== -1) {
            newSelectedState = newSelectedState.filter((id) => id !== idProp);
        } else {
            newSelectedState = [...newSelectedState, idProp];
        }

        return { ...state, selected: newSelectedState };
    }

    return state;
}

function selectAllWishlistItemsStrategy(state, payload) {
    const { toggle = true } = payload;
    const allIdsState = state.allIds;

    const newSelectedState = toggle ? [...allIdsState] : [];

    return { ...state, selected: newSelectedState };
}

function deleteWishlistSelectedItemsStrategy(state) {
    const selectedState = state.selected;
    const allIdsState = state.allIds;
    const byIdState = state.byId;

    const newAllIdsState = allIdsState.filter((id) => {
        return selectedState.indexOf(id) === -1;
    });

    const newByIdState = selectedState.reduce(
        (result, id) => {
            if (result[id]) {
                delete result[id];
            }

            return result;
        },
        { ...byIdState }
    );

    return { ...state, allIds: newAllIdsState, byId: newByIdState, selected: [] };
}

export default reducerFactory(strategies, defaultState);
