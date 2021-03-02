import React from 'react';
import { Assign } from 'utility-types';
import { Story, Meta } from '@storybook/react/types-6-0';

import { FieldControl, FieldControlProps } from '../components/FieldControl';
import { Input, InputProps } from '../components/Input';
import { UserIcon } from '../components/svg-icons/feather';

import './sass/custom-field-control.scss';

export default {
    title: 'PA-UI-KIT/FieldControl',
    component: FieldControl
} as Meta;

type DefaultProps = Assign<InputProps, FieldControlProps>;

export const Default: Story<DefaultProps> = (args) => {
    return <FieldControl {...args} />;
};

Default.args = {
    component: Input,
    label: 'Email',
    labelAlign: 'top',
    labelTextAlign: 'left',
    placeholder: 'Enter your email',
    helperText: 'test@mail.com',
    error: 'Some error',
    touched: false,
    className: 'custom-field-control',
    type: 'email',
    prependAdornment: () => <UserIcon size="medium" />
} as DefaultProps;
