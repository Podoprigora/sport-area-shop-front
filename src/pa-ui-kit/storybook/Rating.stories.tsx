import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { Rating, RatingProps } from '../components/Rating';

export default {
    component: Rating,
    title: 'PA-UI-KIT/Rating'
} as Meta;

const Template: Story<RatingProps> = (args) => <Rating {...args} />;

export const Default = Template.bind({});

Default.args = {
    defaultValue: 4,
    max: 5
} as RatingProps;
