import React, { memo, useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import SelectInput from '@ui/SelectInput';
import useControlled from '@ui/hooks/useControlled';
import FieldControl from '@ui/FieldControl';
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

const getItemValue = ({ id }) => id;
const getItemText = ({ name }) => name;
const getItemSelected = ({ id }, value) => id === value;

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

    const renderItem = useMemo(() => {
        return (item) => {
            const { id, name } = item;
            const selected = value === id;

            return (
                <ListItem button>
                    <ListItemText flex>{name}</ListItemText>
                    {selected && (
                        <ListItemIcon>
                            <CheckIcon size="medium" />
                        </ListItemIcon>
                    )}
                </ListItem>
            );
        };
    }, [value]);

    return (
        <FieldControl
            component={SelectInput}
            data={list}
            value={value}
            getItemValue={getItemValue}
            getItemText={getItemText}
            getItemSelected={getItemSelected}
            renderItem={renderItem}
            label="Sort by"
            className="u-margin-l-auto"
            fullWidth
            style={{ maxWidth: '34rem' }}
            onChange={handleChange}
        />
    );
};

CatalogSortBySelect.propTypes = {
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func
};

export default memo(CatalogSortBySelect);
