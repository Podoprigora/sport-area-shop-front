import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

import Autocomplete from '@ui/Autocomplete';
import Input from '@ui/Input';
import SearchIcon from '@svg-icons/feather/SearchIcon';
import { ListItem, ListItemText, ListItemIcon, ListItemAction } from '@ui/List';
import HistoryRestoreIcon from '@svg-icons/material/HistoryRestoreIcon';

import IconButton from '@ui/IconButton';
import ClearCloseIcon from '@svg-icons/material/ClearCloseIcon';

const getItemText = ({ title }) => title;

const filterItems = (items, value) => {
    const query = value.trim().toLowerCase();

    return items.filter((item) => {
        let itemText = getItemText(item);
        itemText = itemText.toLowerCase();

        return itemText.indexOf(query) !== -1;
    });
};

const HeaderSearchInput = React.forwardRef(function HeaderSearchInput(props, ref) {
    const {
        query,
        queryMinLength,
        open,
        loading,
        data,
        onOpen,
        onClose,
        onChange,
        onInputChange,
        onInputKeyDown,
        onDeleteHistoryItem,
        onItemClick
    } = props;

    const handleFilterItems = useCallback(
        (items) => {
            if (query.length >= queryMinLength) {
                return filterItems(items, query);
            }
            return items;
        },
        [query, queryMinLength]
    );

    const renderInput = () => {
        return (
            <Input
                placeholder="What are you looking for?"
                prependAdornment={() => <SearchIcon size="medium" />}
            />
        );
    };

    const renderItem = (item, { index }) => {
        const { title, history = false, cleanable = false } = item;

        const matches = match(title, query);
        const parts = parse(title, matches);

        let highlightedText = title;

        if (!history && parts && parts.length > 0) {
            highlightedText = parts.map((part, partIndex) => {
                return (
                    <span key={partIndex} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                        {part.text}
                    </span>
                );
            });
        }

        return (
            <ListItem>
                <ListItemIcon>
                    {history ? <HistoryRestoreIcon size="medium" /> : <SearchIcon size="medium" />}
                </ListItemIcon>
                <ListItemText flex>{highlightedText}</ListItemText>
                {history && cleanable && (
                    <ListItemAction tabIndex="-1">
                        <IconButton size="small" onClick={onDeleteHistoryItem(index)}>
                            <ClearCloseIcon />
                        </IconButton>
                    </ListItemAction>
                )}
            </ListItem>
        );
    };

    return (
        <Autocomplete
            open={open}
            loading={loading}
            data={data}
            inputValue={query}
            filterItems={handleFilterItems}
            className="header__search-input"
            fullWidth
            openButton={false}
            loadingText={null}
            emptyText={null}
            getItemSelected={() => false}
            getItemText={getItemText}
            renderInput={renderInput}
            renderItem={renderItem}
            ref={ref}
            onOpen={onOpen}
            onClose={onClose}
            onChange={onChange}
            onInputKeyDown={onInputKeyDown}
            onInputChange={onInputChange}
            onItemClick={onItemClick}
        />
    );
});

HeaderSearchInput.propTypes = {
    query: PropTypes.string,
    queryMinLength: PropTypes.number,
    open: PropTypes.bool,
    loading: PropTypes.bool,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            history: PropTypes.bool,
            cleanable: PropTypes.bool
        })
    ),
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onChange: PropTypes.func,
    onInputChange: PropTypes.func,
    onInputKeyDown: PropTypes.func,
    onDeleteHistoryItem: PropTypes.func,
    onItemClick: PropTypes.func
};

export default HeaderSearchInput;
