import React from 'react';
import classNames from 'classnames';

export type SummaryListItemLabelProps = React.ComponentPropsWithoutRef<'div'>;

export const SummaryListItemLabel = (props: SummaryListItemLabelProps) => {
    const { children, className, ...other } = props;

    return (
        <div className={classNames('summary-list__label', className)} {...other}>
            {children}
        </div>
    );
};
