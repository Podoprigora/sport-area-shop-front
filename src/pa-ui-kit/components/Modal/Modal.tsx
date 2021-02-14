import React, { useState, useRef, useEffect, useCallback, useMemo, useLayoutEffect } from 'react';
import classNames from 'classnames';
import FocusLock from 'react-focus-lock';
import { scrollbarSize } from 'dom-helpers';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

import { Backdrop } from '../Backdrop';
import { Portal } from '../Portal';
import { setRef, useEventCallback, useEventListener } from '../utils';
import { ModalManager } from './ModalManager';

export interface ModalProps extends React.ComponentPropsWithRef<'div'> {
    /**
     * Contains a valid ReactElement or null
     */
    children?: React.ReactElement | null;
    open?: boolean;
    centered?: boolean;
    backdrop?: boolean;
    /**
     * Sets overflow auto for modal conent
     */
    overflow?: boolean;
    backdropTransitionProps?: CSSTransitionProps;
    disableEscapeKeyDown?: boolean;
    disableBackdropClick?: boolean;
    disableFocusBounding?: boolean;
    disableRestoreFocus?: boolean;
    /**
     * If false, the body element style overflow will be set as hidden
     */
    disableScrollLock?: boolean;
    onEscapeKeyDown?: React.KeyboardEventHandler;
    onClose?: () => void;
    onOpen?: () => void;
}

const isOverflowing = () => {
    return window.innerWidth > document.documentElement.clientWidth;
};

const setBodyOverflow = (overflow = true) => {
    const { style } = document.body;

    if (overflow) {
        style.removeProperty('overflow');
        style.removeProperty('padding-right');
    } else {
        style.setProperty('overflow', 'hidden');
        style.setProperty('padding-right', `${scrollbarSize()}px`);
    }
};

const getHasTransition = (props: ModalProps): boolean => {
    return props.children && props.children.props.hasOwnProperty('in');
};

const manager = new ModalManager();

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(function Modal(props, ref) {
    const {
        children,
        open,
        className,
        centered,
        backdrop = true,
        overflow,
        disableRestoreFocus = false,
        disableFocusBounding = false,
        disableBackdropClick = false,
        disableEscapeKeyDown = false,
        disableScrollLock = false,
        backdropTransitionProps,
        onEscapeKeyDown,
        onClose,
        onOpen,
        ...other
    } = props;

    const [exited, setExited] = useState(true);
    const [modalNode, setModalNode] = useState<HTMLDivElement | null>(null);
    const backdropRef = useRef<HTMLDivElement | null>(null);
    const triggerRef = useRef<HTMLElement | null>(null);
    const hasTransition = getHasTransition(props);

    const isTopModal = useCallback(() => {
        if (modalNode) {
            return manager.isTopModal(modalNode);
        }

        return false;
    }, [modalNode]);

    // Handlers

    const handleOpen = useCallback(() => {
        if (onOpen) {
            onOpen();
        }
    }, [onOpen]);

    const handleClose = useCallback(() => {
        if (onClose) {
            onClose();
        }
    }, [onClose]);

    const handleEnter = useEventCallback(() => {
        setExited(false);

        if (props.children && props.children.props && props.children.props.onEnter) {
            props.children.props.onEnter();
        }
    });

    const handleExited = useEventCallback(() => {
        setExited(true);

        if (props.children && props.children.props && props.children.props.onExited) {
            props.children.props.onExited();
        }
    });

    const handleDocumentKeyDown = useCallback(
        (ev: React.KeyboardEvent) => {
            ev.stopPropagation();

            if (!modalNode) {
                return;
            }

            const isValidTarget = modalNode.contains(ev.target as Node);

            if (ev.key === 'Escape' && !disableEscapeKeyDown && isValidTarget && isTopModal()) {
                if (onEscapeKeyDown) {
                    onEscapeKeyDown(ev);
                } else {
                    handleClose();
                }
            }
        },
        [modalNode, disableEscapeKeyDown, handleClose, onEscapeKeyDown, isTopModal]
    );

    const handleClick = useCallback(
        (ev: React.MouseEvent) => {
            if (
                !backdrop &&
                !disableBackdropClick &&
                modalNode &&
                modalNode.isEqualNode(ev.target as Node)
            ) {
                handleClose();
            }
        },
        [backdrop, modalNode, disableBackdropClick, handleClose]
    );

    const handleBackdropClick = useCallback(
        (ev: React.MouseEvent) => {
            ev.preventDefault();
            ev.stopPropagation();

            if (
                !disableBackdropClick &&
                backdropRef.current &&
                backdropRef.current.isEqualNode(ev.target as Node)
            ) {
                handleClose();
            }
        },
        [handleClose, disableBackdropClick]
    );

    const handlePortalRendered = useCallback(() => {
        handleOpen();
    }, [handleOpen]);

    // Effects

    useEffect(() => {
        if (open && modalNode) {
            setRef(ref, modalNode);

            return () => {
                setRef(ref, null);
            };
        }

        return undefined;
    }, [open, modalNode, ref]);

    useEffect(() => {
        if (disableRestoreFocus) {
            return undefined;
        }

        if (open) {
            // Initialize an active element to restore focus after close
            triggerRef.current = document.activeElement as HTMLElement;
        }

        return undefined;
    }, [open, disableRestoreFocus]);

    useEffect(() => {
        if (modalNode) {
            manager.add(modalNode);

            return () => {
                manager.remove(modalNode);

                // Restore focus
                if (triggerRef.current) {
                    triggerRef.current?.focus();
                }
            };
        }

        return undefined;
    }, [modalNode]);

    // Toggle the body scrollbar visibility
    useLayoutEffect(() => {
        if (!disableScrollLock && open && modalNode && isOverflowing()) {
            setBodyOverflow(false);
        }
    }, [modalNode, open, disableScrollLock]);

    useEffect(() => {
        if (!disableScrollLock && modalNode && !isOverflowing()) {
            return () => {
                if (manager.length === 0) {
                    setBodyOverflow(true);
                }
            };
        }

        return undefined;
    }, [open, modalNode, disableScrollLock]);

    useEventListener('keydown', handleDocumentKeyDown);

    // Render

    const childProps = useMemo(() => {
        if (hasTransition) {
            return {
                onEnter: handleEnter,
                onExited: handleExited
            } as const;
        }

        return {};
    }, [hasTransition, handleEnter, handleExited]);

    if (!open && (!hasTransition || exited)) {
        return null;
    }

    const childrenContent = React.isValidElement(children)
        ? React.cloneElement(children, childProps)
        : null;

    return (
        <Portal onRendered={handlePortalRendered}>
            <div
                role="presentation"
                className={classNames('modal', className, {
                    'modal--hidden': !open && exited,
                    'modal--centered': centered,
                    'modal--overflow': overflow
                })}
                onClick={handleClick}
                ref={setModalNode}
                {...other}
            >
                {backdrop && (
                    <Backdrop
                        open={open}
                        transition={hasTransition}
                        className="modal__backdrop"
                        transitionProps={backdropTransitionProps}
                        ref={backdropRef}
                        onClick={handleBackdropClick}
                    />
                )}
                {!disableFocusBounding ? (
                    <FocusLock autoFocus={false} returnFocus={false}>
                        {childrenContent}
                    </FocusLock>
                ) : (
                    childrenContent
                )}
            </div>
        </Portal>
    );
});
