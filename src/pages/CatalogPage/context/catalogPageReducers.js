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
export const CHANGE_SELECTED_FILTERS = 'CHANGE_SELECTED_FILTERS';

function getDefaultSortBy() {
    return 'relevance';
}

function getDefaultSelectedPage() {
    return 1;
}

function getDefaultSelectedFilters() {
    return {};
}

export const catalogPageDefaultFiltersState = {
    itemsIds: [],
    itemsById: {},
    selected: getDefaultSelectedFilters()
};

export const catalogPageDefaultState = {
    shouldReloadItems: false,
    initialLoading: true,
    loading: false,
    itemsIds: [],
    itemsById: {},
    sortBy: getDefaultSortBy(),
    filters: catalogPageDefaultFiltersState,
    pagination: {
        total: 0,
        itemsPerPage: 24,
        selectedPages: [getDefaultSelectedPage()]
    }
};

const strategies = {
    [REQUEST_ITEMS]: requestItemsStrategy,
    [TOGGLE_LOADING]: toggleLoadingStrategy,
    [RECEIVE_ITEMS]: receiveItemsStrategy,
    [SELECT_PAGE]: selectPageStrategy,
    [LOADING_MORE]: loadingMoreStrategy,
    [SELECT_SORT_BY]: selectSortByStrategy,
    [CHANGE_SELECTED_FILTERS]: changeSelectedFiltersStrategy
};

function shouldReloadItemsReducer(state, shouldReload = false) {
    return { ...state, shouldReloadItems: shouldReload };
}

function loadingReducer(state, loading = false) {
    return { ...state, loading };
}

function initialLoadingReducer(state, initialLoading = false) {
    return { ...state, initialLoading };
}

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

function filtersItemsReducer(state, { items = [] }) {
    const itemsIds = items.map((item) => {
        const { id } = item;
        return id;
    });

    const itemsById = items.reduce((result, item) => {
        const { id } = item;
        return { ...result, [id]: item };
    }, {});

    const newFiltersState = {
        ...state.filters,
        itemsIds,
        itemsById
    };

    return { ...state, filters: newFiltersState };
}

function selectedFiltersReducer(state, { selected, merge = true }) {
    if (!(selected instanceof Object)) {
        const invalidType = typeof selected;
        console.error(
            `Invalid parameter type of 'selected', expecting a type [Object], but received a type [${invalidType}]!`
        );
        return state;
    }

    const selectedFiltersState = state.filters.selected;
    let newSelectedFiltersState = { ...selected };

    if (merge) {
        newSelectedFiltersState = { ...selectedFiltersState, ...selected };
    }

    return { ...state, filters: { ...state.filters, selected: newSelectedFiltersState } };
}

function toggleLoadingStrategy(state, { toggle = false }) {
    const { shouldReloadItems } = state;

    return { ...state, ...(shouldReloadItems ? { loading: toggle } : { initialLoading: toggle }) };
}

function requestItemsStrategy(state) {
    const newState = toggleLoadingStrategy(state, { toggle: true });

    return { ...newState };
}

function receiveItemsStrategy(
    state,
    { items, total, page, sort, filters, ...selectedFiltersProp }
) {
    const initialLoading = !state.shouldReloadItems;
    let newState = { ...state };
    let selectedPage = page;
    let sortBy = sort;
    let selectedFilters = selectedFiltersProp;

    if (initialLoading) {
        selectedPage = selectedPage || getDefaultSelectedPage();
        sortBy = sortBy || getDefaultSortBy();
        selectedFilters = selectedFilters || getDefaultSelectedFilters();

        newState = initialLoadingReducer(newState, false);
    } else {
        newState = loadingReducer(newState, false);
    }

    newState = paginationReducer(newState, { total });

    if (selectedPage) {
        newState = selectedPagesReducer(newState, { page: selectedPage });
    }

    if (sortBy) {
        newState = sortByReducer(newState, { value: sortBy });
    }

    if (filters) {
        newState = filtersItemsReducer(newState, { items: filters });
    }

    if (selectedFilters && typeof filters === 'object' && Object.keys(filters).length > 0) {
        newState = selectedFiltersReducer(newState, {
            selected: selectedFilters,
            merge: false
        });
    }

    newState = itemsIdsReducer(newState, items);
    newState = itemsByIdReducer(newState, items);

    newState = shouldReloadItemsReducer(newState, false);

    return { ...newState };
}

function selectPageStrategy(state, { page }) {
    let newState = selectedPagesReducer(state, { page });
    newState = shouldReloadItemsReducer(newState, true);

    return { ...newState };
}

function loadingMoreStrategy(state) {
    let newState = selectedPagesReducer(state, { addNextPage: true });
    newState = shouldReloadItemsReducer(newState, true);

    return { ...newState };
}

function selectSortByStrategy(state, { value }) {
    let newState = selectedPagesReducer(state, { page: 1 });
    newState = sortByReducer(newState, { value });
    newState = shouldReloadItemsReducer(newState, true);

    return { ...newState };
}

function changeSelectedFiltersStrategy(state, payload) {
    let newState = selectedPagesReducer(state, { page: 1 });
    newState = selectedFiltersReducer(newState, payload);
    newState = shouldReloadItemsReducer(newState, true);

    return { ...newState };
}

export const catalogPageReducer = reducerFactory(strategies, catalogPageDefaultState);
