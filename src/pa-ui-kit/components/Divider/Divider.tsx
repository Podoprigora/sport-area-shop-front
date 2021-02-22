import React from 'react';
import classNames from 'classnames';

export type DividerProps = Omit<React.ComponentPropsWithoutRef<'hr'>, 'children'>;

export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(function Divider(
    props,
    forwardedRef
) {
    const { className, ...other }: DividerProps = props;

    return <hr className={classNames('divider', className)} ref={forwardedRef} {...other} />;
});
