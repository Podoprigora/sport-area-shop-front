import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { LinearProgress, LinearProgressProps } from '../components/LinearProgress';

export default {
    title: 'PA-UI-KIT/LinearProgress',
    component: LinearProgress
} as Meta;

export const Default: Story<LinearProgressProps> = (args) => {
    return <LinearProgress {...args} />;
};
Default.args = {
    primary: true
} as LinearProgressProps;
