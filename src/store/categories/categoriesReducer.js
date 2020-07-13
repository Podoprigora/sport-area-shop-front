import { normalize } from 'normalizr';
import { categoriesSchema } from './categoriesSchemas';
import { RECEIVE_CATEGORIES } from './categoriesActions';

const defaultState = {
    byId: {},
    allIds: []
};

const categories = (state = defaultState, { type, payload }) => {
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
        default:
            return state;
    }
};

export default categories;
