import reducerFactory from '@ui/utils/reducerFactory';

export const TOGGLE_LOADING = 'TOGGLE_LOADING';
export const REQUEST_PRODUCT = 'REQUEST_PRODUCT';
export const RECEIVE_PRODUCT = ' RECEIVE_PRODUCT';

const defaultFeaturesState = {
    items: []
};

const defaultCommentsState = {
    allIds: [],
    itemsById: {},
    selectedPages: [1],
    sortBy: null,
    total: 0,
    itemsPerPage: 5,
    totalRating: 0
};

export const productPageDefaultState = {
    loading: false,
    id: null,
    brand: '',
    name: '',
    price: null,
    oldPrice: null,
    currency: '',
    sizes: [],
    selectedSize: null,
    images: [],
    thumbnails: [],
    features: defaultFeaturesState,
    comments: defaultCommentsState
};

function loadingReducer(state, loading = false) {
    return { ...state, loading };
}

function commentsReducer(state, commentsPayload = {}) {
    const { items = [], ...otherCommentsPayload } = commentsPayload;
    let newCommentsState = { ...defaultCommentsState, ...state.comments, ...otherCommentsPayload };

    newCommentsState = items.reduce((result, item) => {
        const { id } = item || {};
        const newAllIds = [...result?.allIds];
        const newItemsById = { ...result?.itemsById };

        if (id) {
            if (newAllIds.indexOf(id) === -1) {
                newAllIds.push(id);
            }

            if (!newItemsById?.id) {
                newItemsById[id] = item;
            }

            return {
                ...result,
                allIds: newAllIds,
                itemsById: newItemsById
            };
        }

        return result;
    }, newCommentsState);

    return { ...state, comments: newCommentsState };
}

// Strategies

const strategies = {
    [TOGGLE_LOADING]: toggleLoadingStrategy,
    [REQUEST_PRODUCT]: requestProductStrategy,
    [RECEIVE_PRODUCT]: receiveProductStrategy
};

function toggleLoadingStrategy(state, { toggle = false }) {
    const newState = loadingReducer(state, toggle);
    return newState;
}

function requestProductStrategy() {
    const newState = loadingReducer(productPageDefaultState, true);
    return newState;
}

function receiveProductStrategy(state, payload) {
    const { comments: commentsPayload, ...other } = payload || {};
    let newState = { ...state, ...other };

    newState = loadingReducer(newState, false);
    newState = commentsReducer(newState, commentsPayload);

    return newState;
}

export const productPageReducer = reducerFactory(strategies, productPageDefaultState);
