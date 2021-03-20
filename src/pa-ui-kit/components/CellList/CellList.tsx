import React from 'react';
import classNames from 'classnames';

export type CellListProps = React.ComponentPropsWithRef<'div'>;

export const CellList = React.forwardRef<HTMLDivElement, CellListProps>(function CellList(
    props,
    forwardedRef
) {
    const { children, className, ...other } = props;

    return (
        <div {...other} className={classNames('cell-list', className)} ref={forwardedRef}>
            {children}
        </div>
    );
});
