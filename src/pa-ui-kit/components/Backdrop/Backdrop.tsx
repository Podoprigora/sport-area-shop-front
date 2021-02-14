import React from 'react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

export interface BackdropProps extends React.ComponentPropsWithRef<'div'> {
    open?: boolean;
    transition?: boolean;
    transitionProps?: CSSTransitionProps;
}

export const Backdrop = React.forwardRef<HTMLDivElement, BackdropProps>(function Backdrop(
    props,
    forwardedRef
) {
    const { open, className, transition, transitionProps, ...other } = props;

    const transitionPropsDefault = {
        appear: true,
        timeout: 300,
        classNames: 'backdrop'
    } as CSSTransitionProps;

    const backdropComponent = (
        <div className={classNames('backdrop', className)} ref={forwardedRef} {...other} />
    );

    if (!transition) {
        return open ? backdropComponent : null;
    }

    return (
        <CSSTransition in={open} {...{ ...transitionPropsDefault, ...transitionProps }}>
            {backdropComponent}
        </CSSTransition>
    );
});
