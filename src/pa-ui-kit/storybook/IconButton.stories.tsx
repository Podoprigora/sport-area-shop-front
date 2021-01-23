import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { IconButton, IconButtonProps } from '../components/IconButton';
import { ShoppingBagIcon } from '../components/svg-icons/feather';

export default {
    component: IconButton,
    title: 'PA-UI-KIT/IconButton'
} as Meta;

const Template: Story<IconButtonProps> = (args) => <IconButton {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: <ShoppingBagIcon />
} as IconButtonProps;

export const Sizes: Story<IconButtonProps> = (args) => {
    return (
        <div>
            <IconButton {...args} size="large">
                <ShoppingBagIcon />
            </IconButton>
            <IconButton {...args} size="medium">
                <ShoppingBagIcon />
            </IconButton>
            <IconButton {...args} size="small">
                <ShoppingBagIcon />
            </IconButton>
        </div>
    );
};
Sizes.args = {};
Sizes.parameters = {
    docs: {
        description: {
            story: 'Available sizes'
        }
    }
};
