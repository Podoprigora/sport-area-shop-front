import React, { useCallback, useMemo, useRef } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Autocomplete, AutocompleteProps } from '../components/Autocomplete';
import { Input } from '../components/Input';
import { ListItem, ListItemText } from '../components/List';
import { SearchIcon } from '../components/svg-icons/feather';

import countries from './data/countries.json';

export default {
    title: 'PA-UI-KIT/Autocomplete',
    component: Autocomplete
} as Meta;

type CountryItem = {
    code: string;
    label?: string;
    phone: string;
};

const data: CountryItem[] = countries.slice(0, 150);

function getItemText(item: CountryItem) {
    return item?.label ? item.label : '';
}

function getValue(item: CountryItem) {
    return item.code;
}

function getItemSelected(item: CountryItem, value: CountryItem) {
    return item.code === value.code;
}

export const Default: Story<AutocompleteProps<CountryItem>> = () => {
    const nodeRef = useRef<HTMLDivElement | null>(null);

    // Handlers

    const handleChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        console.log('Change: ', ev.target.value);
    }, []);

    const handleInputChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        console.log('Input Change: ', ev.target.value);
    }, []);

    // Render

    const renderItem = useMemo(() => {
        return (item: CountryItem) => {
            const { code, label } = item;

            return (
                <ListItem button>
                    <ListItemText>{code}</ListItemText>
                    <ListItemText flex truncate>
                        {label}
                    </ListItemText>
                </ListItem>
            );
        };
    }, []);

    const renderInput = useMemo(() => {
        return () => {
            return (
                <Input
                    placeholder="Select country"
                    prependAdornment={() => <SearchIcon size="medium" />}
                />
            );
        };
    }, []);

    return (
        <Autocomplete
            data={data}
            emptyText=""
            renderInput={renderInput}
            renderItem={renderItem}
            getItemText={getItemText}
            getValue={getValue}
            getItemSelected={getItemSelected}
            onChange={handleChange}
            onInputChange={handleInputChange}
            style={{ width: 300, maxWidth: 'none' }}
            ref={nodeRef}
        />
    );
};
Default.args = {} as AutocompleteProps<CountryItem>;
