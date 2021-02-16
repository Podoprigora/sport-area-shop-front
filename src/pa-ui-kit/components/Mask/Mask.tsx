import React, { useEffect } from 'react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

import { useEventCallback } from '../utils';

export interface MaskProps extends React.ComponentPropsWithRef<'div'> {
    children?: React.ReactNode;
    open?: boolean;
    fixed?: boolean;
    anchorRef?: React.MutableRefObject<HTMLElement | null>;
    transitionProps?: CSSTransitionProps;
}

const cachedStyleValues = {} as Record<string, string | null>;

const updateAnchorStyles = (node: HTMLElement, reset = false) => {
    if (node) {
        const { style } = node;

        if (!reset) {
            cachedStyleValues.position = style.getPropertyValue('position') || null;
            cachedStyleValues.overflow = style.getPropertyValue('overflow') || null;
        }

        style.setProperty('position', reset ? cachedStyleValues?.position : 'relative');
        style.setProperty('overflow', reset ? cachedStyleValues?.overflow : 'hidden');
    }
};

export const Mask = React.forwardRef<HTMLDivElement, MaskProps>(function Mask(props, forwardedRef) {
    const { open, fixed, className, children, anchorRef, transitionProps, ...other } = props;

    const handleTransitionExited = useEventCallback((element: HTMLElement) => {
        if (anchorRef && anchorRef.current && !fixed) {
            const node = anchorRef.current;

            updateAnchorStyles(node, true);
        }

        if (transitionProps?.onExited) {
            transitionProps.onExited(element);
        }
    });

    useEffect(() => {
        if (anchorRef && anchorRef.current && !fixed) {
            const node = anchorRef.current;

            if (open) {
                updateAnchorStyles(node);
            }
        }

        return undefined;
    }, [anchorRef, open, fixed]);

    return (
        <CSSTransition
            in={open}
            timeout={200}
            classNames="mask"
            unmountOnExit
            onExited={handleTransitionExited}
            {...transitionProps}
        >
            <div
                className={classNames('mask', className, {
                    'mask--fixed': fixed
                })}
                {...other}
                ref={forwardedRef}
            >
                {children}
            </div>
        </CSSTransition>
    );
});
