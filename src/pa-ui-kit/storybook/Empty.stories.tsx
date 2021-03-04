import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Empty, EmptyProps } from '../components/Empty';
import { FileTextIcon } from '../components/svg-icons/feather';

export default {
    component: Empty,
    title: 'PA-UI-KIT/Empty'
} as Meta;

export const Default: Story<EmptyProps> = (args) => {
    return (
        <div className="u-padding-10">
            <Empty icon={<FileTextIcon />} {...args}>
                No items
            </Empty>
        </div>
    );
};
Default.args = {} as EmptyProps;
