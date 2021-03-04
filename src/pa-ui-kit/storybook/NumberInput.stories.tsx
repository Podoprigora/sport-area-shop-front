import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { NumberInput, NumberInputProps } from '../components/NumberInput';

export default {
    component: NumberInput,
    title: 'PA-UI-KIT/NumberInput'
} as Meta;

export const Default: Story<NumberInputProps> = (args) => {
    return (
        <div className="u-padding-6">
            <NumberInput {...args} defaultValue="" />
        </div>
    );
};
Default.args = {} as NumberInputProps;
