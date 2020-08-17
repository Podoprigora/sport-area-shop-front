import React, { useMemo, useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AnimateHeight from 'react-animate-height';

import chainPropTypes from '@ui/utils/chainPropTypes';
import useControlled from '@ui/hooks/useControlled';

import { ExpandedPanelContext } from './ExpandedPanelContext';

const ExpandedPanel = React.forwardRef(function(props, ref) {
    const { children, expanded: expandedProp, defaultExpanded = true, className, ...other } = props;
    const [expanded, setExpanded] = useControlled(expandedProp, defaultExpanded);

    const handleHeaderToggle = useCallback(
        (ev) => {
            setExpanded((prevState) => !prevState);
        },
        [setExpanded]
    );

    const contextValue = useMemo(
        () => ({
            expanded,
            onToggle: handleHeaderToggle
        }),
        [expanded, handleHeaderToggle]
    );

    const [headerElement, bodyElement] = React.Children.toArray(children);

    return (
        <div
            className={classNames('expanded-panel', className, {
                'expanded-panel--expanded': expanded
            })}
            ref={ref}
            {...other}
        >
            <ExpandedPanelContext.Provider value={contextValue}>
                {headerElement}
            </ExpandedPanelContext.Provider>
            {bodyElement && (
                <AnimateHeight height={expanded ? 'auto' : 0}>
                    {React.cloneElement(bodyElement)}
                </AnimateHeight>
            )}
        </div>
    );
});

ExpandedPanel.propTypes = {
    expanded: PropTypes.bool,
    defaultExpanded: PropTypes.bool,
    className: PropTypes.string,
    transitionProps: PropTypes.object,
    children: chainPropTypes(PropTypes.node.isRequired, (props) => {
        const { children } = props;

        const header = children[0];

        if (!React.isValidElement(header)) {
            return new Error(
                'Expected the first child of `ExpandedPanel` should be a valid element!'
            );
        }

        return null;
    })
};

export default ExpandedPanel;
