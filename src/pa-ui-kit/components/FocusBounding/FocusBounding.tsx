/**
 * This component is deprecated.
 * Use react-focus-lock instead https://github.com/theKashey/react-focus-lock.
 */
import React, { useRef, useCallback, useEffect, KeyboardEvent } from 'react';
import ReactDOM from 'react-dom';

import { useEventListener, useMergedRefs } from '../utils';

export interface FocusBoundingProps {
    children: (React.ReactElement & { ref?: React.Ref<HTMLElement> }) | null;
    disabled?: () => void | boolean;
}

export const FocusBounding = (props: FocusBoundingProps) => {
    const { children, disabled: disabledProp } = props;

    const childRef = useRef<HTMLElement | null>(null);
    const childNodeRef = useRef<Element | null | Text>(null);
    const handleChildRef = useMergedRefs(childRef, children && children?.ref ? children.ref : null);

    const startingBoundRef = useRef<HTMLDivElement>(null);
    const endingBoundRef = useRef<HTMLDivElement>(null);

    const isDisabled = useCallback(() => {
        return typeof disabledProp === 'function' ? disabledProp() : disabledProp;
    }, [disabledProp]);

    const handleDocumentKeyDown = useCallback(
        (ev: KeyboardEvent) => {
            const target = ev.target as Node;

            if (ev.key !== 'Tab' || isDisabled()) {
                return;
            }

            if (childNodeRef.current && !childNodeRef.current.contains(target)) {
                if (target.isEqualNode(endingBoundRef.current) && !ev.shiftKey) {
                    startingBoundRef.current?.focus();
                } else if (target.isEqualNode(startingBoundRef.current) && ev.shiftKey) {
                    endingBoundRef.current?.focus();
                }
            }
        },
        [isDisabled]
    );

    useEffect(() => {
        // This is required for compatibility with react-transition-group which doesn't apply React.forwardRef
        childNodeRef.current = ReactDOM.findDOMNode(childRef.current);

        if (childNodeRef.current && !childNodeRef.current.contains(document.activeElement)) {
            startingBoundRef.current?.focus();
        }
    }, []);

    useEventListener('keydown', handleDocumentKeyDown, true);

    if (!React.isValidElement(children)) {
        return null;
    }

    const childrenContent = React.cloneElement(children, { ref: handleChildRef });

    return (
        <>
            <div
                role="presentation"
                tabIndex={0}
                ref={startingBoundRef}
                className="u-focus-outline-0"
                data-test="starting-bound"
            />
            {childrenContent}
            <div
                role="presentation"
                tabIndex={0}
                ref={endingBoundRef}
                className="u-focus-outline-0"
                data-test="ending-bound"
            />
        </>
    );
};
