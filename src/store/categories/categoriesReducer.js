import { normalize } from 'normalizr';

import reducerFactory from '@ui/utils/reducerFactory';
import { categoriesSchema } from './categoriesSchemas';
import { RECEIVE_CATEGORIES, SELECT_CATEGORY, RESET_SELECTED_CATEGORY } from './categoriesActions';

const defaultState = {
    byId: {},
    allIds: [],
    selectedId: null
};

const strategies = {
    [RECEIVE_CATEGORIES]: receiveCategoriesStrategy,
    [SELECT_CATEGORY]: selectCategoryStrategy,
    [RESET_SELECTED_CATEGORY]: resetSelectedCategoryStrategy
};

function receiveCategoriesStrategy(state, { payload }) {
    const { data = [] } = payload;

    if (data.length > 0) {
        const { result, entities } = normalize(data, categoriesSchema);

        return {
            ...state,
            allIds: result,
            byId: entities.categories
        };
    }

    return state;
}

function selectCategoryStrategy(state, { payload }) {
    const { id = null } = payload;

    if (id) {
        return { ...state, selectedId: id };
    }

    return state;
}

function resetSelectedCategoryStrategy(state) {
    return { ...state, selectedId: null };
}

export default reducerFactory(strategies, defaultState);
