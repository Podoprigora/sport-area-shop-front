import React from 'react';
import PropTypes from 'prop-types';

import Panel from '@components/Panel';
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
        </div>
    );
};

TestPage.propTypes = {};

export default TestPage;
