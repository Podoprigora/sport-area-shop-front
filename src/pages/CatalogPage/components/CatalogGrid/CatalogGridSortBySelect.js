import React, { memo, useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import SelectInput from '@ui/SelectInput';
import { ListItem, ListItemText, ListItemIcon } from '@ui/List';
import CheckIcon from '@svg-icons/feather/CheckIcon';

const list = [
    { id: 'relevance', name: 'Relevance' },
    { id: 'price-up', name: 'Price up' },
    { id: 'price-down', name: 'Price down' },
    { id: 'brand-new', name: 'Brand new' },
    { id: 'top-seller', name: 'Top seller' },
    { id: 'name', name: 'Name' }
];

const CatalogGridSortBySelect = (props) => {
    const [selectedId, setSelectedId] = useState(null);

    const handleChange = useCallback((ev) => {
        setSelectedId(ev.target.value);
    }, []);

    const items = useMemo(() => {
        return list.map(({ id, name }) => {
            const selected = selectedId === id;

            return (
                <ListItem key={id} button value={id}>
                    <ListItemText flex>{name}</ListItemText>
                    {selected && (
                        <ListItemIcon>
                            <CheckIcon size="medium" />
                        </ListItemIcon>
                    )}
                </ListItem>
            );
        });
    }, [selectedId]);

    return (
        <SelectInput
            placeholder="Sort by"
            className="u-margin-l-auto"
            style={{ maxWidth: '22rem' }}
            onChange={handleChange}
        >
            {items}
        </SelectInput>
    );
};

CatalogGridSortBySelect.propTypes = {};

export default memo(CatalogGridSortBySelect);
