import React from 'react';
import { Assign } from 'utility-types';
import { Story, Meta } from '@storybook/react/types-6-0';

import { FieldControl, FieldControlProps } from '../components/FieldControl';
import { Input, InputProps } from '../components/Input';
import { UserIcon } from '../components/svg-icons/feather';

import './sass/custom-field-control.scss';

export default {
    title: 'PA-UI-KIT/FieldControl',
    component: FieldControl,
    argTypes: {
        component: {
            control: {
                type: null
            }
        }
    }
} as Meta;

type DefaultProps = Assign<InputProps, FieldControlProps>;

export const Default: Story<DefaultProps> = (args) => {
    return (
        <div style={{ padding: 20 }}>
            <div style={{ paddingBottom: 12 }}>
                <FieldControl {...args} />
            </div>
            <div style={{ paddingBottom: 12 }}>
                <FieldControl {...args} />
            </div>
            <div style={{ paddingBottom: 12 }}>
                <FieldControl {...args} />
            </div>
            <div style={{ paddingBottom: 12 }}>
                <FieldControl {...args} />
            </div>
        </div>
    );
};

Default.args = {
    component: Input,
    variant: 'outlined',
    label: 'Login',
    // label: 'Long long long text label Long long long text label Long long long text label',
    labelAlign: 'top',
    placeholder: 'Enter your login',
    helperText: 'test@mail.com',
    error: 'Some error',
    touched: false,
    required: true,
    prependAdornment: () => <UserIcon size="medium" />
} as DefaultProps;
