import React from 'react';

import Button from '../components/Button';

export default {
    component: Button,
    title: 'UI/Button'
};

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: 'Button',
    primary: true,
    centered: true
};
