import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import {
    SummaryList,
    SummaryListItem,
    SummaryListItemLabel,
    SummaryListItemValue,
    SummaryListProps
} from '../components/SummaryList';

export default {
    title: 'PA-UI-KIT/SummaryList',
    component: SummaryList,
    subcomponents: { SummaryListItem, SummaryListItemValue, SummaryListItemLabel }
} as Meta;

export const Default: Story<SummaryListProps> = () => {
    return (
        <SummaryList>
            <SummaryListItem>
                <SummaryListItemLabel>Subtotal (1 item)</SummaryListItemLabel>
                <SummaryListItemValue>€ 1000.00</SummaryListItemValue>
            </SummaryListItem>
            <SummaryListItem>
                <SummaryListItemLabel>Shipping</SummaryListItemLabel>
                <SummaryListItemValue>€ 0.00</SummaryListItemValue>
            </SummaryListItem>
            <SummaryListItem size="large">
                <SummaryListItemLabel>Total</SummaryListItemLabel>
                <SummaryListItemValue>€ 1000.00</SummaryListItemValue>
            </SummaryListItem>
            <SummaryListItem size="small" className="u-color-grey">
                <SummaryListItemLabel>Incl. 16% VAT</SummaryListItemLabel>
                <SummaryListItemValue>€ 137.93</SummaryListItemValue>
            </SummaryListItem>
        </SummaryList>
    );
};
Default.args = {} as SummaryListProps;
