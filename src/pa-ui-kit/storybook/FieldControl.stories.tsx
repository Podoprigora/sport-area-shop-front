import React from 'react';
import { Assign } from 'utility-types';
import { Story, Meta } from '@storybook/react/types-6-0';

import { FieldControl, FieldControlProps } from '../components/FieldControl';
import { FlexCol } from '../components/FlexCol';
import { FlexRow } from '../components/FlexRow';
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
        <div className="u-padding-6">
            <div className="u-padding-b-6">
                <FieldControl {...args} fullWidth />
            </div>
            <FlexRow alignItems="flex-start" className="u-padding-b-6">
                <FlexCol md className="u-padding-r-md-6 u-padding-b-down-md-6">
                    <FieldControl {...args} fullWidth />
                </FlexCol>
                <FlexCol md>
                    <FieldControl {...args} fullWidth helperText="" />
                </FlexCol>
            </FlexRow>
        </div>
    );
};

Default.args = {
    component: Input,
    variant: 'outlined',
    label: 'Test Label',
    labelAlign: 'top',
    placeholder: 'Enter some text',
    helperText: 'Helper text',
    error: 'Some error',
    filled: true,
    touched: false,
    required: true,
    prependAdornment: () => <UserIcon size="medium" />
} as DefaultProps;
Default.parameters = {
    docs: {
        source: {
            code: `
export const Default: Story<DefaultProps> = (args) => {
    return (
        <div className="u-padding-6">
            <div className="u-padding-b-6">
                <FieldControl {...args} fullWidth />
            </div>
            <FlexRow alignItems="flex-start" className="u-padding-b-6">
                <FlexCol md className="u-padding-r-md-6 u-padding-b-down-md-6">
                    <FieldControl {...args} fullWidth />
                </FlexCol>
                <FlexCol md>
                    <FieldControl {...args} fullWidth helperText="" />
                </FlexCol>
            </FlexRow>
        </div>
    );
};

Default.args = {
    component: Input,
    variant: 'outlined',
    label: 'Test Label',
    labelAlign: 'top',
    placeholder: 'Enter some text',
    helperText: 'Helper text',
    error: 'Some error',
    filled: true,
    touched: false,
    required: true,
    prependAdornment: () => <UserIcon size="medium" />
} as DefaultProps;
            `
        }
    }
};
