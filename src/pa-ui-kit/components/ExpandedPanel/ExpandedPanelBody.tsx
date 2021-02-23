import React from 'react';
import classNames from 'classnames';

export interface ExpandedPanelBodyProps extends React.ComponentPropsWithRef<'div'> {
    /**
     * Should contain a valid ReactElement.
     */
    children?: React.ReactElement;
}

export const ExpandedPanelBody = React.forwardRef<HTMLDivElement, ExpandedPanelBodyProps>(
    function ExpandedPanelBody(props, ref) {
        const { children, className, ...other } = props;

        return (
            <div className={classNames('expanded-panel__body', className)} {...other} ref={ref}>
                {React.isValidElement(children) ? React.cloneElement(children) : null}
            </div>
        );
    }
);
