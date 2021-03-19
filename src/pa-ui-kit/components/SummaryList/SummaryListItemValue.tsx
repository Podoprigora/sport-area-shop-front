import React from 'react';
import classNames from 'classnames';

export type SummaryListItemValueProps = React.ComponentPropsWithoutRef<'div'>;

export const SummaryListItemValue = (props: SummaryListItemValueProps) => {
    const { children, className, ...other } = props;

    return (
        <div {...other} className={classNames('summary-list__value', className)}>
            {children}
        </div>
    );
};
