const nestedArrayToPlainArray = (
    array = [],
    parentId = 0,
    { idProp = 'id', childProp = 'items' } = {}
) => {
    return array.reduce((result, item) => {
        const { [childProp]: children, ...itemProp } = item;

        result.push({ ...itemProp, parentId });

        if (children && children.length > 0) {
            return result.concat(nestedArrayToPlainArray(children, itemProp[idProp]));
        }

        return result.slice();
    }, []);
};

const plainArrayToNestedArray = (
    array = [],
    { idProp = 'id', parentIdProp = 'parentId', childProp = 'items', parentIdValue = 0 } = {}
) => {
    const getNestedChildren = (plainArray, parentId) => {
        return array.reduce((result, item) => {
            const { [parentIdProp]: itemParentId, ...itemProp } = item;

            if (itemParentId === parentId) {
                const nestedItemIndex = array.findIndex(
                    (fItem) => fItem[parentIdProp] === itemProp[idProp]
                );

                if (nestedItemIndex !== -1) {
                    itemProp[childProp] = getNestedChildren(plainArray, itemProp[idProp]);
                }

                result.push(itemProp);
            }

            return result.slice();
        }, []);
    };

    return getNestedChildren(array, parentIdValue);
};

const suffleArray = (items) =>
    items
        .map((item) => [Math.random(), item])
        .sort((a, b) => a[0] - b[0])
        .map((sortedItem) => sortedItem[1]);

export { nestedArrayToPlainArray, plainArrayToNestedArray, suffleArray };
