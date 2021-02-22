import React from 'react';
import classNames from 'classnames';

export interface AlertActionsProps extends React.ComponentPropsWithoutRef<'div'> {
    /**
     * Contains a set of `Button` like element.
     */
    children?: React.ReactNode;
}

export const AlertActions = (props: AlertActionsProps) => {
    const { children, className, ...other } = props;

    return (
        <div className={classNames('alert__actions', className)} {...other}>
            {children}
        </div>
    );
};
