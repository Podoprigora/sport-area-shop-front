import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { FlexRow, FlexRowProps } from '../components/FlexRow';
import { FlexCol } from '../components/FlexCol';

const rowStyle: React.CSSProperties = {
    background: '#dedede',
    padding: '10px'
};

const boxStyle: React.CSSProperties = {
    background: '#689f38',
    padding: '20px',
    border: '1px solid green',
    borderWidth: '1px 0 1px 1px'
};

// Stories

export default {
    title: 'PA-UI-KIT/Grid',
    component: FlexRow,
    subcomponents: { FlexCol }
} as Meta;

export const Default: Story<FlexRowProps> = (args) => {
    return (
        <FlexRow {...args} style={rowStyle}>
            <FlexCol xs="auto">
                <div style={boxStyle}>Col 1</div>
            </FlexCol>
            <FlexCol>
                <div style={boxStyle}>Col 2</div>
            </FlexCol>
            <FlexCol>
                <div style={boxStyle}>Col 3</div>
            </FlexCol>
            <FlexCol xs="auto">
                <div style={boxStyle}>Col 4</div>
            </FlexCol>
        </FlexRow>
    );
};
Default.args = {};
