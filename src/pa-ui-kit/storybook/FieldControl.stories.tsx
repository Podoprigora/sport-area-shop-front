import React from 'react';
import { Overwrite } from 'utility-types';
import { Story, Meta } from '@storybook/react/types-6-0';

import { FieldControl, FieldControlProps } from '../components/FieldControl';
import { Input } from '../components/Input';
import { UserIcon } from '../components/svg-icons/feather';

import './sass/custom-field-control.scss';

export default {
    title: 'PA-UI-KIT/FieldControl',
    component: FieldControl
} as Meta;

type DefaultProps = Overwrite<React.ComponentProps<typeof Input>, FieldControlProps>;

export const Default: Story<DefaultProps> = (args) => {
    return <FieldControl {...args} component={Input} />;
};

Default.args = {
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
