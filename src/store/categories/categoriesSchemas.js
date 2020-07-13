import { schema } from 'normalizr';

const categorySchema = new schema.Entity(
    'categories',
    {},
    {
        processStrategy: (entry, parent, key) => {
            const { id, ...restEntry } = entry;

            const items = parent
                .filter((item = {}) => item.parentId === id)
                .map((item = {}) => item.id);

            return { id, ...restEntry, items };
        }
    }
);

export const categoriesSchema = new schema.Array(categorySchema);
