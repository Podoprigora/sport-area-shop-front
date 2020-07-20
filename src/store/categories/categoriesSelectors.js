const { createSelector } = require('reselect');

export const getCategories = (state) => {
    return state.categories;
};

export const getCategory = (categoryState, id) => {
    return categoryState.byId[id] || {};
};

export const getCategoryPathById = (categoryState, id) => {
    const path = [];
    let item = getCategory(categoryState, id);

    while (item.title) {
        const formatedTitle = String(item.title)
            .toLowerCase()
            .replace(/\s+/g, '_');

        path.unshift(formatedTitle);

        item = getCategory(categoryState, item.parentId);
    }

    return path;
};

export const getCategoryIdByPath = (categoryState, path = []) => {
    if (path.length === 0) {
        return null;
    }

    const lastPathItem = path.pop();
    const formatedTitle = String(lastPathItem).replace(/_/g, ' ');
    const categoryId = categoryState.allIds.find((id) => {
        const { title } = getCategory(categoryState, id);

        return title && String(title).toLowerCase() === formatedTitle;
    });

    if (!categoryId) {
        return null;
    }

    return categoryId;
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

export const categoriesStateSelector = createSelector(getCategories, (state) => state);

export const categoriesTreeSelector = createSelector(getCategories, (categoriesState = {}) => {
    return buildCategoriesTree(categoriesState, categoriesState.allIds, 0);
});

export const categoriesSelector = createSelector(getCategories, (categoriesState = {}) => {
    return categoriesState.allIds.map((id) => {
        const category = getCategory(categoriesState, id);

        return { ...category, hasItems: category.items && category.items.length > 0 };
    });
});

export const selectedCategoryIdSelector = createSelector(getCategories, (categoriesState = {}) => {
    return categoriesState.selectedId;
});
