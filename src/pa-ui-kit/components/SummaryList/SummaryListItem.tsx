import React from 'react';
import classNames from 'classnames';

export interface SummaryListItemProps extends React.ComponentPropsWithoutRef<'div'> {
    /**
     * Normally contains of `SummaryListItemLabel` and `SummaryListItemValue` components.
     */
    children?: React.ReactNode;
    size?: 'large' | 'small';
}

export const SummaryListItem = (props: SummaryListItemProps) => {
    const { children, className, size, ...other } = props;

    return (
        <div
            {...other}
            className={classNames('summary-list__item', className, {
                'summary-list__item--large': size === 'large',
                'summary-list__item--small': size === 'small'
            })}
        >
            {children}
        </div>
    );
};
