import reducerFactory from '@ui/utils/reducerFactory';

export const REQUEST_INITIAL_ITEMS = 'REQUEST_INITIAL_ITEMS';
export const RECEIVE_INITIAL_ITEMS = 'RECEIVE_INITIAL_ITEMS';
export const TOGGLE_ITITIAL_LOADING = 'TOGGLE_ITITIAL_LOADING';
export const TOGGLE_LOADING = 'TOGGLE_LOADING';
export const REQUEST_ITEMS = 'REQUEST_ITEMS';
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';
export const SELECT_PAGE = 'SELECT_PAGE';
export const LOADING_MORE = 'LOADING_MORE';
export const SELECT_SORT_BY = 'SELECT_SORT_BY';

export const catalogPageDefaultState = {
    initialLoading: true,
    loading: false,
    itemsIds: [],
    itemsById: {},
    sortBy: '',
    filters: {},
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
    [RECEIVE_ITEMS]: receiveItemsStrategy,
    [SELECT_PAGE]: selectPageStrategy,
    [LOADING_MORE]: loadingMoreStrategy,
    [SELECT_SORT_BY]: selectSortByStrategy
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
        return { ...state, itemsById: { ...state.itemsById, ...newItemsById } };
    }

    return { ...state, itemsById: newItemsById };
}

function paginationReducer(state, { ...payload }) {
    const newPaginationState = { ...state.pagination, ...payload };

    return { ...state, pagination: newPaginationState };
}

function selectedPagesReducer(state, { page, addNextPage = false }) {
    let newSelectedPagesState = [...state.pagination.selectedPages];

    if (page) {
        const formatedPage = Number.parseInt(page, 10);
        newSelectedPagesState = [formatedPage];
    } else if (addNextPage && newSelectedPagesState.length > 0) {
        const currentPage = newSelectedPagesState[newSelectedPagesState.length - 1];
        const { total, itemsPerPage } = state.pagination;
        const nextPage = currentPage + 1;
        const lastPage = Math.round(Math.floor(total / itemsPerPage));

        if (nextPage <= lastPage) {
            newSelectedPagesState = [...newSelectedPagesState, nextPage];
        }
    }

    const newPaginationState = { ...state.pagination, selectedPages: newSelectedPagesState };
    return { ...state, pagination: newPaginationState };
}

function sortByReducer(state, { value = '' }) {
    return { ...state, sortBy: value };
}

function requestInitialItemsStrategy(state) {
    let newState = { ...state, initialLoading: true };
    newState = selectedPagesReducer(newState, { page: 1 });

    return newState;
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

function receiveItemsStrategy(state, { items, total, page, sort }) {
    let newState = toggleLoadingStrategy(state, { toggle: false });

    newState = paginationReducer(newState, { total });

    if (page) {
        newState = selectedPagesReducer(newState, { page });
    }

    if (sort) {
        newState = sortByReducer(newState, { value: sort });
    }

    newState = itemsIdsReducer(newState, items);
    newState = itemsByIdReducer(newState, items);

    return { ...newState };
}

function receiveInitialItemsStrategy(state, { total, page, sort, items }) {
    let newState = toggleInitialLoadingStrategy(state, { toggle: false });

    newState = paginationReducer(newState, { total });
    newState = selectedPagesReducer(newState, { page });
    newState = sortByReducer(newState, { value: sort });
    newState = itemsIdsReducer(newState, items);
    newState = itemsByIdReducer(newState, items);

    return { ...newState };
}

function selectPageStrategy(state, { page }) {
    let newState = toggleLoadingStrategy(state, { toggle: true });
    newState = selectedPagesReducer(newState, { page });

    return { ...newState };
}

function loadingMoreStrategy(state) {
    let newState = toggleLoadingStrategy(state, { toggle: true });
    newState = selectedPagesReducer(newState, { addNextPage: true });

    return { ...newState };
}

function selectSortByStrategy(state, { value }) {
    let newState = toggleLoadingStrategy(state, { toggle: true });
    newState = selectedPagesReducer(newState, { page: 1 });
    newState = sortByReducer(newState, { value });

    return { ...newState };
}

export const catalogPageReducer = reducerFactory(strategies, catalogPageDefaultState);
