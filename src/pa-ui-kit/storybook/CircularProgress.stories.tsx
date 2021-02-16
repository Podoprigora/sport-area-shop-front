import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { CircularProgress, CircularProgressProps } from '../components/CircularProgress';

export default {
    title: 'PA-UI-KIT/CircularProgress',
    component: CircularProgress
} as Meta;

export const Default: Story<CircularProgressProps> = (args) => {
    return <CircularProgress {...args} />;
};
Default.args = {
    primary: true
} as CircularProgressProps;
