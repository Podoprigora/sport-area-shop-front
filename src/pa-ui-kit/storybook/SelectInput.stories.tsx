import React, { useMemo } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { SelectInput, SelectInputProps, SelectInputMenuItemProps } from '../components/SelectInput';
import { ListItem, ListItemIcon, ListItemText } from '../components/List';
import { ElementOf } from '../components/utils/types';
import { RadioButtonCheckedIcon, RadioButtonBlankIcon } from '../components/svg-icons/material';

export default {
    title: 'PA-UI-KIT/SelectInput',
    component: SelectInput
} as Meta;

const DefaultListItem = (props: SelectInputMenuItemProps) => {
    const { children, selected, ...other } = props;

    return (
        <ListItem button {...other}>
            <ListItemText>{children}</ListItemText>
            <ListItemIcon>
                {!selected ? (
                    <RadioButtonBlankIcon style={{ opacity: 0 }} />
                ) : (
                    <RadioButtonCheckedIcon primary />
                )}
            </ListItemIcon>
        </ListItem>
    );
};

export const Default: Story<SelectInputProps> = (args) => {
    const data = useMemo(() => {
        return Array.from({ length: 150 }, (_, index) => `Item ${index}`);
    }, []);

    const renderItem = useMemo(() => {
        return (item: ElementOf<typeof data>) => {
            return <DefaultListItem>{item}</DefaultListItem>;
        };
    }, []);

    return (
        <div className="u-padding-6">
            <SelectInput {...args} data={data} renderItem={renderItem} />
        </div>
    );
};
Default.args = {
    defaultValue: '',
    resetButton: true,
    openOnFocus: true,
    placeholder: 'Select item',
    emptyItem: true
} as SelectInputProps;
