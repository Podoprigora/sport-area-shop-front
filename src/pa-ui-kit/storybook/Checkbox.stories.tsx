import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Checkbox, CheckboxProps } from '../components/Checkbox';

export default {
    component: Checkbox,
    title: 'PA-UI-KIT/Checkbox'
} as Meta;

export const Default: Story<CheckboxProps> = () => {
    return <Checkbox />;
};
