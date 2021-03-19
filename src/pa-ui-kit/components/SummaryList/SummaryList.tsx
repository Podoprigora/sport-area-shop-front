import React from 'react';
import classNames from 'classnames';

export interface SummaryListProps extends React.ComponentPropsWithRef<'div'> {
    /**
     * Normally contains of set `SummaryListItem` components.
     */
    children?: React.ReactNode;
}

export const SummaryList = React.forwardRef<HTMLDivElement, SummaryListProps>(function SummaryList(
    props,
    forwardedRef
) {
    const { children, className, ...other } = props;

    return (
        <div {...other} className={classNames('summary-list', className)} ref={forwardedRef}>
            {children}
        </div>
    );
});
