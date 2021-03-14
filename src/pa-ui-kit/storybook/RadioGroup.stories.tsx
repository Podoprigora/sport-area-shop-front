import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Assign } from 'utility-types';

import { RadioGroup, RadioGroupProps } from '../components/RadioGroup';
import { Radio } from '../components/Radio';
import { BoxLabel } from '../components/BoxLabel';
import { FieldControl, FieldControlProps } from '../components/FieldControl';

export default {
    title: 'PA-UI-KIT/RadioGroup',
    component: RadioGroup,
    subcomponents: { Radio, BoxLabel }
} as Meta;

export const Default: Story<RadioGroupProps> = (args) => {
    return (
        <RadioGroup {...args}>
            <BoxLabel label="Male">
                <Radio value="male" />
            </BoxLabel>
            <BoxLabel label="Female">
                <Radio value="felamle" />
            </BoxLabel>
        </RadioGroup>
    );
};
Default.args = {
    defaultValue: 'male',
    direction: 'row',
    name: 'gender'
} as RadioGroupProps;

// FieldControl story

type FieldControlStoryProps = Assign<RadioGroupProps, FieldControlProps>;

export const FieldControlStory: Story<FieldControlStoryProps> = (args) => {
    return <FieldControl {...args} component={Default} />;
};
FieldControlStory.storyName = 'Field Control';
FieldControlStory.args = {
    label: 'Gender',
    name: 'gender',
    defaultValue: 'female',
    helperText: 'Select some value',
    labelAlign: 'top',
    variant: 'standard',
    filled: true,
    required: true,
    disabled: false,
    error: 'Some error',
    touched: false
} as FieldControlStoryProps;
