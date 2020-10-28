import { useMemo } from 'react';
import { productPageDefaultState, defaultCommentsState } from './productPageReducers';

// Helpers

function getComments(state) {
    return state?.comments ?? defaultCommentsState;
}

function getCommentsAllIds(state) {
    const commentsState = getComments(state);

    return commentsState?.allIds ?? [];
}

function getCommentsItemsById(state) {
    const commentsState = getComments(state);

    return commentsState?.itemsById ?? {};
}

function getComment(state, id) {
    const itemsById = getCommentsItemsById(state, id);

    return itemsById[id];
}

function getErrorByKey(state, key) {
    const error = state?.errorsByKey[key];
    return error;
}

// Selectors

function commentsSelector(state) {
    const allIds = getCommentsAllIds(state);
    const itemsById = getCommentsItemsById(state);

    return allIds.reduce((result, id) => {
        if (itemsById[id]) {
            return [...result, itemsById[id]];
        }
        return result;
    }, []);
}

function commentsFetchPropsSelector(state) {
    const { sortBy, shouldRefetch, itemsPerPage, loading } = getComments(state);

    return { sortBy, shouldRefetch, itemsPerPage, loading };
}

function commentsCountSelector(state) {
    const { total = 0 } = getComments(state);

    return total;
}

function commentsSortSelector(state) {
    const { sortBy } = getComments(state);

    return sortBy;
}

function selectedCommentsPageSelector(state) {
    const { selectedPages = [] } = getComments(state);

    return selectedPages.length > 0 ? selectedPages[selectedPages.length - 1] : 1;
}

function commentsItemsPerPageSelector(state) {
    const { itemsPerPage } = getComments(state);

    return itemsPerPage;
}

function commentsLoadingSelector(state) {
    const { loading } = getComments(state);

    return !!loading;
}

function getCommentRepliesByIdSelector(state, id) {
    if (!id) {
        return null;
    }

    const item = getComment(state, id);

    return (item && item?.replies) || [];
}

function getCommentByIdSelector(state, id) {
    return getComment(state, id);
}

function getErrorByKeySelector(state, key) {
    return getErrorByKey(state, key);
}

function ratingSelector(state) {
    const { totalRating = 0 } = getComments(state);

    return totalRating;
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
            getErrorByKey: (key) => getErrorByKeySelector(state, key),
            rating: ratingSelector(state)
        };
    }, [state]);
};
