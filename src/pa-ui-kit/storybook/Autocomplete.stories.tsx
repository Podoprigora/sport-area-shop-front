import React, { useCallback, useMemo, useRef } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Assign } from 'utility-types';

import { Autocomplete, AutocompleteProps } from '../components/Autocomplete';
import { Input } from '../components/Input';
import { ListItem, ListItemText } from '../components/List';
import { FieldControl, FieldControlProps } from '../components/FieldControl';
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

export const Default: Story<AutocompleteProps<CountryItem>> = (args) => {
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
            {...args}
            data={data}
            emptyText=""
            renderInput={renderInput}
            renderItem={renderItem}
            getItemText={getItemText}
            getValue={getValue}
            getItemSelected={getItemSelected}
            onChange={handleChange}
            onInputChange={handleInputChange}
            onInputKeyDown={() => {}}
            // style={{ width: 300, maxWidth: 'none' }}
            ref={nodeRef}
        />
    );
};
Default.args = {} as AutocompleteProps<CountryItem>;

// FieldControl story

type FieldControlStoryProps = Assign<AutocompleteProps<CountryItem>, FieldControlProps>;

export const FieldControlStory: Story<FieldControlStoryProps> = (args) => {
    const { onBlur, onFocus, ...other } = args;
    const offset = args.variant === 'outlined' ? [0, 4] : undefined;
    const props = {
        ...other,
        listProps: {
            offset
        }
    } as FieldControlStoryProps;

    return (
        <div className="u-padding-6">
            <FieldControl {...props} component={Default} />
        </div>
    );
};
FieldControlStory.storyName = 'Filed Control';
FieldControlStory.args = {
    variant: 'standard',
    label: 'Country',
    labelAlign: 'left',
    placeholder: 'Select country',
    helperText: 'Helper text',
    error: 'Some error',
    filled: false,
    touched: false,
    required: true,
    resetButton: true,
    fullWidth: false
} as FieldControlStoryProps;
