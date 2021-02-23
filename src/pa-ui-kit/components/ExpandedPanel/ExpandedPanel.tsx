import React, { useMemo, useCallback } from 'react';
import classNames from 'classnames';
import AnimateHeight from 'react-animate-height';

import { createCtx, useControlled } from '../utils';

type ExpandedPanelContextValue = {
    expanded: boolean;
    onToggle: () => void;
};

const ExpandedPanelContext = createCtx<ExpandedPanelContextValue>();
export const useExpandedPanel = ExpandedPanelContext.useContext;

export interface ExpandedPanelProps extends React.ComponentPropsWithRef<'div'> {
    /**
     * Required components to accommodate: `ExpandedPanelHeader`, `ExpandedPanelBody`.
     */
    children: [React.ReactElement, React.ReactElement];
    expanded?: boolean;
    defaultExpanded?: boolean;
}

export const ExpandedPanel = React.forwardRef<HTMLDivElement, ExpandedPanelProps>(function (
    props,
    forwardedRef
) {
    const { children, expanded: expandedProp, defaultExpanded = true, className, ...other } = props;
    const [expanded, setExpanded] = useControlled(expandedProp, defaultExpanded);

    const handleHeaderToggle = useCallback(() => {
        setExpanded((prevState) => !prevState);
    }, [setExpanded]);

    const contextValue = useMemo(
        () => ({
            expanded: expanded ?? defaultExpanded,
            onToggle: handleHeaderToggle
        }),
        [expanded, defaultExpanded, handleHeaderToggle]
    );

    const [headerElement, bodyElement] = React.Children.toArray(children);
    const animatedHeight = expanded ? 'auto' : 0;

    if (!React.isValidElement(headerElement)) {
        console.error('Expected the first child of `ExpandedPanel` should be a valid element!');
        return null;
    }

    return (
        <div
            className={classNames('expanded-panel', className, {
                'expanded-panel--expanded': expanded
            })}
            ref={forwardedRef}
            {...other}
        >
            <ExpandedPanelContext.Provider value={contextValue}>
                {headerElement}
            </ExpandedPanelContext.Provider>
            {React.isValidElement(bodyElement) && (
                <AnimateHeight height={animatedHeight}>
                    {React.cloneElement(bodyElement)}
                </AnimateHeight>
            )}
        </div>
    );
});
