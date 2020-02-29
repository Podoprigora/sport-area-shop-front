import React from 'react';
import PropTypes from 'prop-types';

import Panel from '@components/Panel';
import TestButtons from './components/TestButtons';

const TestPage = (props) => {
    return (
        <div className="page">
            <Panel title="Test buttons" className="page__section">
                <TestButtons />
            </Panel>
        </div>
    );
};

TestPage.propTypes = {};

export default TestPage;
