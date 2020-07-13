import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import CategoriesService from '@services/CategoriesService';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export default function useCategoriesActions() {
    const dispatch = useDispatch();

    const onAsyncCategoriesFetch = useCallback(async () => {
        return CategoriesService.fetchAll().then((response) => {
            dispatch({
                type: RECEIVE_CATEGORIES,
                payload: {
                    data: response
                }
            });
        });
    }, [dispatch]);

    return {
        onAsyncCategoriesFetch
    };
}
