import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { Badge, BadgeProps } from '../components/Badge';
import { HeartIcon as HeartIconInner } from '../components/svg-icons/feather';
import { IconButton } from '../components/IconButton';
import { Button } from '../components/Button';

export default {
    component: Badge,
    title: 'PA-UI-KIT/Badge'
} as Meta;

// Wrapper to fix incorrect component props output: [object Object]
const HeartIcon = () => {
    return <HeartIconInner />;
};

export const Default: Story<BadgeProps> = (args) => {
    return (
        <div className="u-flex u-flex-justify-flex-start u-flex-align-items-center">
            <IconButton className="u-margin-r-12">
                <Badge value="8" {...args} inline={false}>
                    <HeartIcon />
                </Badge>
            </IconButton>

            <Badge value="20" {...args}>
                <Button centered>Action</Button>
            </Badge>
        </div>
    );
};
Default.args = {
    placement: 'bottom-right',
    offset: [0, 0]
};
