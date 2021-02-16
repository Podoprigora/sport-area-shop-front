import React from 'react';
import classNames from 'classnames';

import { FlexRow, FlexRowProps } from '../FlexRow';
import { FlexCol } from '../FlexCol';

type ChildrenProp = React.ReactElement;

export interface WindowActionsProps extends FlexRowProps {
    /**
     * Normally contains a set of `Button` components.
     */
    children?: ChildrenProp[] | ChildrenProp;
}

export const WindowActions = (props: WindowActionsProps) => {
    const { children, className, ...other } = props;

    const items = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return (
                <FlexCol {...(!child.props?.autoWidth && { xs: 'auto' })}>
                    {React.cloneElement(child, {
                        plain: child.props?.plain !== undefined ? child.props.plain : true,
                        centered: child.props?.centered !== undefined ? child.props.centered : true
                    })}
                </FlexCol>
            );
        }
        return null;
    });

    return (
        <FlexRow className={classNames('window__actions', className)} {...other}>
            {items}
        </FlexRow>
    );
};
