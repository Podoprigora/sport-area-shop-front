import reducerFactory from '@ui/utils/reducerFactory';

export const REQUEST_INITIAL_ITEMS = 'REQUEST_INITIAL_ITEMS';
export const RECEIVE_INITIAL_ITEMS = 'RECEIVE_INITIAL_ITEMS';
export const TOGGLE_ITITIAL_LOADING = 'TOGGLE_ITITIAL_LOADING';
export const TOGGLE_LOADING = 'TOGGLE_LOADING';
export const REQUEST_ITEMS = 'REQUEST_ITEMS';
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';

export const catalogPageDefaultState = {
    initialLoading: true,
    loading: false,
    itemsIds: [],
    itemsById: {},
    pagination: {
        total: 0,
        itemsPerPage: 8,
        selectedPages: [1]
    }
};

const strategies = {
    [REQUEST_INITIAL_ITEMS]: requestInitialItemsStrategy,
    [TOGGLE_ITITIAL_LOADING]: toggleInitialLoadingStrategy,
    [RECEIVE_INITIAL_ITEMS]: receiveInitialItemsStrategy,
    [REQUEST_ITEMS]: requestItemsStrategy,
    [TOGGLE_LOADING]: toggleLoadingStrategy,
    [RECEIVE_ITEMS]: receiveItemsStrategy
};

function itemsIdsReducer(state, items = []) {
    const selectedPages = state.pagination.selectedPages;
    const newItemsIds = items.map(({ id }) => id);

    if (selectedPages.length > 1) {
        return { ...state, itemsIds: [...state.itemsIds, ...newItemsIds] };
    }

    return { ...state, itemsIds: newItemsIds };
}

function itemsByIdReducer(state, items = []) {
    const selectedPages = state.pagination.selectedPages;
    const newItemsById = items.reduce((result, item) => {
        const { id } = item;
        return { ...result, [id]: item };
    }, {});

    if (selectedPages.length > 1) {
        return { ...state, itemsById: { ...state.itemById, ...newItemsById } };
    }

    return { ...state, itemsById: newItemsById };
}

function paginationReducer(state, { page, ...payload }) {
    const newPaginationState = { ...state.pagination, ...payload };

    if (page) {
        newPaginationState.selectedPages = [page];
    }
    return { ...state, pagination: newPaginationState };
}

function requestInitialItemsStrategy(state) {
    return { ...state, initialLoading: true };
}

function toggleInitialLoadingStrategy(state, { toggle = false }) {
    return { ...state, initialLoading: toggle };
}

function requestItemsStrategy(state) {
    return { ...state, loading: true };
}

function toggleLoadingStrategy(state, { toggle = false }) {
    return { ...state, loading: toggle };
}

function receiveInitialItemsStrategy(state, { items, total }) {
    let newState = toggleInitialLoadingStrategy(state, { toggle: false });
    newState = paginationReducer(newState, { total });
    newState = itemsIdsReducer(newState, items);
    newState = itemsByIdReducer(newState, items);

    return { ...newState };
}

function receiveItemsStrategy(state, { items, total, page }) {
    let newState = toggleLoadingStrategy(state, { toggle: false });
    newState = paginationReducer(newState, { page, total });
    newState = itemsIdsReducer(newState, items);
    newState = itemsByIdReducer(newState, items);

    return { ...newState };
}

export const catalogPageReducer = reducerFactory(strategies, catalogPageDefaultState);
