import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { Heading, HeadingProps } from '../components/Heading';

export default {
    title: 'PA-UI-KIT/Heading',
    component: Heading
} as Meta;

export const Default: Story<HeadingProps> = (args) => {
    return <Heading {...args}>Heading</Heading>;
};
Default.args = {
    size: 1
} as HeadingProps;

export const Sizes: Story<HeadingProps> = (args) => {
    return (
        <>
            <Heading {...args} size="1">
                Heading 1
            </Heading>
            <Heading {...args} size="2">
                Heading 2
            </Heading>
            <Heading {...args} size="3">
                Heading 3
            </Heading>
            <Heading {...args} size="4">
                Heading 4
            </Heading>
            <Heading {...args} size="5">
                Heading 5
            </Heading>
            <Heading {...args} size="6">
                Heading 6
            </Heading>
        </>
    );
};
Sizes.args = {} as HeadingProps;
