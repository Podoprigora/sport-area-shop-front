import React from 'react';
import { ExpandedPanel, ExpandedPanelHeader, ExpandedPanelBody } from '@ui/ExpandedPanel';
import PanelHeader from '@ui/Panel/PanelHeader';
import PanelBody from '@ui/Panel/PanelBody';
import Heading from '@ui/Heading';
import Button from '@ui/Button';

import TestVirtualizedList from './TestVirtualizedList';

const TestExpandedPanel = (props) => {
    return (
        <div>
            {/* <Button>Test</Button> */}
            <ExpandedPanel defaultExpanded={false} disabled>
                <ExpandedPanelHeader>
                    <Heading gutterBottom={false}>ExpandedPanelHeader</Heading>
                </ExpandedPanelHeader>
                <ExpandedPanelBody>
                    <TestVirtualizedList />
                </ExpandedPanelBody>
            </ExpandedPanel>
            <ExpandedPanel defaultExpanded={false}>
                <ExpandedPanelHeader>
                    <Heading gutterBottom={false}>ExpandedPanelHeader</Heading>
                </ExpandedPanelHeader>
                <ExpandedPanelBody>
                    <div>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam aut,
                        laudantium vero sint neque repellat quae labore ea unde, culpa velit
                        reprehenderit blanditiis laborum pariatur perspiciatis nobis explicabo
                        repudiandae sunt?
                    </div>
                </ExpandedPanelBody>
            </ExpandedPanel>
            <ExpandedPanel defaultExpanded={false}>
                <ExpandedPanelHeader>
                    <Heading gutterBottom={false}>ExpandedPanelHeader</Heading>
                </ExpandedPanelHeader>
                <ExpandedPanelBody>
                    <div>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam aut,
                        laudantium vero sint neque repellat quae labore ea unde, culpa velit
                        reprehenderit blanditiis laborum pariatur perspiciatis nobis explicabo
                        repudiandae sunt?
                    </div>
                </ExpandedPanelBody>
            </ExpandedPanel>
        </div>
    );
};

export default TestExpandedPanel;
