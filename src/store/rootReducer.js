import { combineReducers } from 'redux';

import categories from './categories';
import identity from './identity';
import wishlist from './wishlist';
import cart from './cart';

export default combineReducers({
    categories,
    identity,
    wishlist,
    cart
});
