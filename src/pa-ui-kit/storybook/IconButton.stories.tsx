import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { IconButton, IconButtonProps } from '../components/IconButton';
import { ShoppingBagIcon } from '../components/svg-icons/feather';
import { FlexRow } from '../components/FlexRow';

export default {
    component: IconButton,
    title: 'PA-UI-KIT/IconButton',
    argTypes: {
        children: {
            control: {
                type: null
            }
        }
    }
} as Meta;

const Template: Story<IconButtonProps> = (args) => <IconButton {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: <ShoppingBagIcon />
} as IconButtonProps;

export const Sizes: Story<IconButtonProps> = (args) => {
    return (
        <FlexRow justify="flex-start" alignItems="center">
            <IconButton {...args} size="large">
                <ShoppingBagIcon />
            </IconButton>
            <IconButton {...args} size="medium">
                <ShoppingBagIcon />
            </IconButton>
            <IconButton {...args} size="small">
                <ShoppingBagIcon />
            </IconButton>
        </FlexRow>
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
