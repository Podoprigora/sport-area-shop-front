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
    qty: 1,
    amount: 0,
    vat: null
};

export const defaultCartState = {
    allIds: [],
    itemsById: {}
};

const addToCartReducer = produce((draft, payload) => {
    const { id } = payload;
    const item = { ...defaultCartProductState, ...payload };

    if (draft.allIds.indexOf(id) === -1) {
        draft.allIds.push(id);
    }

    if (!draft.itemsById[id]) {
        draft.itemsById[id] = item;
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

const changeCartItemReducer = produce((draft, payload) => {
    const { id } = payload;

    const cartItem = draft.itemsById[id];

    if (cartItem) {
        Object.assign(cartItem, payload);
    }
});

// Strategies

export const ADD_TO_CART = 'cart/ADD_TO_CART';
export const REMOVE_FROM_CART = 'cart/REMOVE_FROM_CART';
export const CHANGE_CART_ITEM = 'cart/CHANGE_CART_ITEM';

const strategies = {
    [ADD_TO_CART]: addToCartStrategy,
    [REMOVE_FROM_CART]: removeFromCartStrategy,
    [CHANGE_CART_ITEM]: changeCartItemStrategy
};

function addToCartStrategy(state, payload) {
    return addToCartReducer(state, payload);
}

function removeFromCartStrategy(state, payload) {
    return removeFromCartRedecer(state, payload);
}

function changeCartItemStrategy(state, payload) {
    return changeCartItemReducer(state, payload);
}

export default reducerFactory(strategies, defaultCartState);
