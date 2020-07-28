import React from 'react';
import PropTypes from 'prop-types';

import Panel from '@ui/Panel';
import Heading from '@ui/Heading';
import Input from '@ui/Input';
import TestButtons from './components/TestButtons';
import TestWindow from './components/TestWindow';
import TestPopper from './components/TestPopper';
import TestInputs from './components/TestInputs';
import TestGrid from './components/TestGrid';
import TestHidden from './components/TestHidden';
import TestFieldControl from './components/TestFieldControl';
import TestInputMask from './components/TestInputMask';
import TestChckbox from './components/TestChckbox';
import TestList from './components/TestList';
import TestVirtualizedList from './components/TestVirtualizedList';
import TestMenu from './components/TestMenu';
import TestSelect from './components/TestSelect';
import TestClickAwayListener from './components/TestClickAwayListener';
import TestSearchInput from './components/TestSearchInput';
import TestCircularProgres from './components/TestCircularProgres';
import TestAlerts from './components/TestAlerts';
import TestNotification from './components/TestNotification';
import TestRating from './components/TestRating';
import TestIntersectionObserver from './components/TestIntersectionObserver';

const TestPage = (props) => {
    return (
        <div className="page">
            <Panel title="Test Intersection Observer">
                <TestIntersectionObserver />
            </Panel>
            <Panel title="Test Rating">
                <TestRating />
            </Panel>
            <Panel title="Test Notification">
                <TestNotification />
            </Panel>
            <Panel title="Test Alerts">
                <TestAlerts />
            </Panel>
            {/* <Panel title="Test CircularProgress">
                <TestCircularProgres />
            </Panel> */}
            <Panel title="Test SearchInput">
                <TestSearchInput />
            </Panel>
            <Panel title="Test Select">
                <TestSelect />
            </Panel>
            <Panel title="Test Menu">
                <TestMenu />
            </Panel>
            <Panel title="Test Virtualized List">
                <TestVirtualizedList />
            </Panel>
            <Panel title="Test List">
                <TestList />
            </Panel>
            <Panel title="Test Checkbox">
                <TestChckbox />
            </Panel>
            <Panel title="Test input text mask">
                <TestInputMask />
            </Panel>
            <Panel title="Test FieldControl" className="page__section">
                <TestFieldControl />
            </Panel>
            <Panel title="Test Inputs" className="page__section">
                <TestInputs />
            </Panel>
            <Panel title="Test Hidden" className="page__section">
                <TestHidden />
            </Panel>
            <Panel title="Test Grid" className="page__section">
                <TestGrid />
            </Panel>
            <Panel title="Test PopperJS" className="page__section">
                <TestPopper />
            </Panel>
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
