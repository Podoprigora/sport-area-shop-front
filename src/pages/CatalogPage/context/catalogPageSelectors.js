import { useMemo } from 'react';
import { catalogPageDefaultState } from './catalogPageReducers';

const shouldReloadItemsSelector = (state) => {
    return state.shouldReloadItems;
};

const productSelector = (state, id) => {
    const itemsById = state.itemsById;

    return itemsById[id] || null;
};

const productsSelector = (state) => {
    const itemsIds = state.itemsIds;

    return itemsIds.reduce((result, id) => {
        const product = productSelector(state, id);
        return product ? [...result, product] : result;
    }, []);
};

const initialLoadingSelector = (state) => {
    return state.initialLoading;
};

const loadingSelector = (state) => {
    return state.loading;
};

const itemPerPageSelector = (state) => {
    return state.pagination.itemsPerPage;
};

const pagesCountSelector = (state) => {
    const total = Number.parseInt(state.pagination.total, 10);
    const itemsPerPage = Number.parseInt(state.pagination.itemsPerPage, 10);

    return Math.round(Math.floor(total / itemsPerPage));
};

const selectedPagesSelector = (state) => {
    return state.pagination.selectedPages;
};

const selectedPageSelector = (state) => {
    const selectedPages = selectedPagesSelector(state);

    return selectedPages && selectedPages.length > 0 && selectedPages[selectedPages.length - 1];
};

const isLastPageSelector = (state) => {
    const selectedPage = selectedPageSelector(state);
    const pagesCount = pagesCountSelector(state);

    return selectedPage === pagesCount;
};

const sortBySelector = (state) => {
    return state.sortBy;
};

const getSelectedFilters = (state) => {
    return state.filters.selected;
};

const getFiltersItemById = (state, id) => {
    return state.filters.itemsById[id];
};

const getSelectedFiltersById = (state, id, defaultValue) => {
    return state.filters.selected[id] || defaultValue;
};

const filtersItemsSelector = (state) => {
    const itemsIds = state.filters.itemsIds || [];

    return itemsIds.reduce((result, id) => {
        const filterItem = getFiltersItemById(state, id);
        return filterItem ? [...result, filterItem] : result;
    }, []);
};

const useCatalogPageSelectors = (state = catalogPageDefaultState) => {
    return useMemo(
        () => ({
            shouldReloadItems: shouldReloadItemsSelector(state),
            initialLoading: initialLoadingSelector(state),
            loading: loadingSelector(state),
            products: productsSelector(state),
            itemsPerPage: itemPerPageSelector(state),
            pagesCount: pagesCountSelector(state),
            selectedPages: selectedPagesSelector(state),
            selectedPage: selectedPageSelector(state),
            isLastPage: isLastPageSelector(state),
            sortBy: sortBySelector(state),
            filtersItems: filtersItemsSelector(state),
            selectedFilters: getSelectedFilters(state),
            getFiltersItemById: (id) => getFiltersItemById(state, id),
            getSelectedFiltersById: (id, defaultValue) =>
                getSelectedFiltersById(state, id, defaultValue)
        }),
        [state]
    );
};

export { useCatalogPageSelectors };
