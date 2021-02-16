import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { Link, LinkProps } from '../components/Link';
import { KeyboardArrowRightIcon } from '../components/svg-icons/material';

export default {
    component: Link,
    title: 'PA-UI-KIT/Link',
    argTypes: {
        icon: {
            control: {
                type: null
            }
        }
    }
} as Meta;

const Template: Story<LinkProps> = (args) => <Link {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: 'Default link',
    icon: <KeyboardArrowRightIcon />,
    iconAlign: 'right'
} as LinkProps;
