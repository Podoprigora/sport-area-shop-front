import { useCallback } from 'react';
import { useLocation, useHistory, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import useEventCallback from '@ui/hooks/useEventCallback';
import CategoriesService from '@services/CategoriesService';
import {
    categoriesStateSelector,
    getCategoryPathById,
    getCategoryIdByPath
} from './categoriesSelectors';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const SELECT_CATEGORY = 'SELECT_CATEGORY';

export default function useCategoriesActions() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { path: basePath } = useRouteMatch();

    const categoriesState = useSelector(categoriesStateSelector);

    const onAsyncCategoriesFetch = useCallback(
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

    const onCategorySelect = useEventCallback((id, path = []) => {
        if (!id && !path.length === 0) {
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

    return {
        onAsyncCategoriesFetch,
        onCategorySelect
    };
}
