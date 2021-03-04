import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Hidden, HiddenProps } from '../components/Hidden';

export default {
    component: Hidden,
    title: 'PA-UI-KIT/Hidden'
} as Meta;

export const Default: Story<HiddenProps> = (args) => {
    return (
        <Hidden {...args} component={null}>
            <div className="u-bg-color-red u-padding-6">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. A, harum.
            </div>
        </Hidden>
    );
};
Default.args = {} as HiddenProps;
