import { combineReducers } from 'redux';

import categories from './categories';
import identity from './identity';

export default combineReducers({
    categories,
    identity
});
