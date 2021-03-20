import React, { useCallback, useState, useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import debounce from 'lodash/debounce';

import { List } from '@ui/List';
import { useControlled } from '@ui/utils';

import FiltersListItemToggle from './FiltersListItemToggle';
import FiltersListSearch from './FiltersListSearch';
import FiltersListItem from './FiltersListItem';

const getDefaultItemTitle = (item) => item;

const FiltersList = (props) => {
    const {
        component: Component = List,
        selected: selectedProp,
        defaultSelected = [],
        items: itemsProp = [],
        quickSearch = true,
        itemsLength,
        className,
        getItemTitle = getDefaultItemTitle,
        renderItem,
        onChange,
        ...other
    } = props;

    const [selectedState, setSelectedState] = useControlled(selectedProp, defaultSelected);
    const [searchValue, setSearchValue] = useState('');

    const handleItemClick = useCallback(
        (ev, id) => {
            let newSelected = [...selectedState];
            const idStr = String(id);

            if (newSelected.indexOf(idStr) !== -1) {
                newSelected = selectedState.filter((item) => String(item) !== idStr);
            } else {
                newSelected.push(idStr);
            }

            setSelectedState(newSelected);

            if (onChange) {
                onChange(ev, newSelected);
            }
        },
        [selectedState, setSelectedState, onChange]
    );

    const handleSearchChange = useCallback(
        debounce((value = '') => {
            setSearchValue(String(value).toLowerCase());
        }, 600),
        []
    );

    const filteredItems = useMemo(() => {
        return itemsProp.filter((item) => {
            const title = getItemTitle(item);

            return searchValue ? title.toLowerCase().indexOf(searchValue) !== -1 : true;
        });
    }, [searchValue, itemsProp, getItemTitle]);

    const items = filteredItems.map((item) => {
        const { id } = item || {};
        const idStr = String(id);
        const title = getItemTitle(item);
        const selected = selectedState.indexOf(idStr) !== -1;

        if (renderItem) {
            return React.cloneElement(renderItem(item), {
                key: idStr,
                title,
                selected,
                onClick: handleItemClick
            });
        }

        return (
            <FiltersListItem
                key={idStr}
                {...item}
                title={title}
                selected={selected}
                onClick={handleItemClick}
            />
        );
    });

    return (
        <div className={classNames('filters-list', className)}>
            {quickSearch && <FiltersListSearch onChange={handleSearchChange} />}

            <Component
                {...(itemsLength && {
                    itemsLength,
                    renderItemToggle: (renderProps) => {
                        return <FiltersListItemToggle {...renderProps} />;
                    }
                })}
                {...other}
            >
                {items}
            </Component>
        </div>
    );
};

FiltersList.propTypes = {
    component: PropTypes.elementType,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
        })
    ),
    selected: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    defaultSelected: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    itemsLength: PropTypes.number,
    quickSearch: PropTypes.bool,
    className: PropTypes.string,
    getItemTitle: PropTypes.func,
    renderItem: PropTypes.func,
    onChange: PropTypes.func
};

export default memo(FiltersList);
