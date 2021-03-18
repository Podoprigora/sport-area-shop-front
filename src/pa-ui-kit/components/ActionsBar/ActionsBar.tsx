import React from 'react';
import classNames from 'classnames';

import { FlexRow, FlexRowProps } from '../FlexRow';
import { FlexCol } from '../FlexCol';

type ChildrenProp = React.ReactElement;

export interface ActionsBarProps extends FlexRowProps {
    /**
     * Normally contains a set of `Button` components.
     */
    children?: ChildrenProp[] | ChildrenProp;
}

export const ActionsBar = (props: ActionsBarProps) => {
    const { children, className, ...other } = props;

    const items = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return (
                <FlexCol {...(!child.props?.autoWidth && { xs: 'auto' })}>
                    {React.cloneElement(child, {
                        centered: child.props?.centered !== undefined ? child.props.centered : true
                    })}
                </FlexCol>
            );
        }
        return null;
    });

    return (
        <FlexRow className={classNames('actions-bar', className)} {...other}>
            {items}
        </FlexRow>
    );
};
