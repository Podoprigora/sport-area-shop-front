import React, { useMemo } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Assign } from 'utility-types';

import { SelectInput, SelectInputProps, SelectInputMenuItemProps } from '../components/SelectInput';
import { ListItem, ListItemIcon, ListItemText } from '../components/List';
import { ElementOf } from '../components/utils/types';
import { RadioButtonCheckedIcon, RadioButtonBlankIcon } from '../components/svg-icons/material';
import { FieldControl, FieldControlProps } from '../components/FieldControl';

export default {
    title: 'PA-UI-KIT/SelectInput',
    component: SelectInput
} as Meta;

const DefaultListItem = (props: SelectInputMenuItemProps) => {
    const { children, selected, ...other } = props;

    return (
        <ListItem button {...other}>
            <ListItemText flex>{children}</ListItemText>
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
        return Array.from({ length: 25 }, (_, index) => `Item  ${index}`);
    }, []);

    const renderItem = useMemo(() => {
        return (item: ElementOf<typeof data>) => {
            return <DefaultListItem>{item}</DefaultListItem>;
        };
    }, []);

    return <SelectInput {...args} data={data} renderItem={renderItem} />;
};
Default.args = {
    defaultValue: '',
    resetButton: true,
    openOnFocus: true,
    placeholder: 'Select item',
    emptyItem: true
} as SelectInputProps;

// FieldControl story

type FieldControlStoryProps = Assign<SelectInputProps, FieldControlProps>;

export const FieldControlStory: Story<FieldControlStoryProps> = (args) => {
    const menuOffset = args.variant === 'outlined' ? [0, 4] : undefined;
    const props = {
        ...args,
        menuOffset
    } as FieldControlStoryProps;

    return (
        <div className="u-padding-6">
            <FieldControl {...props} component={Default} />
        </div>
    );
};
FieldControlStory.storyName = 'Filed Control';
FieldControlStory.args = {
    defaultValue: '',
    variant: 'standard',
    label: 'Test Label',
    labelAlign: 'left',
    placeholder: 'Enter some text',
    helperText: 'Helper text',
    error: 'Some error',
    filled: false,
    touched: false,
    required: true,
    resetButton: true
} as FieldControlStoryProps;
