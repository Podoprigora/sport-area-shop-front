import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { Badge, BadgeProps } from '../components/Badge';
import { HeartIcon as HeartIconInner } from '../components/svg-icons/feather';
import { IconButton } from '../components/IconButton';
import { Button } from '../components/Button';
import { FlexRow } from '../components/FlexRow';
import { FlexCol } from '../components/FlexCol';

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
        <FlexRow justify="flex-start" alignItems="center">
            <FlexCol md="auto" className="u-margin-r-md-8 u-margin-b-down-md-8">
                <IconButton>
                    <Badge value="8" {...args} inline={false}>
                        <HeartIcon />
                    </Badge>
                </IconButton>
            </FlexCol>
            <FlexCol md="auto">
                <Badge value="20" {...args}>
                    <Button centered>Action</Button>
                </Badge>
            </FlexCol>
        </FlexRow>
    );
};
Default.args = {
    placement: 'bottom-right',
    offset: [0, 0]
};
