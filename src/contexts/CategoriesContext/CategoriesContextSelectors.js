import { createSelector } from 'reselect';

import { plainArrayToNestedArray } from '@ui/utils/convertingData';

export const categoriesTreeSelector = createSelector(
    (state) => state,
    (value) => plainArrayToNestedArray(value)
);

export const categoriesWithHasItemsSelector = createSelector(
    (state) => state,
    (value = []) => {
        return value.reduce((result, item) => {
            const newItem = { ...item };
            newItem.hasItems = value.findIndex(({ parentId }) => parentId === newItem.id) !== -1;

            result.push(newItem);

            return result.slice();
        }, []);
    }
);
