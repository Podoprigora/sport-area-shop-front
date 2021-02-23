import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import {
    ExpandedPanel,
    ExpandedPanelHeader,
    ExpandedPanelBody,
    ExpandedPanelProps
} from '../components/ExpandedPanel';
import { Heading } from '../components/Heading';
import { PlusIcon, MinusIcon } from '../components/svg-icons/feather';

import { Default as DefaultList } from './List.stories';

export default {
    title: 'PA-UI-KIT/ExpandedPanel',
    component: ExpandedPanel,
    subcomponents: { ExpandedPanelHeader, ExpandedPanelBody }
} as Meta;

export const Default: Story<ExpandedPanelProps> = (args) => {
    return (
        <ExpandedPanel {...args}>
            <ExpandedPanelHeader
                title="Default"
                className="u-flex-direction-row-reverse"
                renderExpandedIcon={(expanded) => {
                    return expanded ? <MinusIcon size="small" /> : <PlusIcon size="small" />;
                }}
            />
            <ExpandedPanelBody>
                <div>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas, maiores?
                    Dolorum voluptatibus natus delectus quae accusamus numchildrenElemenquam
                    excepturi ipsa dolores deserunt totam, optio voluptatem accusantium amet
                    dignissimos blanditiis recusandae eos.
                </div>
            </ExpandedPanelBody>
        </ExpandedPanel>
    );
};
Default.args = { defaultExpanded: true } as ExpandedPanelProps;

export const WithList: Story<ExpandedPanelProps> = (args) => {
    return (
        <ExpandedPanel {...args}>
            <ExpandedPanelHeader>
                <Heading size={4} gutterBottom={false}>
                    List
                </Heading>
            </ExpandedPanelHeader>
            <ExpandedPanelBody>
                <DefaultList maxLength={3} />
            </ExpandedPanelBody>
        </ExpandedPanel>
    );
};
Default.args = { defaultExpanded: true } as ExpandedPanelProps;
