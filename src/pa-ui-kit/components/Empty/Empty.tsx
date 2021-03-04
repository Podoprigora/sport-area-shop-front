import React from 'react';
import classNames from 'classnames';

import { InboxIcon } from '../svg-icons/feather';

export interface EmptyProps extends React.ComponentPropsWithRef<'div'> {
    children?: React.ReactNode;
    icon?: React.ReactElement;
}

export const Empty = React.forwardRef<HTMLDivElement, EmptyProps>(function Empty(
    props,
    forwardedRef
) {
    const { children, className, icon: iconProp, ...other } = props;

    const iconClassName: string[] = ['empty__icon'];

    if (iconProp && !iconProp.props.size) {
        iconClassName.push('empty__icon--default-size');
    }

    const iconComponent = React.cloneElement(iconProp || <InboxIcon />, {
        className: iconClassName.join(' ')
    });
    return (
        <div className={classNames('empty', className)} {...other} ref={forwardedRef}>
            {iconComponent}
            <span className="empty__text">{children}</span>
        </div>
    );
});
