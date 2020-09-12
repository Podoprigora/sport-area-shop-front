import { combineReducers } from 'redux';

import categories from './categories';
import identity from './identity';
import favorites from './favorites';

export default combineReducers({
    categories,
    identity,
    favorites
});
