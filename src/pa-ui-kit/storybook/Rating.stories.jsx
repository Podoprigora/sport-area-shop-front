import React from 'react';

import { Rating } from '../components/Rating';

export default {
    component: Rating,
    title: 'PA-UI-KIT/Rating'
};

const Template = (args) => <Rating {...args} />;

export const Default = Template.bind({});
Default.args = {
    defaultValue: 3
};
