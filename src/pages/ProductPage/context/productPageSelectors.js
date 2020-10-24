import { productPageDefaultState } from './productPageReducers';

function commentsSelector(state) {
    const { allIds = [], itemsById = {} } = state?.comments || {};

    return allIds.reduce((result, id) => {
        if (itemsById[id]) {
            return [...result, itemsById[id]];
        }
        return result;
    }, []);
}

function commentsCountSelector(state) {
    const total = state?.comments?.total;

    return total || 0;
}

function ratingSelector(state) {
    const totalRating = state?.comments?.totalRating;

    return totalRating || 0;
}

export const useProductPageSelectors = (state = productPageDefaultState) => {
    return {
        comments: commentsSelector(state),
        commentsCount: commentsCountSelector(state),
        rating: ratingSelector(state)
    };
};
