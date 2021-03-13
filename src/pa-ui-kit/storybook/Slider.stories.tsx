import React, { useCallback, useMemo } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Assign } from 'utility-types';

import { Slider, SliderProps } from '../components/Slider';
import { FieldControl, FieldControlProps } from '../components/FieldControl';

export default {
    title: 'PA-UI-KIT/Slider',
    component: Slider
} as Meta;

export const Default: Story<SliderProps> = (args) => {
    const handleChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        console.log('onChange: ', ev.target.value);
    }, []);

    const handleChangeCommited = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        console.log('onChangeCommited: ', ev.target.value);
    }, []);

    const renderThumbLabelText = useMemo(() => {
        return (value: number) => {
            return `${value} ℃`;
        };
    }, []);

    return (
        <Slider
            {...args}
            onChange={handleChange}
            onChangeCommited={handleChangeCommited}
            renderThumbLabelText={renderThumbLabelText}
        />
    );
};
Default.args = {
    defaultValue: [-100, 100],
    min: -100,
    max: 100
} as SliderProps;

// FieldControl Story

type SliderFieldControlProps = Assign<FieldControlProps, SliderProps>;

export const FieldControlStory: Story<SliderFieldControlProps> = (args) => {
    return <FieldControl {...args} component={Slider} />;
};
FieldControlStory.storyName = 'Field Control';
FieldControlStory.args = {
    // variant: 'outlined',
    label: 'Temperature range (℃)',
    labelAlign: 'top',
    defaultValue: [-100, 100],
    min: -100,
    max: 100,
    fullWidth: true,
    helperText: 'Select temperature range [-100, 100]',
    error: 'Invalid range',
    touched: false,
    onChange: () => {},
    onChangeCommited: () => {}
} as SliderFieldControlProps;
