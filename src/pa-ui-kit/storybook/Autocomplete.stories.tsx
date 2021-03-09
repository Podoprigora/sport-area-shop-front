import React from 'react';
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
    label: string;
    phone: string;
};

export const Default: Story<AutocompleteProps> = () => {
    return (
        <Autocomplete
            data={countries}
            renderInput={() => {
                return (
                    <Input
                        placeholder="Select country"
                        prependAdornment={() => <SearchIcon size="medium" />}
                    />
                );
            }}
            renderItem={(item: CountryItem) => {
                const { code, label } = item;

                return (
                    <ListItem button>
                        <ListItemText>{code}</ListItemText>
                        <ListItemText flex truncate>
                            {label}
                        </ListItemText>
                    </ListItem>
                );
            }}
            getItemText={(item: CountryItem) => {
                return item.label;
            }}
            getValue={(item: CountryItem) => {
                return item.code;
            }}
            getItemSelected={(item: CountryItem, value: CountryItem) => {
                return item.code === value.code;
            }}
            fullWidth
            style={{ width: 300 }}
        />
    );
};
Default.args = {} as AutocompleteProps;
