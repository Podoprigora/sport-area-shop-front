import React, { useMemo } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { SelectInput, SelectInputProps } from '../components/SelectInput';
import { ListItem, ListItemIcon, ListItemText } from '../components/List';
import { ElementOf } from '../components/utils/types';
import { TagIcon } from '../components/svg-icons/feather';

export default {
    title: 'PA-UI-KIT/SelectInput',
    component: SelectInput
} as Meta;

export const Default: Story<SelectInputProps> = (args) => {
    const data = useMemo(() => {
        return Array.from({ length: 30 }, (_, index) => `Item long long long content ${index}`);
    }, []);

    const renderItem = useMemo(() => {
        return (item: ElementOf<typeof data>) => {
            return (
                <ListItem button>
                    <ListItemIcon>
                        <TagIcon size="medium" />
                    </ListItemIcon>
                    <ListItemText>{item}</ListItemText>
                </ListItem>
            );
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
