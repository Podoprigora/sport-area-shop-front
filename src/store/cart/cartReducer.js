import produce from 'immer';
import reducerFactory from '@ui/utils/reducerFactory';

export const defaultCartProductState = {
    id: null,
    cartId: null,
    sizeId: null,
    image: '',
    name: '',
    brand: '',
    size: '',
    price: null,
    currency: null,
    qty: 1
};

export const defaultCartState = {
    allIds: [],
    itemsById: {}
};

const addToCartReducer = produce((draft, payload = defaultCartProductState) => {
    const { id } = payload;

    if (draft.allIds.indexOf(id) === -1) {
        draft.allIds.push(id);
    }

    if (!draft.itemsById[id]) {
        draft.itemsById[id] = payload;
    }
});

const removeFromCartRedecer = produce((draft, payload) => {
    const { id } = payload;

    if (id) {
        draft.allIds = draft.allIds.filter((itemId) => itemId !== id);

        if (draft.itemsById[id]) {
            delete draft.itemsById[id];
        }
    }
});

// Strategies

export const ADD_TO_CART = 'cart/ADD_TO_CART';
export const REMOVE_FROM_CART = 'cart/REMOVE_FROM_CART';

const strategies = {
    [ADD_TO_CART]: addToCartStrategy,
    [REMOVE_FROM_CART]: removeFromCartStrategy
};

function addToCartStrategy(state, payload) {
    return addToCartReducer(state, payload);
}

function removeFromCartStrategy(state, payload) {
    return removeFromCartRedecer(state, payload);
}

export default reducerFactory(strategies, defaultCartState);
