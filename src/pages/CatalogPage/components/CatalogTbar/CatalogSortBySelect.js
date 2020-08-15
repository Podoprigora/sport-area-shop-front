import React, { memo, useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import SelectInput from '@ui/SelectInput';
import { ListItem, ListItemText, ListItemIcon } from '@ui/List';
import CheckIcon from '@svg-icons/feather/CheckIcon';
import useControlled from '@ui/hooks/useControlled';

const list = [
    { id: 'relevance', name: 'Relevance' },
    { id: 'price-up', name: 'Price up' },
    { id: 'price-down', name: 'Price down' },
    { id: 'brand-new', name: 'Brand new' },
    { id: 'top-seller', name: 'Top seller' },
    { id: 'name', name: 'Name' }
];

const CatalogSortBySelect = (props) => {
    const { value: valueProp, defaultValue, onChange } = props;

    const [value, setValue] = useControlled(valueProp, defaultValue);

    const handleChange = useCallback(
        (ev) => {
            setValue(ev.target.value);

            if (onChange) {
                onChange(ev);
            }
        },
        [setValue, onChange]
    );

    const items = useMemo(() => {
        return list.map(({ id, name }) => {
            const selected = value === id;

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
    }, [value]);

    return (
        <SelectInput
            placeholder="Sort by"
            className="u-margin-l-auto"
            style={{ maxWidth: '22rem' }}
            value={value}
            onChange={handleChange}
        >
            {items}
        </SelectInput>
    );
};

CatalogSortBySelect.propTypes = {
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func
};

export default memo(CatalogSortBySelect);
