import { normalize } from 'normalizr';
import { categoriesSchema } from './categoriesSchemas';
import { RECEIVE_CATEGORIES, SELECT_CATEGORY } from './categoriesActions';

const defaultState = {
    byId: {},
    allIds: [],
    selectedId: null
};

const categories = (state = defaultState, { type, payload = {} }) => {
    switch (type) {
        case RECEIVE_CATEGORIES: {
            const { data = [] } = payload;

            if (data.length > 0) {
                const { result, entities } = normalize(data, categoriesSchema);

                return {
                    allIds: result,
                    byId: entities.categories
                };
            }

            return defaultState;
        }
        case SELECT_CATEGORY: {
            const { id = null } = payload;

            if (id) {
                return { ...state, selectedId: id };
            }
            return state;
        }
        default:
            return state;
    }
};

export default categories;