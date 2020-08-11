import { catalogPageDefaultState } from './catalogPageReducers';

const productSelector = (state, id) => {
    const itemsById = state.itemsById;

    return itemsById[id];
};

const productsSelector = (state) => {
    const itemsIds = state.itemsIds;

    return itemsIds.reduce((result, id) => {
        const product = productSelector(state, id);
        return [...result, product];
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

const useCatalogPageSelectors = (state = catalogPageDefaultState) => {
    return {
        initialLoading: initialLoadingSelector(state),
        loading: loadingSelector(state),
        products: productsSelector(state),
        itemsPerPage: itemPerPageSelector(state),
        pagesCount: pagesCountSelector(state),
        selectedPages: selectedPagesSelector(state)
    };
};

export default useCatalogPageSelectors;
