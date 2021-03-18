import React from 'react';
import classNames from 'classnames';

import { ActionsBar, ActionsBarProps } from '../ActionsBar';

export type WindowActionsProps = ActionsBarProps;

export const WindowActions = (props: WindowActionsProps) => {
    const { children, className, ...other } = props;

    const items = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                plain: child.props?.plain !== undefined ? child.props.plain : true
            });
        }
        return null;
    });

    return (
        <ActionsBar className={classNames('window__actions', className)} {...other}>
            {items}
        </ActionsBar>
    );
};
