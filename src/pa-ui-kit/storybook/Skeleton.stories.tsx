import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Skeleton, SkeletonProps } from '../components/Skeleton';

export default {
    title: 'PA-UI-KIT/Skeleton',
    component: Skeleton
} as Meta;

export const Default: Story<SkeletonProps> = (args) => {
    return <Skeleton {...args} />;
};
Default.args = {} as SkeletonProps;
