import { useMemo } from 'react';
import { productPageDefaultState, defaultCommentsState } from './productPageReducers';

function commentsSelector(state) {
    const { allIds = [], itemsById = {} } = state?.comments || {};

    return allIds.reduce((result, id) => {
        if (itemsById[id]) {
            return [...result, itemsById[id]];
        }
        return result;
    }, []);
}

function commentsFetchPropsSelector(state) {
    const { sortBy, shouldRefetch, itemsPerPage, loading } =
        state?.comments || defaultCommentsState;

    return { sortBy, shouldRefetch, itemsPerPage, loading };
}

function commentsCountSelector(state) {
    const total = state?.comments?.total;

    return total || 0;
}

function commentsSortSelector(state) {
    return state?.comments?.sortBy;
}

function selectedCommentsPageSelector(state) {
    const selectedPages = [...state?.comments?.selectedPages];

    return selectedPages.length > 0 ? selectedPages[selectedPages.length - 1] : 1;
}

function commentsItemsPerPageSelector(state) {
    const itemsPerPage = state?.comments?.itemsPerPage;

    return itemsPerPage || 1;
}

function commentsLoadingSelector(state) {
    const loading = state?.comments?.loading;

    return !!loading;
}

function getCommentRepliesByIdSelector(state, id) {
    if (!id) {
        return null;
    }

    const item = state?.comments?.itemsById[id];

    return (item && item?.replies) || [];
}

function getCommentByIdSelector(state, id) {
    if (!id) {
        return null;
    }

    const comment = state?.comments?.itemsById[id];
    return comment || null;
}

function ratingSelector(state) {
    const totalRating = state?.comments?.totalRating;

    return totalRating || 0;
}

export const useProductPageSelectors = (state = productPageDefaultState) => {
    return useMemo(() => {
        return {
            comments: commentsSelector(state),
            commentsCount: commentsCountSelector(state),
            commentsSort: commentsSortSelector(state),
            commentsFetchProps: commentsFetchPropsSelector(state),
            selectedCommentsPage: selectedCommentsPageSelector(state),
            commentsItemsPerPage: commentsItemsPerPageSelector(state),
            commentsLoading: commentsLoadingSelector(state),
            getCommentById: (id) => getCommentByIdSelector(state, id),
            getCommentRepliesById: (id) => getCommentRepliesByIdSelector(state, id),
            rating: ratingSelector(state)
        };
    }, [state]);
};
