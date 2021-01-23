import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { Badge, BadgeProps } from '../components/Badge';
import { HeartIcon } from '../components/svg-icons/feather';
import { IconButton } from '../components/IconButton';

export default {
    component: Badge,
    title: 'PA-UI-KIT/Badge'
} as Meta;

export const Default: Story<BadgeProps> = (args) => {
    return (
        <IconButton>
            <Badge value="8" {...args}>
                <HeartIcon />
            </Badge>
        </IconButton>
    );
};
