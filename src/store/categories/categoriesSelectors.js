const { createSelector } = require('reselect');

const getCategories = (state) => {
    return state.categories;
};

const getCategory = (categoryState, id) => {
    return categoryState.byId[id] || {};
};

const buildCategoriesTree = (categoriesState, ids = [], parentId = 0) => {
    return ids.reduce((result, id) => {
        const category = { ...getCategory(categoriesState, id) };

        if (category.parentId === parentId) {
            if (category.items && category.items.length > 0) {
                category.items = [
                    ...buildCategoriesTree(categoriesState, category.items, category.id)
                ];
            }

            result.push(category);
        }

        return result.slice();
    }, []);
};

export const categoriesTreeSelector = createSelector(getCategories, (categoriesState = {}) => {
    return buildCategoriesTree(categoriesState, categoriesState.allIds, 0);
});

export const categoriesSelector = createSelector(getCategories, (categoriesState = {}) => {
    return categoriesState.allIds.map((id) => {
        const category = getCategory(categoriesState, id);

        return { ...category, hasItems: category.items && category.items.length > 0 };
    });
});
