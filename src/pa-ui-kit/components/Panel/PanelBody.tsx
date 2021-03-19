import React from 'react';
import classNames from 'classnames';

export type PanelBodyProps = React.ComponentPropsWithRef<'div'>;

export const PanelBody = React.forwardRef<HTMLDivElement, PanelBodyProps>(function PanelBody(
    props,
    forwardedRef
) {
    const { children, className, ...other } = props;

    return (
        <div {...other} className={classNames('panel__body', className)} ref={forwardedRef}>
            {children}
        </div>
    );
});
