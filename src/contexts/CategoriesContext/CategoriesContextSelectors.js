import { createSelector } from 'reselect';

import { plainArrayToNestedArray } from '@ui/utils/convertingData';

export const categoriesTreeSelector = createSelector(
    (state) => state,
    (value) => plainArrayToNestedArray(value)
);
