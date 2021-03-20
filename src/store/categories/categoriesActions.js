import { useCallback, useMemo } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useEventCallback } from '@ui/utils';
import CategoriesService from '@services/CategoriesService';
import {
    categoriesStateSelector,
    getCategoryPathById,
    getCategoryIdByPath
} from './categoriesSelectors';

export const RECEIVE_CATEGORIES = 'categories/RECEIVE_CATEGORIES';
export const SELECT_CATEGORY = 'categories/SELECT_CATEGORY';
export const RESET_SELECTED_CATEGORY = 'categories/RESET_SELECTED_CATEGORY';

export default function useCategoriesActions() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { path: basePath } = useRouteMatch();

    const categoriesState = useSelector(categoriesStateSelector);

    const asyncFetchCategories = useCallback(
        async (success) => {
            return CategoriesService.fetchAll(success).then((response) => {
                dispatch({
                    type: RECEIVE_CATEGORIES,
                    payload: {
                        data: response
                    }
                });
            });
        },
        [dispatch]
    );

    const selectCategory = useEventCallback((id = null, path = []) => {
        if (!id && path.length === 0) {
            return;
        }

        let selectedId = id;

        if (path.length > 0) {
            selectedId = getCategoryIdByPath(categoriesState, path);
        } else {
            const pathArray = getCategoryPathById(categoriesState, id);
            const historyPath = `${basePath}${pathArray.join('/')}`;

            history.push(historyPath);
        }

        dispatch({
            type: SELECT_CATEGORY,
            payload: { id: selectedId }
        });
    });

    const resetSelectedCatagory = useEventCallback(() => {
        dispatch({
            type: RESET_SELECTED_CATEGORY
        });
    });

    return useMemo(
        () => ({
            asyncFetchCategories,
            selectCategory,
            resetSelectedCatagory
        }),
        [asyncFetchCategories, selectCategory, resetSelectedCatagory]
    );
}
