import React from 'react';
import PropTypes from 'prop-types';

import Panel from '@components/Panel';
import Heading from '@components/Heading';
import TestButtons from './components/TestButtons';
import TestWindow from './components/TestWindow';

const TestPage = (props) => {
    return (
        <div className="page">
            <Panel title="Test window" className="page__section">
                <TestWindow />
            </Panel>
            <Panel title="Test buttons" className="page__section">
                <TestButtons />
            </Panel>

            <Panel title="Test heading" className="page__section">
                <Heading size="1">Test heading 1</Heading>
                <Heading size="2">Test heading 2</Heading>
                <Heading size="3">Test heading 3</Heading>
                <Heading size="4">Test heading 4</Heading>
                <Heading size="5" gutterBottom={false}>
                    Test heading 5
                </Heading>
                <Heading size={6}>Test heading 6</Heading>
            </Panel>
        </div>
    );
};

TestPage.propTypes = {};

export default TestPage;
