import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Pagination, PaginationProps } from '../components/Pagination';

export default {
    title: 'PA-UI-KIT/Pagination',
    component: Pagination
} as Meta;

export const Default: Story<PaginationProps> = (args) => {
    return <Pagination {...args} />;
};
Default.args = {
    count: 25
} as PaginationProps;
